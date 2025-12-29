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
import { Calendar, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4">
      {/* Left section - Total appointments and navigation */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="size-5" />
          <span className="text-xl font-bold text-gray-900">
            {totalAppointments}
          </span>
          <span className="text-sm text-gray-500">total appointments</span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            onClick={goToToday}
            className="text-xs font-medium h-8 px-3"
          >
            Today
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="h-8 w-8 p-0"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-gray-900 ml-2">
            {formatDate()}
          </span>
        </div>
      </div>

      {/* Right section - View mode and filters */}
      <div className="flex items-center gap-3">
        <Tabs
          value={viewMode}
          onValueChange={(v) => onViewModeChange(v as ViewMode)}
        >
          <TabsList className="grid grid-cols-2 h-8">
            <TabsTrigger value="Day" className="text-xs px-4">
              Day
            </TabsTrigger>
            <TabsTrigger value="Week" className="text-xs px-4">
              Week
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={selectedDoctorId} onValueChange={onDoctorChange}>
          <SelectTrigger className="w-[150px] h-8 text-xs">
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

        <Button variant="outline" className="h-8 gap-2 text-xs px-3">
          <Filter className="h-3.5 w-3.5" />
          Filters
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
