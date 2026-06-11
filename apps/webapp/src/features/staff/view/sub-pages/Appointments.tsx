import DateDisplay from '@/components/DateDisplay';
import PillTabs from '@/components/PillTabs';
import { DataTable } from '@/components/data-table/DataTable';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import useLayoutState from '@/hooks/use-layout-state';
import { useTRPC } from '@/lib/trpc';
import type { ReservationStatus } from '@repo/domain/db';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { Calendar, LayoutGrid, ListIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  APPOINTMENT_STATUS_COLORS,
  appointmentColumns,
  getInitials,
} from './__columns';

interface AppointmentsProps {
  staffId: string;
}

const formatDuration = (minutes: number) => {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  }
  return `${minutes} min`;
};

const Appointments: React.FC<AppointmentsProps> = ({ staffId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page] = useState(1);
  const perPage = 20;

  const [viewMode, setViewMode] = useLayoutState();
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  const trpc = useTRPC();
  const { data: appointmentsData, isLoading } = useQuery(
    trpc.staffs.getStaffAppointments.queryOptions({
      staffId,
      page,
      perPage,
      status:
        statusFilter !== 'all'
          ? (statusFilter as ReservationStatus)
          : undefined,
      search: debouncedSearch || undefined,
    }),
  );

  const appointments = appointmentsData?.items || [];

  return (
    <div className="space-y-4">
      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1 w-full">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Input
              value={searchQuery}
              placeholder="Search for an appointment"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
              }}
              type="search"
            />
          </div>
          <div className="flex flex-1 gap-3 items-center">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="flex-1 sm:flex-none sm:w-[180px] text-sm">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="text-sm">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="DONE">Completed</SelectItem>
                <SelectItem value="ENCOUNTER">In Progress</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-auto min-w-[75px]">
              <PillTabs
                selectedTab={viewMode}
                onChangeTab={setViewMode}
                defaultSelectedTab="list"
                tabs={[
                  { label: <ListIcon className="size-4" />, value: 'list' },
                  { label: <LayoutGrid className="size-4" />, value: 'card' },
                ]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="py-0 rounded-lg">
          <CardContent className="p-4 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="size-9 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Table View */}
      {!isLoading && viewMode === 'list' && (
        <Card className="py-0 rounded-lg">
          <CardContent className="p-0">
            {appointments.length > 0 ? (
              <DataTable
                columns={appointmentColumns}
                data={appointments}
                variant="card"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Calendar className="size-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground font-medium">
                  No appointments found
                </p>
                <p className="text-sm text-muted-foreground/70">
                  This staff member has no appointments matching your criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {!isLoading && viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {appointments.map((appointment) => {
            const patientName = `${appointment.patientFirstName} ${appointment.patientLastName}`;
            return (
              <Card key={appointment.id} className="py-0">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={
                            appointment.patientAvatar?.url
                              ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${appointment.patientAvatar.url}`
                              : undefined
                          }
                          alt={patientName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(
                            appointment.patientFirstName,
                            appointment.patientLastName,
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{patientName}</p>
                        <p className="text-sm text-muted-foreground">
                          {appointment.treatmentName}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={APPOINTMENT_STATUS_COLORS[appointment.status]}
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="size-4" />
                      <DateDisplay
                        date={new Date(appointment.startTime)}
                        type="medium"
                        includeTime
                      />
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <span className="font-medium text-foreground">
                        Duration:
                      </span>
                      <span>{formatDuration(appointment.duration)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {appointments.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No appointments found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Appointments;
