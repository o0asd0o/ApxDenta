import type React from 'react';
import { createContext, useContextSelector } from 'use-context-selector';
import type { PatientForDelete } from '../../__types';

export const UpdatePatientContext = createContext<{
  open: boolean;
  onHide: () => void;
  setOpen: (open: boolean) => void;

  patientId?: string;
  mode?: 'update' | 'delete' | 'multi-delete';
  name?: string;
  callback?: () => void;
  patientsForDelete: PatientForDelete[];

  onShowUpdateModal: (param: { patientId: string; name: string }) => void;
  onShowDeleteModal: (params: PatientForDelete) => void;
  onShowDeleteMultipleModal: (
    params: PatientForDelete[],
    callback: () => void,
  ) => void;
} | null>(null);

export const useUpdateModalVisibility = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) =>
      [
        (state?.open && state.mode === 'update') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
      ] as const,
  );
};

export const useDeleteModalVisibility = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) =>
      [
        (state?.open && state.mode === 'delete') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        {
          name: state?.name as string | undefined,
          patientId: state?.patientId as string | undefined,
        },
      ] as const,
  );
};

export const useDeleteMultipleModalVisibility = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) =>
      [
        (state?.open && state.mode === 'multi-delete') as boolean,
        state?.setOpen as React.Dispatch<React.SetStateAction<boolean>>,
        state?.patientsForDelete as PatientForDelete[],
        state?.callback as (() => void) | undefined,
      ] as const,
  );
};

export const useUpdatePatientId = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) => state?.patientId as string | undefined,
  );
};

export const useUpdatePatientAction = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) =>
      state?.onShowUpdateModal as (param: {
        patientId: string;
        name: string;
      }) => void,
  );
};

export const useDeletePatientAction = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) => state?.onShowDeleteModal as (params: PatientForDelete) => void,
  );
};

export const useDeleteMultiplePatientAction = () => {
  return useContextSelector(
    UpdatePatientContext,
    (state) =>
      state?.onShowDeleteMultipleModal as (
        params: PatientForDelete[],
        callback: () => void,
      ) => void,
  );
};
