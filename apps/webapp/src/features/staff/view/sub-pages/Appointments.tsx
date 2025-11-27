import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components';
import { Calendar, Grid3X3, List, Search } from 'lucide-react';
import React, { useState } from 'react';

type ViewMode = 'table' | 'card';

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

const Appointments: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.treatment.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="px-5 space-y-4">
      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'table' ? 'primary' : 'outline'}
            className="h-9 w-9 p-0"
            onClick={() => setViewMode('table')}
          >
            <List className="size-4" />
          </Button>
          <Button
            variant={viewMode === 'card' ? 'primary' : 'outline'}
            className="h-9 w-9 p-0"
            onClick={() => setViewMode('card')}
          >
            <Grid3X3 className="size-4" />
          </Button>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Treatment</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>
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
                        <span className="font-medium">
                          {appointment.patient.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{appointment.treatment}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="size-4 text-muted-foreground" />
                        {appointment.dateTime}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {appointment.duration}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(appointment.status)}
                      >
                        {appointment.status.replace('-', ' ')}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredAppointments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No appointments found
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredAppointments.map((appointment) => (
            <Card key={appointment.id}>
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
