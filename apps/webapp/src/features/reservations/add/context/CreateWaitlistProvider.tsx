import React, { useState } from 'react';
import type { WaitlistFormValues } from '../../components/__types';
import { CreateWaitlistContext, createWaitlistFormStepper } from './context';

type Props = {
  children: React.ReactNode;
};

export const CreateWaitlistProvider: React.FC<Props> = ({ children }) => {
  const [{ useStepper, steps, utils }] = useState(createWaitlistFormStepper);
  const [formValues, setFormValues] = useState<WaitlistFormValues>({});
  const stepper = useStepper();

  return (
    <CreateWaitlistContext.Provider
      value={{
        stepper,
        steps,
        utils,
        formValues,
        setFormValues,
      }}
    >
      {children}
    </CreateWaitlistContext.Provider>
  );
};
