import React from 'react';
import { UpdateStaffContext } from './context';

type Props = {
  children?: React.ReactNode;
};

export const UpdateStaffProvider: React.FC<Props> = ({ children }) => {
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
      {children as React.JSX.Element}
    </UpdateStaffContext.Provider>
  );
};
