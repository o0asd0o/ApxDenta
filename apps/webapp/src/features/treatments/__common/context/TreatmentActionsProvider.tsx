import React, { useState } from 'react';
import type { TreatmentColumnType } from '../../__types';
import { UpdateTreatmentContext } from './context';

type Props = {
  children?: React.ReactNode;
};

export const TreatmentActionsProvider: React.FC<Props> = ({ children }) => {
  const [{ open, mode, treatmentId, name, callback }, setState] =
    React.useState<{
      open: boolean;
      mode?: 'update' | 'archive' | 'multi-archive';
      treatmentId?: string;
      name?: string;
      callback?: () => void;
    }>({ open: false });

  const [treatmentsForArchive, setTreatmentsForArchive] = useState<
    TreatmentColumnType[]
  >([]);

  const onHide = () => {
    setState({ open: false });
  };

  const onShowUpdateModal = (param: { treatmentId: string; name: string }) => {
    setState({
      open: true,
      treatmentId: param.treatmentId,
      mode: 'update',
      name: param.name,
    });
  };

  const onShowArchiveMultipleModal = (
    params: TreatmentColumnType[],
    callback: () => void,
  ) => {
    setState({ open: true, mode: 'multi-archive', callback });
    setTreatmentsForArchive(params);
  };

  const onShowArchiveModal = (params: TreatmentColumnType) => {
    setState({
      treatmentId: params.id,
      name: params.name,
      open: true,
      mode: 'archive',
    });
  };

  const setOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  };

  console.log({});

  return (
    <UpdateTreatmentContext.Provider
      value={{
        open,
        mode,
        treatmentId,
        name,
        treatmentsForArchive,
        callback,
        onHide,
        setOpen,
        onShowUpdateModal,
        onShowArchiveModal,
        onShowArchiveMultipleModal,
      }}
    >
      {children as React.JSX.Element}
    </UpdateTreatmentContext.Provider>
  );
};
