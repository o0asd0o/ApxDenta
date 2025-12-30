import type { DatabaseInstance } from '@/db';
import { executeWithOffsetPagination } from '@/server/utils/pagination';

type GetTreatmentRatingsParams = {
  treatmentId: string;
  page: number;
  perPage: number;
};

export const getTreatmentRatings = async (
  db: DatabaseInstance,
  params: GetTreatmentRatingsParams,
) => {
  const { treatmentId, page, perPage } = params;

  const query = db
    .selectFrom('Rating')
    .select(['Rating.id', 'Rating.rate', 'Rating.remark', 'Rating.createdAt'])
    .where('Rating.treatmentId', '=', treatmentId)
    .orderBy('Rating.createdAt', 'desc');

  if (perPage) {
    return executeWithOffsetPagination(query, {
      page: page || 1,
      perPage,
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

export const getTreatmentRatingSummary = async (
  db: DatabaseInstance,
  treatmentId: string,
) => {
  const result = await db
    .selectFrom('Rating')
    .select((eb) => [
      eb.fn.count<number>('Rating.id').as('totalCount'),
      eb.fn.avg<number>('Rating.rate').as('averageRating'),
    ])
    .where('Rating.treatmentId', '=', treatmentId)
    .executeTakeFirst();

  // Get rating distribution
  const distribution = await db
    .selectFrom('Rating')
    .select((eb) => [
      'Rating.rate',
      eb.fn.count<number>('Rating.id').as('count'),
    ])
    .where('Rating.treatmentId', '=', treatmentId)
    .groupBy('Rating.rate')
    .orderBy('Rating.rate', 'desc')
    .execute();

  return {
    totalCount: Number(result?.totalCount || 0),
    averageRating: Number(result?.averageRating || 0),
    distribution: distribution.map((d) => ({
      rate: d.rate,
      count: Number(d.count),
    })),
  };
};
