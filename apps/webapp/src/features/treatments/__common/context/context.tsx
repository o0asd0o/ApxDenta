import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { TreatmentColumnType } from '../../__types';

export const UpdateTreatmentContext = createContext<{
  open: boolean;
  onHide: () => void;
  setOpen: (open: boolean) => void;

  treatmentId?: string;
  mode?: 'update' | 'archive' | 'multi-archive';
  name?: string;
  callback?: () => void;
  treatmentsForArchive: TreatmentColumnType[];

  onShowUpdateModal: (param: {
    treatmentId: string;
    name: string;
  }) => void;
  onShowArchiveModal: (params: TreatmentColumnType) => void;
  onShowArchiveMultipleModal: (
    params: TreatmentColumnType[],
    callback: () => void,
  ) => void;
} | null>(null);

export const useUpdateModalVisibility = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      [
        (state?.open && state.mode === 'update') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
      ] as const,
  );
};

export const useArchiveModalVisibility = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      [
        (state?.open && state.mode === 'archive') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        {
          name: state?.name as string | undefined,
          treatmentId: state?.treatmentId as string | undefined,
        },
      ] as const,
  );
};

export const useArchiveMultipleModalVisibility = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      [
        (state?.open && state.mode === 'multi-archive') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        state?.treatmentsForArchive as TreatmentColumnType[],
        state?.callback as (() => void) | undefined,
      ] as const,
  );
};

export const useUpdateTreatmentId = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) => state?.treatmentId as string | undefined,
  );
};

export const useUpdateTreatmentIdAction = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      state?.onShowUpdateModal as (param: {
        treatmentId: string;
        name: string;
      }) => void,
  );
};

export const useArchiveTreatmentIdAction = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      state?.onShowArchiveModal as (params: TreatmentColumnType) => void,
  );
};

export const useArchiveMultipleTreatmentIdAction = () => {
  return useContextSelector(
    UpdateTreatmentContext,
    (state) =>
      state?.onShowArchiveMultipleModal as (
        params: TreatmentColumnType[],
        callback: () => void,
      ) => void,
  );
};
