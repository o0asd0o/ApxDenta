import type { DayOff, StaffType } from '@repo/domain/db';
import React, { useState } from 'react';
import type { AllFormsType } from '../../__types';
import { CreateStaffContext, createStaffFormStepper } from './context';

type Props = {
  children?: React.ReactNode;
  type: StaffType;
};

export const CreateStaffProvider: React.FC<Props> = ({ children, type }) => {
  const [{ useStepper, steps, utils }] = useState(
    createStaffFormStepper(type === 'DOCTOR'),
  );
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [additionDayOff, setAdditionDayOff] = useState<Pick<DayOff, 'name'>[]>(
    [],
  );

  const [formValues, setFormValues] = useState<AllFormsType>({});

  const stepper = useStepper();

  return (
    <CreateStaffContext.Provider
      value={{
        // stepper management
        currentTab,
        setCurrentTab,
        steps,
        utils,
        stepper,
        type,

        // additional day off management
        additionDayOff,
        setAdditionDayOff,

        // manage form values
        formValues,
        setFormValues,
      }}
    >
      {children as React.JSX.Element}
    </CreateStaffContext.Provider>
  );
};
