import type { DayOff } from '@repo/domain/db';
import React, { useState } from 'react';
import {
  CreateStaffContext,
  type CreateStaffContextType,
} from '../../add/context/context';
import { UpdateStaffContext } from './context';

type Props = {
  children?: React.ReactNode;
};

export const UpdateStaffProvider: React.FC<Props> = ({ children }) => {
  const [additionDayOff, setAdditionDayOff] = useState<Pick<DayOff, 'name'>[]>(
    [],
  );
  const [{ open, mode, staffId, name }, setState] = React.useState<{
    open: boolean;
    mode?: 'update' | 'archive' | 'multi-archive';
    staffId?: string;
    name?: string;
  }>({ open: false });

  const [staffsForArchive, setStaffsForArchive] = useState<
    { staffId: string; name: string }[]
  >([]);

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
    params: { staffId: string; name: string }[],
  ) => {
    setState({ open: true, mode: 'multi-archive' });
    setStaffsForArchive(params);
  };

  const onShowArchiveModal = (params: { staffId: string; name: string }) => {
    setState({ ...params, open: true, mode: 'archive' });
  };

  const setOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  };

  console.log({});

  return (
    <UpdateStaffContext.Provider
      value={{
        open,
        mode,
        staffId,
        name,
        staffsForArchive,
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
