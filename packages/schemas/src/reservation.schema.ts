import { z } from 'zod';

export const attachedReservationFileSchema = z.object({
  id: z.string(),
  file: z.instanceof(File),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  progress: z.number(),
  status: z.enum(['uploading', 'completed', 'cancelled']),
});

export const reservationTreatmentAndDentistSchema = z
  .object({
    treatmentId: z.string().min(1, 'Select a treatment'),
    doctorId: z.string().min(1, 'Select a dentist'),
    date: z.string().min(1, 'Select a date'),
    startTime: z.string().min(1, 'Select a start time'),
    endTime: z.string().min(1, 'Select an end time'),
    note: z
      .string()
      .max(200, 'Quick note must be 200 characters or less')
      .optional(),
    attachedFiles: z.array(attachedReservationFileSchema).optional(),
  })
  .refine((values) => values.endTime > values.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  });

export const reservationBasicInformationSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().min(1, 'Enter or select a patient name'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
});

export const reservationOralHygieneHabitsSchema = z.object({
  lastDentalVisit: z.string().min(1, 'Select an answer'),
  dentalCareStart: z.string().min(1, 'Select an answer'),
  washTeethFrequency: z.string().min(1, 'Select an answer'),
  oralHygieneDuration: z.string().min(1, 'Select an answer'),
  changeToothBrushFrequency: z.string().min(1, 'Select an answer'),
  usingMouthWash: z.boolean(),
  usingDentalFloss: z.boolean(),
});

export type AttachedReservationFileType = z.infer<
  typeof attachedReservationFileSchema
>;
export type ReservationTreatmentAndDentistFormType = z.infer<
  typeof reservationTreatmentAndDentistSchema
>;
export type ReservationBasicInformationFormType = z.infer<
  typeof reservationBasicInformationSchema
>;
export type ReservationOralHygieneHabitsFormType = z.infer<
  typeof reservationOralHygieneHabitsSchema
>;
