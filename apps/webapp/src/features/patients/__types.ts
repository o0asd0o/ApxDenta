import type { PaginationState } from '@/components/__types';
import type { SortingState } from '@tanstack/react-table';
import type React from 'react';

export type PatientFilterType = {
  search?: string;
};

export type LayoutProps = {
  isActive: boolean;
  filters: PatientFilterType;
  pagination: PaginationState;
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
};

export type PatientColumnType = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt: Date;
  lastReservation: {
    createdAt: Date;
    initialTreatmentId: string;
    id: string;
  } | null;
  lastTreatment: {
    name: string;
    id: string;
  } | null;
};
