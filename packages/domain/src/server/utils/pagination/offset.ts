import type { SelectQueryBuilder } from 'kysely';

export type OffsetPaginationResult<O> = {
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  endCursor: null;
  items: O[];
};

export const queryWithOffsetPagination = <O, DB, TB extends keyof DB>(
  _qb: SelectQueryBuilder<DB, TB, O>,
  opts: {
    perPage: number;
    page: number;
  },
): SelectQueryBuilder<DB, TB, O> => {
  let qb = _qb;
  qb = qb.limit(opts.perPage + 1).offset((opts.page - 1) * opts.perPage);

  return qb;
};

export async function executeWithOffsetPagination<O, DB, TB extends keyof DB>(
  _qb: SelectQueryBuilder<DB, TB, O>,
  opts: {
    perPage: number;
    page: number;
  },
): Promise<OffsetPaginationResult<O>> {
  const qb = queryWithOffsetPagination(_qb, opts);

  const items = await qb.execute();

  const hasNextPage =
    items.length > 0 ? items.length > opts.perPage : undefined;
  const hasPrevPage = items.length > 0 ? opts.page > 1 : undefined;

  // If we fetched an extra row to determine if we have a next page, that
  // shouldn't be in the returned results
  if (items.length > opts.perPage) {
    items.pop();
  }

  return {
    endCursor: null,
    hasNextPage,
    hasPrevPage,
    items,
    // count: Number.parseInt(count as string),
  };
}
