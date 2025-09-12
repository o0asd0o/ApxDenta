import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';

export const UpdateStaffContext = createContext<{
  open: boolean;
  onHide: () => void;
  setOpen: (open: boolean) => void;

  staffId?: string;
  mode?: 'update' | 'archive' | 'multi-archive';
  name?: string;
  staffsForArchive: { staffId: string; name: string }[];

  onShowUpdateModal: (param: {
    staffId: string;
    name: string;
  }) => void;
  onShowArchiveModal: (params: { staffId: string; name: string }) => void;
  onShowArchiveMultipleModal: (
    params: {
      staffId: string;
      name: string;
    }[],
  ) => void;
} | null>(null);

export const useUpdateModalVisibility = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      [
        (state?.open && state.mode === 'update') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
      ] as const,
  );
};

export const useArchiveModalVisibility = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      [
        (state?.open && state.mode === 'archive') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        {
          name: state?.name as string | undefined,
          staffId: state?.staffId as string | undefined,
        },
      ] as const,
  );
};

export const useArchiveMultipleModalVisibility = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      [
        (state?.open && state.mode === 'multi-archive') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        state?.staffsForArchive as { staffId: string; name: string }[],
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
    (state) =>
      state?.onShowUpdateModal as (param: {
        staffId: string;
        name: string;
      }) => void,
  );
};

export const useArchiveStaffIdAction = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      state?.onShowArchiveModal as (params: {
        staffId: string;
        name: string;
      }) => void,
  );
};
