import * as errors from '@/server/common/errors';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';
import { updatePatient } from './db-operations/commands/update-patient.command';

const inputSchema = z.object({
  patientId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  avatarId: z.string().optional().nullable(),
  dentalCareStart: z
    .enum(['TEENAGER', 'ABOUT_20', 'ABOUT_30', 'AFTER_30'])
    .optional(),
  lastDentalVisit: z
    .enum([
      'LESS_THAN_3_MONTHS',
      'LESS_THAN_6_MONTHS',
      'A_YEAR_AGO',
      'DONT_REMEMBER',
    ])
    .optional(),
  oralHygieneDuration: z
    .enum([
      'AROUND_1_MINUTE',
      'ABOUNT_2_MINUTES',
      'MORE_THAN_2_MINUTES',
      'I_DONT_KNOW',
    ])
    .optional(),
  washTeethFrequency: z
    .enum(['NEVER', 'ONCE', 'TWICE', 'THRICE', 'MORE_THAN_THRICE'])
    .optional(),
  changeToothBrushFrequency: z
    .enum(['EVERY_3_MONTHS', 'EVERY_6_MONTHS', 'EVERY_YEAR', 'AS_OCCUR'])
    .optional(),
  usingDentalFloss: z.boolean().optional(),
  usingMouthWash: z.boolean().optional(),
  status: z.enum(['NEW', 'ACTIVE', 'INACTIVE']).optional(),
  lat: z.number().optional(),
  long: z.number().optional(),
});

export type UpdatePatientParams = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: UpdatePatientParams) => {
  try {
    const { patientId, ...updateData } = input;
    await updatePatient(ctx.db, patientId, updateData);
    return { status: 'SUCCESS' as const, data: null };
  } catch (error) {
    console.error('Error updating patient information:', error);
    throw errors.serverError();
  }
};

export { inputSchema, handler };
