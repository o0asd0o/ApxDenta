import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { archiveTreatmentsByIds } from './db-operations/commands/archive-treatments.command';

const inputSchema = z.object({
  treatmentIds: z.array(z.string()),
});

export type ArchiveStaffParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: ArchiveStaffParams) => {
  try {
    await archiveTreatmentsByIds(ctx.db, input.treatmentIds);
    return { data: null, status: 'SUCCESS' };
  } catch (error) {
    console.error('Error updating treatment information:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
