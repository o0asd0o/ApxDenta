import type { DayOff } from '@repo/domain/db';
import React, { useState } from 'react';
import type { AllFormsType } from '../../__types';
import { CreateStaffContext, params } from './context';

type Props = {
  children?: React.ReactNode;
};

export const CreateStaffProvider: React.FC<Props> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [additionDayOff, setAdditionDayOff] = useState<Pick<DayOff, 'name'>[]>(
    [],
  );

  const [formValues, setFormValues] = useState<AllFormsType>({});

  const stepper = params.useStepper();

  return (
    <CreateStaffContext.Provider
      value={{
        // stepper management
        currentTab,
        setCurrentTab,
        steps: params.steps,
        utils: params.utils,
        stepper,

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
