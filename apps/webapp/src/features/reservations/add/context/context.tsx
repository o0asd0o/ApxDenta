import {
  reservationBasicInformationSchema,
  reservationOralHygieneHabitsSchema,
  reservationTreatmentAndDentistSchema,
} from '@repo/schemas';
import { defineStepper } from '@repo/ui/components';
import { ClipboardList, Smile, Stethoscope } from 'lucide-react';
import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { WaitlistFormValues } from '../../components/__types';

export const createWaitlistFormStepper = () => {
  return defineStepper(
    {
      id: 'treatmentAndDentist',
      label: 'Treatment & Dentist',
      schema: reservationTreatmentAndDentistSchema,
      icon: <Stethoscope />,
    },
    {
      id: 'basicInformation',
      label: 'Basic Information',
      schema: reservationBasicInformationSchema,
      icon: <ClipboardList />,
    },
    {
      id: 'oralHygieneHabits',
      label: 'Oral Hygiene habits',
      schema: reservationOralHygieneHabitsSchema,
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
