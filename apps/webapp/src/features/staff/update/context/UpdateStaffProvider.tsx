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
  const [{ open, staffId }, setState] = React.useState<{
    open: boolean;
    staffId?: string;
  }>({ open: false });

  const onHide = () => {
    setState({ open: false });
  };

  const onShowUpdateModal = (staffId: string) => {
    setState({ open: true, staffId });
  };

  const setOpen = (open: boolean) => {
    setState((prev) => ({ ...prev, open }));
  };

  return (
    <UpdateStaffContext.Provider
      value={{
        open,
        onHide,
        staffId,
        setOpen,
        onShowUpdateModal,
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
