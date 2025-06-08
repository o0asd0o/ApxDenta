import { defineStepper } from '@repo/ui/components';
import { ClockAlert, RefreshCcwDot, Stethoscope, UserPen } from 'lucide-react';
import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import { assignedServicesSchema } from '../forms/AssignedServicesForm';
import { daysOffSchema } from '../forms/DaysOffForm';
import { staffInfoSchema } from '../forms/StaffInfoForm';
import { workingHoursSchema } from '../forms/WorkingHoursForm';

const { useStepper, steps, utils } = defineStepper(
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
    id: 'daysOff',
    label: 'Days Off',
    schema: daysOffSchema,
    icon: <ClockAlert />,
  },
);

export const params = { useStepper, steps, utils };

export const CreateStaffContext = createContext<{
  currentTab: number;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  stepper: ReturnType<typeof useStepper>;
  steps: typeof steps;
  utils: typeof utils;
} | null>(null);

/**
 * 
 * @returns const selected = useContextSelector(NavigationTabsContext, (state) => {
     return state?.tabs.find((item) => item.value === state?.selectedTab);
   });
 */

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
    (state) => state?.stepper as ReturnType<typeof useStepper>,
  );
};

export const useStepperUtls = () => {
  return useContextSelector(CreateStaffContext, (state) => state?.utils);
};

export const useStepperSteps = () => {
  return useContextSelector(CreateStaffContext, (state) => state?.steps);
};
