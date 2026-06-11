import FilterButton from '@/components/FilterButton';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components';
import { Calendar, ChevronLeft, ChevronRight, Stethoscope } from 'lucide-react';
import React from 'react';
import type { Doctor, ViewMode } from './types';

interface Props {
  date: Date;
  viewMode: ViewMode;
  totalAppointments: number;
  doctors: Doctor[];
  selectedDoctorId: string;
  onDateChange: (date: Date) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onDoctorChange: (doctorId: string) => void;
  onFilterClick: () => void;
  hasFilters?: boolean;
}

const CalendarHeader: React.FC<Props> = ({
  date,
  viewMode,
  totalAppointments,
  doctors,
  selectedDoctorId,
  onDateChange,
  onViewModeChange,
  onDoctorChange,
  onFilterClick,
  hasFilters,
}) => {
  const formatDate = () => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(date);
    if (viewMode === 'Day') {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
    } else {
      newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
    }
    onDateChange(newDate);
  };

  return (
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {/* Left section - Total appointments and navigation */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex h-9 items-center gap-2 text-gray-600">
          <Calendar className="size-5 shrink-0" />
          <span className="text-xl font-bold text-gray-900">
            {totalAppointments}
          </span>
          <span className="text-sm text-gray-500">total appointments</span>
        </div>

        <div className="flex h-9 items-center gap-1">
          <Button
            variant="outline"
            onClick={goToToday}
            className="h-9 px-4 text-sm font-medium"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            className="h-9 w-9 p-0"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-9 w-9 p-0"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="ml-2 whitespace-nowrap text-sm font-semibold text-gray-900">
            {formatDate()}
          </span>
        </div>
      </div>

      {/* Right section - View mode and filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Tabs
          value={viewMode}
          onValueChange={(v) => onViewModeChange(v as ViewMode)}
        >
          <TabsList className="grid h-9 grid-cols-2">
            <TabsTrigger value="Day" className="px-5 text-sm">
              Day
            </TabsTrigger>
            <TabsTrigger value="Week" className="px-5 text-sm">
              Week
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedDoctorId} onValueChange={onDoctorChange}>
          <SelectTrigger
            className="h-9 w-[180px] text-sm"
            icon={<Stethoscope className="size-4 shrink-0 text-gray-500" />}
          >
            <SelectValue placeholder="All Dentists" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dentists</SelectItem>
            {doctors.map((doctor) => (
              <SelectItem key={doctor.id} value={doctor.id}>
                Drg {doctor.firstName} {doctor.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <FilterButton onClick={onFilterClick} hasFilters={hasFilters} />
      </div>
    </div>
  );
};

export default CalendarHeader;
