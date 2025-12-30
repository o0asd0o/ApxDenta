import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { StaffColumnType } from '../../__types';

export const UpdateStaffContext = createContext<{
  open: boolean;
  onHide: () => void;
  setOpen: (open: boolean) => void;

  staffId?: string;
  mode?: 'update' | 'archive' | 'multi-archive';
  name?: string;
  callback?: () => void;
  staffsForArchive: StaffColumnType[];

  onShowUpdateModal: (param: {
    staffId: string;
    name: string;
  }) => void;
  onShowArchiveModal: (params: StaffColumnType, callback?: () => void) => void;
  onShowArchiveMultipleModal: (
    params: StaffColumnType[],
    callback: () => void,
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
        state?.callback as (() => void) | undefined,
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
        state?.staffsForArchive as StaffColumnType[],
        state?.callback as (() => void) | undefined,
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
      state?.onShowArchiveModal as (
        params: StaffColumnType,
        callback?: () => void,
      ) => void,
  );
};

export const useArchiveMultipleStaffIdAction = () => {
  return useContextSelector(
    UpdateStaffContext,
    (state) =>
      state?.onShowArchiveMultipleModal as (
        params: StaffColumnType[],
        callback: () => void,
      ) => void,
  );
};
