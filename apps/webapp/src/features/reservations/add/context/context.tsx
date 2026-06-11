import { defineStepper } from '@repo/ui/components';
import { ClipboardList, Smile, Stethoscope } from 'lucide-react';
import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { z } from 'zod';
import type { WaitlistFormValues } from '../../components/__types';

export const treatmentAndDentistSchema = z
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
  })
  .refine((values) => values.endTime > values.startTime, {
    message: 'End time must be after start time',
    path: ['endTime'],
  });

export const basicInformationSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().min(1, 'Enter or select a patient name'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  phoneNumber: z.string().optional(),
  age: z.coerce.number().int().positive().optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
});

export const oralHygieneHabitsSchema = z.object({
  lastDentalVisit: z.string().min(1, 'Select an answer'),
  dentalCareStart: z.string().min(1, 'Select an answer'),
  washTeethFrequency: z.string().min(1, 'Select an answer'),
  oralHygieneDuration: z.string().min(1, 'Select an answer'),
  changeToothBrushFrequency: z.string().min(1, 'Select an answer'),
  usingMouthWash: z.boolean(),
  usingDentalFloss: z.boolean(),
});

export const createWaitlistFormStepper = () => {
  return defineStepper(
    {
      id: 'treatmentAndDentist',
      label: 'Treatment & Dentist',
      schema: treatmentAndDentistSchema,
      icon: <Stethoscope />,
    },
    {
      id: 'basicInformation',
      label: 'Basic Information',
      schema: basicInformationSchema,
      icon: <ClipboardList />,
    },
    {
      id: 'oralHygieneHabits',
      label: 'Oral Hygiene habits',
      schema: oralHygieneHabitsSchema,
      icon: <Smile />,
    },
  );
};

type CreateWaitlistFormType = ReturnType<typeof createWaitlistFormStepper>;

export type CreateWaitlistContextType = {
  stepper: ReturnType<CreateWaitlistFormType['useStepper']>;
  steps: CreateWaitlistFormType['steps'];
  utils: CreateWaitlistFormType['utils'];
  formValues: WaitlistFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<WaitlistFormValues>>;
};

export const CreateWaitlistContext =
  createContext<CreateWaitlistContextType | null>(null);

export const useFormStepper = () => {
  const stepper = useContextSelector(
    CreateWaitlistContext,
    (state) => state?.stepper,
  );

  if (!stepper) {
    throw new Error(
      'useFormStepper must be used within CreateWaitlistProvider',
    );
  }

  return stepper;
};

export const useStepperUtils = () => {
  return useContextSelector(CreateWaitlistContext, (state) => state?.utils);
};

export const useStepperSteps = () => {
  return useContextSelector(CreateWaitlistContext, (state) => state?.steps);
};

export const useFormValues = () => {
  return useContextSelector(
    CreateWaitlistContext,
    (state) => [state?.formValues ?? {}, state?.setFormValues] as const,
  );
};
