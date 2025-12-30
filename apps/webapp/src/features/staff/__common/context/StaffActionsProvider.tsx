import type { DayOff } from '@repo/domain/db';
import React, { useState } from 'react';
import type { StaffColumnType } from '../../__types';
import {
  CreateStaffContext,
  type CreateStaffContextType,
} from '../../add/context/context';
import { UpdateStaffContext } from './context';

type Props = {
  children?: React.ReactNode;
};

export const StaffActionsProvider: React.FC<Props> = ({ children }) => {
  const [additionDayOff, setAdditionDayOff] = useState<Pick<DayOff, 'name'>[]>(
    [],
  );
  const [{ open, mode, staffId, name, callback }, setState] = React.useState<{
    open: boolean;
    mode?: 'update' | 'archive' | 'multi-archive';
    staffId?: string;
    name?: string;
    callback?: () => void;
  }>({ open: false });

  const [staffsForArchive, setStaffsForArchive] = useState<StaffColumnType[]>(
    [],
  );

  const onHide = () => {
    setState({ open: false });
  };

  const onShowUpdateModal = (param: { staffId: string; name: string }) => {
    setState({
      open: true,
      staffId: param.staffId,
      mode: 'update',
      name: param.name,
    });
  };

  const onShowArchiveMultipleModal = (
    params: StaffColumnType[],
    callback: () => void,
  ) => {
    setState({ open: true, mode: 'multi-archive', callback });
    setStaffsForArchive(params);
  };

  const onShowArchiveModal = (
    params: StaffColumnType,
    callback?: () => void,
  ) => {
    setState({
      staffId: params.id,
      name: `${params.firstName} ${params.lastName}`,
      open: true,
      mode: 'archive',
      callback,
    });
  };

  const setOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  };

  return (
    <UpdateStaffContext.Provider
      value={{
        open,
        mode,
        staffId,
        name,
        staffsForArchive,
        callback,
        onHide,
        setOpen,
        onShowUpdateModal,
        onShowArchiveModal,
        onShowArchiveMultipleModal,
      }}
    >
      <CreateStaffContext.Provider
        value={
          {
            additionDayOff,
            setAdditionDayOff,
          } as unknown as CreateStaffContextType
        }
      >
        {children as React.JSX.Element}
      </CreateStaffContext.Provider>
    </UpdateStaffContext.Provider>
  );
};
