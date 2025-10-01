import { z } from 'zod';

export const assignedServicesSchema = z.object({
  cosmeticServices: z
    .array(z.string())
    .min(1, 'Should be selecting at least 1 cosmetic service')
    .default([]),
  treatmentService: z
    .array(z.string())
    .min(1, 'Should be selecting at least 1 treatment service')
    .default([]),
});

export const dayOffsSchema = z.object({
  dayOffs: z
    .array(z.string())
    .min(1, 'Should be selecting at least 1 day off')
    .default([]),
  extraDaysCount: z.number().default(0).optional(),
});

export const staffInfoSchema = z.object({
  file: z
    .string()
    .or(z.instanceof(File, { message: 'Please attach a valid image' })),
  type: z.enum(['FULL_TIME', 'PART_TIME'], {
    required_error: 'Employment type is required',
  }),
  firstName: z.string({ required_error: 'First Name is required' }),
  lastName: z.string({ required_error: 'Last Name is required' }),
  specialistId: z.string({ required_error: 'Specialist field is required' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required' }),
  email: z.string({ required_error: 'Email is required' }),
  address: z.string().optional(),
});

export const getStaffInfoSchema = z.object({
  file: z
    .string()
    .or(z.instanceof(File, { message: 'Please attach a valid image' })),
  type: z.enum(['FULL_TIME', 'PART_TIME'], {
    required_error: 'Employment type is required',
  }),
  firstName: z.string({ required_error: 'First Name is required' }),
  lastName: z.string({ required_error: 'Last Name is required' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required' }),
  email: z.string({ required_error: 'Email is required' }),
  address: z.string().optional(),
});

const interval = z
  .object({ startTime: z.number(), endTime: z.number() })
  .optional();

export const workingHoursSchema = z.object({
  monday: interval,
  tuesday: interval,
  wednesday: interval,
  thursday: interval,
  friday: interval,
  saturday: interval,
  sunday: interval,
});

export const additionalDaysOffSchema = z
  .array(
    z.object({
      name: z.string().min(1, 'Name is required'),
      from: z.date({ required_error: 'From date is required' }),
      to: z.date().optional(),
      repeat: z.boolean().optional(),
      id: z.string().optional(),
    }),
  )
  .default([]);

// types

export type AssignedServicesFormType = z.infer<typeof assignedServicesSchema>;
export type DayOffsFormType = z.infer<typeof dayOffsSchema>;
export type StaffInfoFormType = z.infer<typeof staffInfoSchema>;
export type WorkingHoursFormType = z.infer<typeof workingHoursSchema>;
export type AdditionalDayOffType = z.infer<typeof additionalDaysOffSchema>;
