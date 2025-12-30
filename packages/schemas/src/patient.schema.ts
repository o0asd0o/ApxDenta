import z from 'zod';

// Basic Information Schema (Step 1)
export const patientBasicInfoSchema = z.object({
  file: z
    .string()
    .or(z.instanceof(File, { message: 'Please attach a valid image' }))
    .optional(),
  firstName: z
    .string({ required_error: 'First name is required' })
    .min(1, 'First name is required'),
  lastName: z
    .string({ required_error: 'Last name is required' })
    .min(1, 'Last name is required'),
  email: z
    .string({ required_error: 'Email is required' })
    .email('Invalid email address'),
  phoneNumber: z
    .string({ required_error: 'Phone number is required' })
    .min(1, 'Phone number is required'),
  address: z
    .string({ required_error: 'Address is required' })
    .min(1, 'Address is required'),
  age: z
    .number({ required_error: 'Age is required' })
    .min(1, 'Age must be at least 1')
    .max(150, 'Age must be less than 150'),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Gender is required',
  }),
});

// Oral Hygiene Schema (Step 2)
export const patientOralHygieneSchema = z.object({
  dentalCareStart: z.enum(['TEENAGER', 'ABOUT_20', 'ABOUT_30', 'AFTER_30'], {
    required_error: 'Dental care start is required',
  }),
  lastDentalVisit: z.enum(
    ['LESS_THAN_3_MONTHS', 'LESS_THAN_6_MONTHS', 'A_YEAR_AGO', 'DONT_REMEMBER'],
    {
      required_error: 'Last dental visit is required',
    },
  ),
  oralHygieneDuration: z.enum(
    [
      'AROUND_1_MINUTE',
      'ABOUNT_2_MINUTES',
      'MORE_THAN_2_MINUTES',
      'I_DONT_KNOW',
    ],
    {
      required_error: 'Oral hygiene duration is required',
    },
  ),
  washTeethFrequency: z.enum(
    ['NEVER', 'ONCE', 'TWICE', 'THRICE', 'MORE_THAN_THRICE'],
    {
      required_error: 'Teeth washing frequency is required',
    },
  ),
  changeToothBrushFrequency: z.enum(
    ['EVERY_3_MONTHS', 'EVERY_6_MONTHS', 'EVERY_YEAR', 'AS_OCCUR'],
    {
      required_error: 'Toothbrush change frequency is required',
    },
  ),
  usingDentalFloss: z.boolean({
    required_error: 'Please specify if you use dental floss',
  }),
  usingMouthWash: z.boolean({
    required_error: 'Please specify if you use mouth wash',
  }),
});

// Combined schema for full patient form
export const patientSchema = patientBasicInfoSchema.merge(
  patientOralHygieneSchema,
);

export type PatientBasicInfoFormType = z.infer<typeof patientBasicInfoSchema>;
export type PatientOralHygieneFormType = z.infer<
  typeof patientOralHygieneSchema
>;
export type PatientFormType = z.infer<typeof patientSchema>;
