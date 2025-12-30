import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getPatient } from './db-operations/queries/get-patient.query';

const inputSchema = z.object({
  patientId: z.string(),
});

export type GetPatientParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: GetPatientParams) => {
  const patient = await getPatient({
    ctx,
    input,
  });

  return { data: patient };
};

export { inputSchema, handler };
