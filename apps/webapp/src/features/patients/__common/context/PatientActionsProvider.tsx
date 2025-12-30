import React, { useState } from 'react';
import type { PatientForDelete } from '../../__types';
import { UpdatePatientContext } from './context';

type Props = {
  children?: React.ReactNode;
};

export const PatientActionsProvider: React.FC<Props> = ({ children }) => {
  const [{ open, mode, patientId, name, callback }, setState] = React.useState<{
    open: boolean;
    mode?: 'update' | 'delete' | 'multi-delete';
    patientId?: string;
    name?: string;
    callback?: () => void;
  }>({ open: false });

  const [patientsForDelete, setPatientsForDelete] = useState<
    PatientForDelete[]
  >([]);

  const onHide = () => {
    setState({ open: false });
  };

  const onShowUpdateModal = (param: { patientId: string; name: string }) => {
    setState({
      open: true,
      patientId: param.patientId,
      mode: 'update',
      name: param.name,
    });
  };

  const onShowDeleteMultipleModal = (
    params: PatientForDelete[],
    callback: () => void,
  ) => {
    setState({ open: true, mode: 'multi-delete', callback });
    setPatientsForDelete(params);
  };

  const onShowDeleteModal = (params: PatientForDelete) => {
    setState({
      patientId: params.id,
      name: params.name,
      open: true,
      mode: 'delete',
    });
  };

  const setOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  };

  return (
    <UpdatePatientContext.Provider
      value={{
        open,
        mode,
        patientId,
        name,
        patientsForDelete,
        callback,
        onHide,
        setOpen,
        onShowUpdateModal,
        onShowDeleteModal,
        onShowDeleteMultipleModal,
      }}
    >
      {children as React.JSX.Element}
    </UpdatePatientContext.Provider>
  );
};
