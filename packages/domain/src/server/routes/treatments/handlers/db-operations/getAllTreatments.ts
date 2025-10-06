import type { DB } from '@/db';
import { executeWithOffsetPagination } from '@/server/utils/pagination/offset';
import type { ExpressionBuilder } from 'kysely';
import type { GetAllTreatmentsParams } from '../get-all-treatments';

export const getAllTreatments = async ({
  ctx,
  input,
}: GetAllTreatmentsParams) => {
  let query = ctx.db
    .selectFrom('Treatment')
    .where('Treatment.organizationId', '=', ctx.organizationId)
    .where('Treatment.isArchived', '=', false)
    .where(
      'Treatment.status',
      'in',
      input.status === 'ACTIVE' ? ['FINALIZED', 'SAMPLE'] : ['INACTIVE'],
    )
    .select((eb) =>
      eb
        .selectFrom('Rating')
        .whereRef('Rating.treatmentId', '=', 'Treatment.id')
        .select(({ fn }) => fn.avg<number>('Rating.rate').as('avgRating'))
        .as('averageRating'),
    )
    .select((eb) =>
      eb
        .selectFrom('Review')
        .whereRef('Review.treatmentId', '=', 'Treatment.id')
        .select(({ fn }) => fn.count<number>('Review.id').as('totalReviews'))
        .as('totalReviews'),
    )
    .select((eb) => getAverageDuration(eb).as('averageDuration'))
    .select((eb) => getStartingPrice(eb).as('startingPrice'))
    .selectAll();

  if (input.search) {
    query = query.where((eb) => {
      const search = input.search?.toLowerCase();
      return eb.or([
        eb(ctx.db.fn('lower', ['Treatment.name']), 'like', `%${search}%`),
        eb(
          ctx.db.fn('lower', ['Treatment.description']),
          'like',
          `%${search}%`,
        ),
      ]);
    });
  }

  if (input.type) {
    query = query.where('Treatment.visitType', '=', input.type);
  }

  if (input.rating?.[0] && input.rating?.[1]) {
    query = query.where((eb) => filterRatingRange(eb, input.rating));
  }

  if (input.priceRange?.[0] && input.priceRange?.[1]) {
    query = query.where((eb) => filterPriceRange(eb, input.priceRange));
  }

  if (input.perPage) {
    return executeWithOffsetPagination(query, {
      page: input.page || 1,
      perPage: input.perPage,
      excludeTotalCount: input.excludeTotalCount,
    });
  }

  const items = await query.execute();

  return {
    items,
    hasNextPage: false,
    hasPrevPage: false,
    endCursor: null,
    count: items.length,
  };
};

//// AUXILIARIES /////

const getAverageDuration = (eb: ExpressionBuilder<DB, 'Treatment'>) => {
  return eb
    .case()
    .when('Treatment.visitType', '=', 'MULTIPLE_VISIT')
    .then(
      eb
        .selectFrom('TreatmentVisit')
        .innerJoin('Treatment as T', 'TreatmentVisit.treatmentId', 'T.id')
        .whereRef('TreatmentVisit.treatmentId', '=', 'Treatment.id')
        .select(({ fn, ref }) =>
          fn.avg<number>('T.duration').as('avgDuration'),
        ),
    )
    .else(null)
    .end();
};

const getStartingPrice = (eb: ExpressionBuilder<DB, 'Treatment'>) => {
  return eb
    .case()
    .when('Treatment.visitType', '=', 'SINGLE_VISIT')
    .then(
      eb(
        eb.ref('Treatment.pricePerDuration'),
        '*',
        eb.ref('Treatment.duration'),
      ),
    )
    .else(
      eb
        .selectFrom('TreatmentVisit')
        .innerJoin('Treatment as T', 'TreatmentVisit.treatmentId', 'T.id')
        .whereRef('TreatmentVisit.treatmentId', '=', 'Treatment.id')
        .select(({ fn, eb: subEb, ref: subRef }) =>
          fn
            .min<number>(
              subEb(subRef('T.pricePerDuration'), '*', subRef('T.duration')),
            )
            .as('minPrice'),
        ),
    )
    .end();
};

const filterRatingRange = (
  { eb, selectFrom }: ExpressionBuilder<DB, 'Treatment'>,
  rating?: number[],
) => {
  return eb(
    selectFrom('Rating')
      .select(({ fn }) => fn.avg<number>('Rating.rate').as('avgRating'))
      .whereRef('Rating.treatmentId', '=', 'Treatment.id'),
    '>=',
    rating?.[0] as number,
  ).and(
    eb(
      selectFrom('Rating')
        .select(({ fn }) => fn.avg<number>('Rating.rate').as('avgRating'))
        .whereRef('Rating.treatmentId', '=', 'Treatment.id'),
      '<=',
      rating?.[1] as number,
    ),
  );
};

const filterPriceRange = (
  eb: ExpressionBuilder<DB, 'Treatment'>,
  priceRange?: number[],
) => {
  const { ref, selectFrom, fn, and } = eb;
  const calculatedPrice = eb
    .case()
    .when(ref('Treatment.visitType'), '=', 'SINGLE_VISIT')
    .then(eb(ref('Treatment.pricePerDuration'), '*', ref('Treatment.duration')))
    .else(
      selectFrom('TreatmentVisit')
        .innerJoin('Treatment as T', 'TreatmentVisit.treatmentId', 'T.id')
        .whereRef('TreatmentVisit.treatmentId', '=', 'Treatment.id')
        .select(({ eb: subEb, ref: subRef }) =>
          fn
            .min(subEb(subRef('T.pricePerDuration'), '*', subRef('T.duration')))
            .as('minPrice'),
        ),
    )
    .end();

  return and([
    eb(calculatedPrice, '>=', priceRange?.[0] as number),
    eb(calculatedPrice, '<=', priceRange?.[1] as number),
  ]);
};
