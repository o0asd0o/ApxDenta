import { z } from 'zod';

export const offsetPaginationInput = z.object({
  page: z.number().optional(),
  perPage: z.number().optional(),
});

export const cursorPaginationInput = z.object({
  cursor: z.string().optional(),
  limit: z.number().optional(),
});

export const fileSchema = z.object({
  name: z.string(),
  type: z.string(),
  size: z.number(),
  key: z.string(),
});

export const workDayEnum = z.enum([
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
]);

export const staffStatusEnum = z.enum([
  'ACTIVE',
  'INACTIVE',
  'EXPIRED',
  'RESIGNED',
  'SUSPENDED',
  'TERMINATED',
]);

export type OffsetPaginationInput = z.infer<typeof offsetPaginationInput>;
export type CursorPaginationInput = z.infer<typeof cursorPaginationInput>;
