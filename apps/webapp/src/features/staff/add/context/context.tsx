import type { DayOffType } from '@/components/AddOffDay';
import type { StaffType } from '@repo/domain/db';
import {
  assignedServicesSchema,
  dayOffsSchema,
  staffInfoSchema,
  workingHoursSchema,
} from '@repo/schemas';
import { defineStepper } from '@repo/ui/components';
import { ClockAlert, RefreshCcwDot, Stethoscope, UserPen } from 'lucide-react';
import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { AdditionalDayOffType, AllFormsType } from '../../__types';

export const STAFF_FORMS = [
  {
    id: 'staffInfo',
    label: 'Staff Info',
    schema: staffInfoSchema,
    icon: <UserPen />,
  },
  {
    id: 'assignedServices',
    label: 'Assigned Services',
    schema: assignedServicesSchema,
    icon: <Stethoscope />,
  },
  {
    id: 'workingHours',
    label: 'Working Hours',
    schema: workingHoursSchema,
    icon: <RefreshCcwDot />,
  },
  {
    id: 'dayOffs',
    label: 'Days Off',
    schema: dayOffsSchema,
    icon: <ClockAlert />,
  },
] as const;

export const createStaffFormStepper = (isDoctor?: boolean) => {
  const staffSchema = isDoctor
    ? staffInfoSchema
    : staffInfoSchema.omit({ specialistId: true });

  return defineStepper(
    ...[
      {
        id: 'staffInfo',
        label: 'Staff Info',
        schema: staffSchema,
        icon: <UserPen />,
      },
      {
        id: 'assignedServices',
        label: 'Assigned Services',
        schema: assignedServicesSchema,
        icon: <Stethoscope />,
      },
      {
        id: 'workingHours',
        label: 'Working Hours',
        schema: workingHoursSchema,
        icon: <RefreshCcwDot />,
      },
      {
        id: 'dayOffs',
        label: 'Days Off',
        schema: dayOffsSchema,
        icon: <ClockAlert />,
      },
    ],
  );
};

type CreateStaffFormType = ReturnType<typeof createStaffFormStepper>;

export type CreateStaffContextType = {
  type: StaffType;
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  stepper: ReturnType<CreateStaffFormType['useStepper']>;
  steps: CreateStaffFormType['steps'];
  utils: CreateStaffFormType['utils'];
  additionDayOff: AdditionalDayOffType;
  setAdditionDayOff: React.Dispatch<React.SetStateAction<AdditionalDayOffType>>;
  formValues?: AllFormsType;
  setFormValues: React.Dispatch<React.SetStateAction<AllFormsType>>;
};
export const CreateStaffContext = createContext<CreateStaffContextType | null>(
  null,
);

export const useCurrentTab = () => {
  return useContextSelector(
    CreateStaffContext,
    (state) =>
      [
        state?.currentTab as number,
        state?.setCurrentTab as React.Dispatch<React.SetStateAction<number>>,
      ] as const,
  );
};

export const useFormStepper = () => {
  return useContextSelector(
    CreateStaffContext,
    (state) => state?.stepper as ReturnType<CreateStaffFormType['useStepper']>,
  );
};

export const useStaffType = () => {
  return useContextSelector(
    CreateStaffContext,
    (state) => state?.type as StaffType,
  );
};

export const useStepperUtls = () => {
  return useContextSelector(CreateStaffContext, (state) => state?.utils);
};

export const useStepperSteps = () => {
  return useContextSelector(CreateStaffContext, (state) => state?.steps);
};

export const useAdditionalDayOff = () => {
  return useContextSelector(
    CreateStaffContext,
    (state) =>
      [
        state?.additionDayOff as DayOffType[],
        state?.setAdditionDayOff as React.Dispatch<
          React.SetStateAction<DayOffType[]>
        >,
      ] as const,
  );
};

export const useFormValues = () => {
  return useContextSelector(
    CreateStaffContext,
    (state) => [state?.formValues, state?.setFormValues] as const,
  );
};
