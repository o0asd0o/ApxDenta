import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { deletePatients } from './db-operations/commands/delete-patient.command';

const inputSchema = z.object({
  patientIds: z.array(z.string()),
});

export type DeletePatientParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: DeletePatientParams) => {
  try {
    await deletePatients(ctx.db, input.patientIds);
    return { status: 'SUCCESS' as const, data: null };
  } catch (error) {
    console.error('Error deleting patient(s):', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
