import React, { useState } from 'react';
import { CreateStaffContext, params } from './context';

type Props = {
  children?: React.ReactNode;
};

export const CreateStaffProvider: React.FC<Props> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const stepper = params.useStepper();

  return (
    <CreateStaffContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        steps: params.steps,
        utils: params.utils,
        stepper,
      }}
    >
      {children as React.JSX.Element}
    </CreateStaffContext.Provider>
  );
};
