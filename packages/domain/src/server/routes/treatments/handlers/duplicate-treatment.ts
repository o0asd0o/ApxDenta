import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { duplicateTreatment } from './db-operations/commands/duplicate-treatment.command';

const inputSchema = z.object({
  treatmentId: z.string(),
});

export type DuplicateTreatmentParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: DuplicateTreatmentParams) => {
  const duplicated = await duplicateTreatment({ input, ctx });

  return { status: 'SUCCESS' as const, id: duplicated.id };
};

export { inputSchema, handler };
