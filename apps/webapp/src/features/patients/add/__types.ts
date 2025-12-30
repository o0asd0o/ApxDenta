import type {
  PatientBasicInfoFormType,
  PatientOralHygieneFormType,
} from '@repo/schemas';
import type { UseFormReturn } from 'react-hook-form';

export type PatientFormValuesType = {
  basicInfo?: PatientBasicInfoFormType;
  oralHygiene?: PatientOralHygieneFormType;
};

// biome-ignore lint/suspicious/noExplicitAny: Flexible form type
type Empty = any | any[];

export type CreatePatientBasicInfoFormType = UseFormReturn<
  PatientBasicInfoFormType,
  unknown,
  Empty
>;

export type CreatePatientOralHygieneFormType = UseFormReturn<
  PatientOralHygieneFormType,
  unknown,
  Empty
>;
