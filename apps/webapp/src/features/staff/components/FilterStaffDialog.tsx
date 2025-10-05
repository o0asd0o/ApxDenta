import CheckboxCard from '@/components/CheckCard';
import MultiSelect from '@/components/MultiSelect';
import { useTRPC } from '@/lib/trpc';
import type { StaffType } from '@repo/domain/db';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import { useQueries } from '@tanstack/react-query';
import { produce } from 'immer';
import {
  CalendarSearch,
  ShieldPlus,
  Stethoscope,
  UserSearch,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { EMPLOYEE_STATUS, EMPLOYEE_WORKDAYS } from '../__helpers';
import type { StaffFilterType } from '../__types';

type Props = {
  type: StaffType;
  open: boolean;
  setOpen: (open: boolean) => void;
  applyFilters: (filters: StaffFilterType) => void;
  defaultFilters: StaffFilterType;
};
const FilterStaffDialog: React.FC<Props> = ({
  open,
  setOpen,
  applyFilters,
  defaultFilters,
  type,
}) => {
  const trpc = useTRPC();
  const [
    { data: assignedServices, isLoading: isLoadingAssignedServices },
    { data: specialistRecords, isLoading: isLoadingSpecialistRecords },
  ] = useQueries({
    queries: [
      trpc.treatments.getAllTreatments.queryOptions(
        { status: 'ACTIVE', excludeTotalCount: true },
        {
          enabled: open,
        },
      ),
      trpc.specialistRecord.getAllSpecialistRecords.queryOptions(undefined, {
        enabled: open,
      }),
    ],
  });

  const { assignedServicesList, specialistRecordsList } = useMemo(() => {
    return {
      assignedServicesList:
        (assignedServices?.data || [])?.map((service) => ({
          value: service.id,
          label: service.name,
        })) || [],
      specialistRecordsList:
        (specialistRecords?.data || [])?.map((record) => ({
          value: record.id,
          label: record.title,
        })) || [],
    };
  }, [assignedServices, specialistRecords]);

  const [filters, setFilters] = useState<StaffFilterType>(defaultFilters);

  // set local filters on mount
  useEffect(() => {
    if (open) setFilters(defaultFilters);
  }, [open, defaultFilters]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Filter Staff By:</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="workSchedule"
              className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
            >
              <CalendarSearch className="size-4" />
              <span>Work Schedule</span>
            </label>
            <CheckboxCard
              items={EMPLOYEE_WORKDAYS}
              selectedValues={filters.schedules || []}
              onChecked={(value, checked) => {
                setFilters(
                  produce((draft) => {
                    draft.schedules = checked
                      ? [...(draft.schedules || []), value]
                      : (draft.schedules || []).filter((v) => v !== value);
                  }),
                );
              }}
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
            >
              <UserSearch className="size-4" />
              <span>Employment Status</span>
            </label>
            <MultiSelect
              items={EMPLOYEE_STATUS}
              onSelect={(value) => {
                setFilters(
                  produce((draft) => {
                    draft.status = [...(draft.status || []), value];
                  }),
                );
              }}
              onUnselect={(value) => {
                setFilters(
                  produce((draft) => {
                    draft.status = (draft.status || []).filter(
                      (v) => v !== value,
                    );
                  }),
                );
              }}
              selectedKeys={filters.status}
            />
          </div>
          {type === 'DOCTOR' && (
            <>
              <div>
                <label
                  htmlFor="assignedServices"
                  className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
                >
                  <ShieldPlus className="size-4" />
                  <span>Assigned Treatment</span>
                </label>
                <MultiSelect
                  items={assignedServicesList}
                  loading={isLoadingAssignedServices}
                  onSelect={(value) => {
                    setFilters(
                      produce((draft) => {
                        draft.assignedServices = [
                          ...(draft.assignedServices || []),
                          value,
                        ];
                      }),
                    );
                  }}
                  onUnselect={(value) => {
                    setFilters(
                      produce((draft) => {
                        draft.assignedServices = (
                          draft.assignedServices || []
                        ).filter((v) => v !== value);
                      }),
                    );
                  }}
                  selectedKeys={filters.assignedServices}
                />
              </div>
              <div>
                <label
                  htmlFor="specialistRecord"
                  className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
                >
                  <Stethoscope className="size-4" />
                  <span>Specialist Record</span>
                </label>
                <MultiSelect
                  items={specialistRecordsList}
                  loading={isLoadingSpecialistRecords}
                  onSelect={(value) => {
                    setFilters(
                      produce((draft) => {
                        draft.specialists = [
                          ...(draft.specialists || []),
                          value,
                        ];
                      }),
                    );
                  }}
                  onUnselect={(value) => {
                    setFilters(
                      produce((draft) => {
                        draft.specialists = (draft.specialists || []).filter(
                          (v) => v !== value,
                        );
                      }),
                    );
                  }}
                  selectedKeys={filters.specialists}
                />
              </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              // You can add your filter logic here, e.g., refetch with filters
              applyFilters(filters);
              setOpen(false);
            }}
          >
            Apply Filters
          </Button>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterStaffDialog;
