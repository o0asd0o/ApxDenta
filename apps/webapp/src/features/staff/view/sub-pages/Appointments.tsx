import PillTabs from '@/components/PillTabs';
import { DataTable } from '@/components/data-table/DataTable';
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
} from '@repo/ui/components';
import type { ColumnDef } from '@tanstack/react-table';
import { Calendar, LayoutGrid, ListIcon } from 'lucide-react';
import React, { useState } from 'react';

type ViewMode = 'list' | 'card';

interface Appointment {
  id: string;
  patient: {
    name: string;
    avatar: string;
  };
  treatment: string;
  dateTime: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'in-progress';
  duration: string;
}

// Mock data
const appointments: Appointment[] = [
  {
    id: '1',
    patient: { name: 'Sarah Johnson', avatar: '' },
    treatment: 'Teeth Cleaning',
    dateTime: '2024-02-15 10:00 AM',
    status: 'completed',
    duration: '45 min',
  },
  {
    id: '2',
    patient: { name: 'Michael Chen', avatar: '' },
    treatment: 'Root Canal',
    dateTime: '2024-02-16 02:00 PM',
    status: 'scheduled',
    duration: '90 min',
  },
  {
    id: '3',
    patient: { name: 'Emma Davis', avatar: '' },
    treatment: 'Dental Implant',
    dateTime: '2024-02-17 09:30 AM',
    status: 'scheduled',
    duration: '120 min',
  },
  {
    id: '4',
    patient: { name: 'David Wilson', avatar: '' },
    treatment: 'Teeth Whitening',
    dateTime: '2024-02-14 11:00 AM',
    status: 'completed',
    duration: '60 min',
  },
  {
    id: '5',
    patient: { name: 'Lisa Anderson', avatar: '' },
    treatment: 'Orthodontic Consultation',
    dateTime: '2024-02-13 03:00 PM',
    status: 'cancelled',
    duration: '30 min',
  },
  {
    id: '6',
    patient: { name: 'James Brown', avatar: '' },
    treatment: 'Emergency Care',
    dateTime: '2024-02-18 04:00 PM',
    status: 'in-progress',
    duration: '45 min',
  },
];

const getStatusColor = (status: Appointment['status']) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'scheduled':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'cancelled':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: 'patient',
    header: 'Patient',
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={appointment.patient.avatar}
              alt={appointment.patient.name}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(appointment.patient.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{appointment.patient.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'treatment',
    header: 'Treatment',
    cell: ({ row }) => row.original.treatment,
  },
  {
    accessorKey: 'dateTime',
    header: 'Date & Time',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm">
        <Calendar className="size-4 text-muted-foreground" />
        {row.original.dateTime}
      </div>
    ),
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.duration}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant="outline" className={getStatusColor(row.original.status)}>
        {row.original.status.replace('-', ' ')}
      </Badge>
    ),
  },
];

const Appointments: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="md:px-5 space-y-4">
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
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
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

      {/* Table View */}
      {viewMode === 'list' && (
        <Card className="py-0 rounded-lg">
          <CardContent className="p-0">
            <DataTable
              columns={appointmentColumns}
              data={filteredAppointments}
              variant="card"
            />
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id} className="py-0">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={appointment.patient.avatar}
                        alt={appointment.patient.name}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(appointment.patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{appointment.patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.treatment}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(appointment.status)}
                  >
                    {appointment.status.replace('-', ' ')}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>{appointment.dateTime}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Duration:
                    </span>
                    <span>{appointment.duration}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredAppointments.length === 0 && (
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
