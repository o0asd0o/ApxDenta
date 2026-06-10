import { cn } from '@/lib/utils';
import type { ReservationStatus } from '@repo/domain/db';
import { Check, Clock3, DollarSign, Hourglass, X } from 'lucide-react';
import type React from 'react';
import type { Reservation } from './types';

export type ReservationVisualState =
  | 'paid'
  | 'unpaid'
  | 'inTreatment'
  | 'registered'
  | 'cancelled'
  | 'noShow';

interface WorkflowStatusVisual {
  label: string;
  dotClassName: string;
}

interface PaymentVisual {
  cardClassName: string;
  iconWrapClassName: string;
  iconClassName: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const getWorkflowStatusVisual = (
  status: ReservationStatus,
): WorkflowStatusVisual => {
  switch (status) {
    case 'DONE':
      return {
        label: 'Finished',
        dotClassName: 'bg-emerald-500',
      };
    case 'ENCOUNTER':
      return {
        label: 'Doing Treatment',
        dotClassName: 'bg-amber-400',
      };
    case 'PENDING':
      return {
        label: 'Registered',
        dotClassName: 'bg-slate-400',
      };
    case 'CANCELLED':
      return {
        label: 'Cancelled',
        dotClassName: 'bg-rose-500',
      };
    case 'NO_SHOW':
      return {
        label: 'No Show',
        dotClassName: 'bg-gray-400',
      };
  }
};

export const getReservationVisualState = (
  reservation: Reservation,
  visualState?: ReservationVisualState,
): ReservationVisualState => {
  if (visualState) return visualState;

  switch (reservation.status) {
    case 'DONE':
      return 'paid';
    case 'ENCOUNTER':
      return 'inTreatment';
    case 'PENDING':
      return 'registered';
    case 'CANCELLED':
      return 'cancelled';
    case 'NO_SHOW':
      return 'noShow';
  }
};

export type ReservationVisualStateMap = Partial<
  Record<Reservation['id'], ReservationVisualState>
>;

export const getReservationDisplayVisualState = (
  reservation: Reservation,
  visualStates?: ReservationVisualStateMap,
): ReservationVisualState => {
  return getReservationVisualState(reservation, visualStates?.[reservation.id]);
};

export const getReservationVisualMeta = (
  visualState: ReservationVisualState,
): PaymentVisual => {
  switch (visualState) {
    case 'paid':
      return {
        cardClassName: 'bg-emerald-50 border-emerald-200',
        iconWrapClassName: 'bg-emerald-500 text-white',
        iconClassName: 'size-3',
        Icon: Check,
      };
    case 'unpaid':
      return {
        cardClassName: 'bg-rose-50 border-rose-200',
        iconWrapClassName: 'bg-pink-500 text-white',
        iconClassName: 'size-3',
        Icon: DollarSign,
      };
    case 'inTreatment':
      return {
        cardClassName: 'bg-sky-50 border-sky-200',
        iconWrapClassName: 'bg-sky-500 text-white',
        iconClassName: 'size-3',
        Icon: Hourglass,
      };
    case 'registered':
      return {
        cardClassName: 'bg-blue-50 border-blue-200',
        iconWrapClassName: 'bg-blue-500 text-white',
        iconClassName: 'size-3',
        Icon: Hourglass,
      };
    case 'cancelled':
      return {
        cardClassName: 'bg-red-50 border-red-200',
        iconWrapClassName: 'bg-red-500 text-white',
        iconClassName: 'size-3',
        Icon: X,
      };
    case 'noShow':
      return {
        cardClassName: 'bg-gray-50 border-gray-200',
        iconWrapClassName: 'bg-gray-500 text-white',
        iconClassName: 'size-3',
        Icon: Clock3,
      };
  }
};

export const ReservationStatusPill: React.FC<{
  status: ReservationStatus;
  className?: string;
}> = ({ status, className }) => {
  const statusVisual = getWorkflowStatusVisual(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 text-[10px] font-semibold text-gray-700 shadow-sm ring-1 ring-black/5',
        className,
      )}
    >
      <span
        className={cn(
          'size-1.5 shrink-0 rounded-full',
          statusVisual.dotClassName,
        )}
      />
      <span className="truncate">{statusVisual.label}</span>
    </span>
  );
};

export const ReservationVisualIcon: React.FC<{
  reservation: Reservation;
  visualState?: ReservationVisualState;
  className?: string;
}> = ({ reservation, visualState, className }) => {
  const visual = getReservationVisualMeta(
    getReservationVisualState(reservation, visualState),
  );
  const Icon = visual.Icon;

  return (
    <span
      className={cn(
        'flex size-5 shrink-0 items-center justify-center rounded-md shadow-sm',
        visual.iconWrapClassName,
        className,
      )}
    >
      <Icon className={visual.iconClassName} />
    </span>
  );
};
