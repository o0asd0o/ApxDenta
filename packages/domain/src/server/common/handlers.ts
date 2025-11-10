import type { SelectQueryBuilder } from 'kysely';
import { executeWithOffsetPagination } from '../utils/pagination';
import type { OffsetPaginationInput } from './schemas';

export async function getOffsetPaginatedRowsFromQuery<
  O,
  DB,
  TB extends keyof DB,
>(query: SelectQueryBuilder<DB, TB, O>, pagination: OffsetPaginationInput) {
  const page = pagination.page ?? 1;
  const perPage = pagination.perPage ?? 20;
  const result = await executeWithOffsetPagination(query, {
    page,
    perPage,
  });

  return {
    status: 'SUCCESS' as const,
    data: result.items,
    hasNextPage: result.hasNextPage,
  };
}
