import type { TreatmentVisitType } from '@repo/domain/db';
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  RadioCardGroup,
  RadioCardIndicator,
  RadioCardItem,
  Slider,
} from '@repo/ui/components';
import { produce } from 'immer';
import { CalendarSearch, StarIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import type { TreatmentFilterType } from '../__types';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  applyFilters: (filters: TreatmentFilterType) => void;
  defaultFilters: TreatmentFilterType;
};

const FilterTreatmentDialog: React.FC<Props> = ({
  open,
  setOpen,
  applyFilters,
  defaultFilters,
}) => {
  const [filters, setFilters] = useState<TreatmentFilterType>(defaultFilters);

  // set local filters on mount
  useEffect(() => {
    if (open) setFilters(defaultFilters);
  }, [open, defaultFilters]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Filter Treatment By:</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div>
            <label
              htmlFor="workSchedule"
              className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
            >
              <CalendarSearch className="size-4" />
              <span>Type of Visit</span>
            </label>
            <RadioCardGroup
              className="grid-cols-3 text-sm"
              onValueChange={(value) => {
                setFilters(
                  produce((draft) => {
                    draft.type = value as TreatmentVisitType;
                  }),
                );
              }}
              defaultValue={filters.type || 'ALL'}
            >
              <RadioCardItem value="ALL">
                <div className="flex items-center gap-3">
                  <RadioCardIndicator />
                  <span>All</span>
                </div>
              </RadioCardItem>
              <RadioCardItem value="SINGLE_VISIT">
                <div className="flex items-center gap-3">
                  <RadioCardIndicator />
                  <span>Single Visit</span>
                </div>
              </RadioCardItem>
              <RadioCardItem value="MULTIPLE_VISIT">
                <div className="flex items-center gap-3">
                  <RadioCardIndicator />
                  <span>Multiple Visit</span>
                </div>
              </RadioCardItem>
            </RadioCardGroup>
          </div>
          <div>
            <label
              htmlFor="priceRange"
              className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
            >
              <span className="font-bold text-xl">₱</span>
              <span>Price Range</span>
            </label>
            <div className="w-[60%] space-y-3">
              <Slider
                name="priceRange"
                value={filters.priceRange || [0, 10000]}
                onValueChange={(value) => {
                  setFilters(
                    produce((draft) => {
                      draft.priceRange = value as [number, number];
                    }),
                  );
                }}
                max={10000}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Min: ₱{filters.priceRange?.[0] || 0}</span>
                <span>Max: ₱{filters.priceRange?.[1] || 10000}</span>
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="rating"
              className="flex text-[13px] items-center font-bold text-gray-600 uppercase mb-3 gap-1.5"
            >
              <StarIcon className="size-4" />
              <span>Rating</span>
            </label>
            <div className="w-[60%] space-y-3">
              <Slider
                name="rating"
                value={filters.rating || [0, 5]}
                onValueChange={(value) => {
                  setFilters(
                    produce((draft) => {
                      draft.rating = value as [number, number];
                    }),
                  );
                }}
                max={5}
                step={1}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Min: {filters.rating?.[0] || 0}</span>
                <span>Max: {filters.rating?.[1] || 5}</span>
              </div>
            </div>
          </div>
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
            variant="ghost"
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

export default FilterTreatmentDialog;
