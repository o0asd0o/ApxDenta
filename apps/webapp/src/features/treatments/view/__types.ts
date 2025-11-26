import type {
  MedicalComponent,
  TreatmentComponent,
  TreatmentVisit,
} from '@repo/domain/db';

export type TreatmentComponents = (Omit<
  TreatmentComponent,
  'id' | 'createdAt' | 'updatedAt' | 'treatmentId' | 'medicalComponentId'
> & {
  id: string;
  medicalComponent: Pick<MedicalComponent, 'name' | 'price'> | null;
})[];

export type TreatmentVisits = (Omit<
  TreatmentVisit,
  'id' | 'treatmentId' | 'visitTreatmentId'
> & {
  id: string;
  visitTreatment: {
    description: string;
    name: string;
    id: string;
  } | null;
})[];
