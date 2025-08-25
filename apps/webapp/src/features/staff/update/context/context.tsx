import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export const UpdateStaffContext = createContext<{
  open: boolean;
  onHide: () => void;
  setOpen: (open: boolean) => void;

  staffId?: string;
  onShowUpdateModal: (staffId: string) => void;
} | null>(null);

export const useUpdateModalVisibility = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      [
        state?.open as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
      ] as const,
  );
};

export const useUpdateStaffId = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) => state?.staffId as string | undefined,
  );
};

export const useUpdateStaffIdAction = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) => state?.onShowUpdateModal as (staffId: string) => void,
  );
};
