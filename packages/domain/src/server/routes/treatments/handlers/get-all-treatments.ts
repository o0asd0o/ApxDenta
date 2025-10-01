import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getAllTreatments } from './db-operations/getAllTreatments';

const inputSchema = z.void();

export type GetAllTreatmentsParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async (params: GetAllTreatmentsParams) => {
  const result = await getAllTreatments(params);

  return { status: 'SUCCESS' as const, data: result };
};

export { inputSchema, handler };
