import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { createPatient } from './db-operations/commands/create-patient.command';

const inputSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.string(),
  age: z.number(),
  gender: z.enum(['MALE', 'FEMALE']),
  avatarId: z.string().optional(),
  dentalCareStart: z.enum(['TEENAGER', 'ABOUT_20', 'ABOUT_30', 'AFTER_30']),
  lastDentalVisit: z.enum([
    'LESS_THAN_3_MONTHS',
    'LESS_THAN_6_MONTHS',
    'A_YEAR_AGO',
    'DONT_REMEMBER',
  ]),
  oralHygieneDuration: z.enum([
    'AROUND_1_MINUTE',
    'ABOUNT_2_MINUTES',
    'MORE_THAN_2_MINUTES',
    'I_DONT_KNOW',
  ]),
  washTeethFrequency: z.enum([
    'NEVER',
    'ONCE',
    'TWICE',
    'THRICE',
    'MORE_THAN_THRICE',
  ]),
  changeToothBrushFrequency: z.enum([
    'EVERY_3_MONTHS',
    'EVERY_6_MONTHS',
    'EVERY_YEAR',
    'AS_OCCUR',
  ]),
  usingDentalFloss: z.boolean(),
  usingMouthWash: z.boolean(),
  lat: z.number().optional(),
  long: z.number().optional(),
});

export type CreatePatientParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: CreatePatientParams) => {
  const created = await createPatient({ input, ctx });

  return { status: 'SUCCESS' as const, id: created.id };
};

export { inputSchema, handler };
