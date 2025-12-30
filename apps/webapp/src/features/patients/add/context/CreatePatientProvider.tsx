import React, { useState } from 'react';
import type { PatientFormValuesType } from '../__types';
import { CreatePatientContext, createPatientFormStepper } from './context';

type Props = {
  children?: React.ReactNode;
};

export const CreatePatientProvider: React.FC<Props> = ({ children }) => {
  const [{ useStepper, steps, utils }] = useState(createPatientFormStepper());
  const [formValues, setFormValues] = useState<PatientFormValuesType>({});

  const stepper = useStepper();

  return (
    <CreatePatientContext.Provider
      value={{
        stepper,
        steps,
        utils,
        formValues,
        setFormValues,
      }}
    >
      {children as React.JSX.Element}
    </CreatePatientContext.Provider>
  );
};
