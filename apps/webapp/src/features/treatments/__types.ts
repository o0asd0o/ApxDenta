import type { PaginationState } from '@/components/__types';
import type {
  Treatment,
  TreatmentStatus,
  TreatmentVisitType,
} from '@repo/domain/db';
import type { SortingState } from '@tanstack/react-table';
import type React from 'react';

export type TreatmentColumnType = Omit<
  Treatment,
  'id' | 'createdAt' | 'updatedAt' | 'status' | 'description' | 'isArchived'
> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: TreatmentStatus;
  description: string;
  isArchived: boolean;

  averageDuration: number | null;
  startingPrice: number | null;
  totalReviews: number | null;
  averageRating: number | null;
};

export type TreatmentFilterType = {
  search?: string;
  rating?: [number, number];
  priceRange?: [number, number];
  type?: TreatmentVisitType | 'ALL';
};

export type LayoutProps = {
  pagination: PaginationState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  setPagination: React.Dispatch<React.SetStateAction<PaginationState>>;
  sorting: SortingState;
  filters: TreatmentFilterType;
  status: 'ACTIVE' | 'INACTIVE';
};
