import type { DatabaseInstance } from '@/db';
import { executeWithOffsetPagination } from '@/server/utils/pagination';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

type GetTreatmentReviewsParams = {
  treatmentId: string;
  page: number;
  perPage: number;
};

export const getTreatmentReviews = async (
  db: DatabaseInstance,
  params: GetTreatmentReviewsParams,
) => {
  const { treatmentId, page, perPage } = params;

  const query = db
    .selectFrom('Review')
    .select(['Review.id', 'Review.description', 'Review.createdAt'])
    .select((eb) =>
      jsonArrayFrom(
        eb
          .selectFrom('File')
          .select(['File.id', 'File.url', 'File.name', 'File.thumb'])
          .whereRef('File.reviewId', '=', 'Review.id'),
      ).as('images'),
    )
    .where('Review.treatmentId', '=', treatmentId)
    .orderBy('Review.createdAt', 'desc');

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
