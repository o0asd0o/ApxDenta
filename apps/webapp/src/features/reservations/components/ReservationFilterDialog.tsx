import MultiSelect from '@/components/MultiSelect';
import { cn } from '@/lib/utils';
import type { ReservationStatus } from '@repo/domain/db';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import {
  CalendarClock,
  ClipboardList,
  Stethoscope,
  StickyNote,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import type {
  ReservationFilterType,
  ReservationTimeOfDay,
} from './reservationFilters';
import type { Reservation } from './types';

type Option<T extends string> = {
  label: string;
  value: T;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  defaultFilters: ReservationFilterType;
  reservations: Reservation[];
  applyFilters: (filters: ReservationFilterType) => void;
};

const STATUS_OPTIONS: Option<ReservationStatus>[] = [
  { label: 'Finished', value: 'DONE' },
  { label: 'Doing Treatment', value: 'ENCOUNTER' },
  { label: 'Registered', value: 'PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'No Show', value: 'NO_SHOW' },
];

const TIME_OPTIONS: Option<ReservationTimeOfDay>[] = [
  { label: 'Morning', value: 'morning' },
  { label: 'Afternoon', value: 'afternoon' },
];

const toggleValue = <T extends string>(values: T[] | undefined, value: T) => {
  if (values?.includes(value)) {
    return values.filter((item) => item !== value);
  }

  return [...(values ?? []), value];
};

const compactFilters = (
  filters: ReservationFilterType,
): ReservationFilterType => ({
  ...(filters.statuses?.length ? { statuses: filters.statuses } : {}),
  ...(filters.treatmentIds?.length
    ? { treatmentIds: filters.treatmentIds }
    : {}),
  ...(filters.timeOfDay?.length ? { timeOfDay: filters.timeOfDay } : {}),
  ...(filters.hasNotes ? { hasNotes: true } : {}),
});

const FilterSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <div className="mb-3 flex items-center gap-1.5 text-[13px] font-semibold uppercase text-gray-600">
      {icon}
      <span>{title}</span>
    </div>
    {children}
  </div>
);

const ToggleGroup = <T extends string>({
  options,
  selectedValues,
  onToggle,
}: {
  options: Option<T>[];
  selectedValues?: T[];
  onToggle: (value: T) => void;
}) => (
  <div className="flex flex-wrap gap-2">
    {options.map((option) => {
      const selected = selectedValues?.includes(option.value);

      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={Boolean(selected)}
          onClick={() => onToggle(option.value)}
          className={cn(
            'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
            selected
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-white text-gray-600 hover:bg-gray-50',
          )}
        >
          {option.label}
        </button>
      );
    })}
  </div>
);

const ReservationFilterDialog: React.FC<Props> = ({
  open,
  setOpen,
  defaultFilters,
  reservations,
  applyFilters,
}) => {
  const [filters, setFilters] = useState<ReservationFilterType>(defaultFilters);

  useEffect(() => {
    if (open) setFilters(defaultFilters);
  }, [open, defaultFilters]);

  const treatmentOptions = useMemo(() => {
    const treatments = new Map<string, string>();

    for (const reservation of reservations) {
      treatments.set(reservation.treatment.id, reservation.treatment.name);
    }

    return Array.from(treatments, ([value, label]) => ({ value, label }));
  }, [reservations]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Filter Reservations By:</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <FilterSection
            icon={<ClipboardList className="size-4" />}
            title="Reservation Status"
          >
            <MultiSelect
              items={STATUS_OPTIONS}
              selectedKeys={filters.statuses}
              onSelect={(status) => {
                setFilters((current) => ({
                  ...current,
                  statuses: toggleValue(current.statuses, status),
                }));
              }}
              onUnselect={(status) => {
                setFilters((current) => ({
                  ...current,
                  statuses: toggleValue(current.statuses, status),
                }));
              }}
              placeholder="Select statuses"
            />
          </FilterSection>

          <FilterSection
            icon={<Stethoscope className="size-4" />}
            title="Treatment"
          >
            <MultiSelect
              items={treatmentOptions}
              selectedKeys={filters.treatmentIds}
              onSelect={(treatmentId) => {
                setFilters((current) => ({
                  ...current,
                  treatmentIds: toggleValue(current.treatmentIds, treatmentId),
                }));
              }}
              onUnselect={(treatmentId) => {
                setFilters((current) => ({
                  ...current,
                  treatmentIds: toggleValue(current.treatmentIds, treatmentId),
                }));
              }}
              placeholder="Select treatments"
            />
          </FilterSection>

          <FilterSection
            icon={<CalendarClock className="size-4" />}
            title="Time of Day"
          >
            <ToggleGroup
              options={TIME_OPTIONS}
              selectedValues={filters.timeOfDay}
              onToggle={(timeOfDay) => {
                setFilters((current) => ({
                  ...current,
                  timeOfDay: toggleValue(current.timeOfDay, timeOfDay),
                }));
              }}
            />
          </FilterSection>

          <FilterSection icon={<StickyNote className="size-4" />} title="Notes">
            <button
              type="button"
              aria-pressed={Boolean(filters.hasNotes)}
              onClick={() => {
                setFilters((current) => ({
                  ...current,
                  hasNotes: !current.hasNotes,
                }));
              }}
              className={cn(
                'rounded-md border px-3 py-1.5 text-sm font-medium transition-colors',
                filters.hasNotes
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-border bg-white text-gray-600 hover:bg-gray-50',
              )}
            >
              Has notes
            </button>
          </FilterSection>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setFilters({});
              applyFilters({});
              setOpen(false);
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              applyFilters(compactFilters(filters));
              setOpen(false);
            }}
          >
            Apply Filters
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReservationFilterDialog;
