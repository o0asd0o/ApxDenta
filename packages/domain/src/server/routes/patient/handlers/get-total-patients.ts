import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { getTotalPatients } from './db-operations/queries/get-total-patients.query';

const inputSchema = z.object({
  isActive: z.boolean().optional(),
});

export type GetTotalPatientsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async (props: GetTotalPatientsProps) => {
  const data = await getTotalPatients(props);

  return {
    status: 'SUCCESS' as const,
    data,
  };
};

export { inputSchema, handler };
