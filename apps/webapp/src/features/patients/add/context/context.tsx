import {
  patientBasicInfoSchema,
  patientOralHygieneSchema,
} from '@repo/schemas';
import { defineStepper } from '@repo/ui/components';
import { Sparkles, UserPen } from 'lucide-react';
import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { PatientFormValuesType } from '../__types';

export const PATIENT_FORMS = [
  {
    id: 'basicInfo',
    label: 'Basic Info',
    schema: patientBasicInfoSchema,
    icon: <UserPen />,
  },
  {
    id: 'oralHygiene',
    label: 'Oral Hygiene',
    schema: patientOralHygieneSchema,
    icon: <Sparkles />,
  },
] as const;

export const createPatientFormStepper = () => {
  return defineStepper(
    {
      id: 'basicInfo',
      label: 'Basic Info',
      schema: patientBasicInfoSchema,
      icon: <UserPen />,
    },
    {
      id: 'oralHygiene',
      label: 'Oral Hygiene',
      schema: patientOralHygieneSchema,
      icon: <Sparkles />,
    },
  );
};

type CreatePatientFormType = ReturnType<typeof createPatientFormStepper>;

export type CreatePatientContextType = {
  stepper: ReturnType<CreatePatientFormType['useStepper']>;
  steps: CreatePatientFormType['steps'];
  utils: CreatePatientFormType['utils'];
  formValues?: PatientFormValuesType;
  setFormValues: React.Dispatch<React.SetStateAction<PatientFormValuesType>>;
};

export const CreatePatientContext =
  createContext<CreatePatientContextType | null>(null);

export const useFormStepper = () => {
  const stepper = useContextSelector(
    CreatePatientContext,
    (state) => state?.stepper,
  );

  if (!stepper) {
    throw new Error(
      'useFormStepper must be used within a CreatePatientProvider',
    );
  }

  return stepper;
};

export const useStepperUtils = () => {
  return useContextSelector(CreatePatientContext, (state) => state?.utils);
};

export const useStepperSteps = () => {
  return useContextSelector(CreatePatientContext, (state) => state?.steps);
};

export const useFormValues = () => {
  return useContextSelector(
    CreatePatientContext,
    (state) => [state?.formValues, state?.setFormValues] as const,
  );
};
