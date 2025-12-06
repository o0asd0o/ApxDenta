import DateDisplay from '@/components/DateDisplay';
import PillTabs from '@/components/PillTabs';
import { DataTable } from '@/components/data-table/DataTable';
import { PATIENT_STATUS_BADGES } from '@/constants/badges';
import useLayoutState from '@/hooks/use-layout-state';
import type { PatientStatus } from '@repo/domain/db';
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
import {
  LayoutGrid,
  ListIcon,
  Mail,
  Phone,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import React, { useState } from 'react';

type ViewMode = 'list' | 'card'; // TODO: DRY

interface Patient {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  lastVisit: string;
  nextAppointment: string | null;
  totalTreatments: number;
  status: PatientStatus;
  completedTreatments: number;
}

// Mock data
const patients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: '',
    email: 'sarah.j@email.com',
    phone: '+1 234 567 8900',
    lastVisit: '2024-02-15',
    nextAppointment: '2024-03-10',
    totalTreatments: 12,
    status: 'ACTIVE',
    completedTreatments: 10,
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: '',
    email: 'michael.c@email.com',
    phone: '+1 234 567 8901',
    lastVisit: '2024-02-10',
    nextAppointment: '2024-02-16',
    totalTreatments: 8,
    status: 'ACTIVE',
    completedTreatments: 7,
  },
  {
    id: '3',
    name: 'Emma Davis',
    avatar: '',
    email: 'emma.d@email.com',
    phone: '+1 234 567 8902',
    lastVisit: '2024-01-20',
    nextAppointment: '2024-02-17',
    totalTreatments: 15,
    status: 'ACTIVE',
    completedTreatments: 13,
  },
  {
    id: '4',
    name: 'David Wilson',
    avatar: '',
    email: 'david.w@email.com',
    phone: '+1 234 567 8903',
    lastVisit: '2024-02-14',
    nextAppointment: null,
    totalTreatments: 5,
    status: 'INACTIVE',
    completedTreatments: 5,
  },
  {
    id: '5',
    name: 'Lisa Anderson',
    avatar: '',
    email: 'lisa.a@email.com',
    phone: '+1 234 567 8904',
    lastVisit: '2024-02-18',
    nextAppointment: '2024-03-05',
    totalTreatments: 2,
    status: 'NEW',
    completedTreatments: 1,
  },
  {
    id: '6',
    name: 'James Brown',
    avatar: '',
    email: 'james.b@email.com',
    phone: '+1 234 567 8905',
    lastVisit: '2023-12-15',
    nextAppointment: null,
    totalTreatments: 20,
    status: 'INACTIVE',
    completedTreatments: 20,
  },
];

const getStatusColor = (status: Patient['status']) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'NEW':
      return 'bg-blue-100 text-blue-700 border-blue-200';
  }
};

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const patientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: 'name',
    header: 'Patient',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage src={patient.avatar} alt={patient.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(patient.name)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{patient.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'contact',
    header: 'Contact',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Mail className="size-3.5" />
            <span>{patient.email}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="size-3.5" />
            <span>{patient.phone}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => (
      <span className="text-sm">{formatDate(row.original.lastVisit)}</span>
    ),
  },
  {
    accessorKey: 'nextAppointment',
    header: 'Next Appointment',
    cell: ({ row }) => {
      const patient = row.original;
      return patient.nextAppointment ? (
        <DateDisplay date={new Date(patient.nextAppointment)} type="medium" />
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
  },
  {
    accessorKey: 'treatments',
    header: 'Treatments',
    cell: ({ row }) => {
      const patient = row.original;
      return (
        <div className="text-sm">
          <span className="font-medium">{patient.completedTreatments}</span>
          <span className="text-muted-foreground">
            {' '}
            / {patient.totalTreatments}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => PATIENT_STATUS_BADGES[row.original.status],
  },
];

const Patients: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [viewMode, setViewMode] = useLayoutState();

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="md:px-5 space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Patients
                </p>
                <p className="text-2xl font-bold mt-1">{patients.length}</p>
              </div>
              <div className="p-3 rounded-lg">
                <TrendingUp className="size-10 md:size-12 text-green-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Active Patients
                </p>
                <p className="text-2xl font-bold mt-1">
                  {patients.filter((p) => p.status === 'ACTIVE').length}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <TrendingUp className="size-10 md:size-12 text-green-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  New Patients
                </p>
                <p className="text-2xl font-bold mt-1">
                  {patients.filter((p) => p.status === 'NEW').length}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <TrendingDown className="size-10 md:size-12 text-red-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 flex-1 w-full">
          <div className="relative flex-1 w-full sm:max-w-sm">
            <Input
              value={searchQuery}
              placeholder="Search partient"
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
          <CardContent className="p-0 overflow-hidden">
            <DataTable
              columns={patientColumns}
              data={filteredPatients}
              variant="card"
            />
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredPatients.map((patient) => (
            <Card key={patient.id} className="py-0">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src={patient.avatar} alt={patient.name} />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {getInitials(patient.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">{patient.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {patient.totalTreatments} treatments
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={getStatusColor(patient.status)}
                  >
                    {patient.status}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-4" />
                      <span>{patient.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4" />
                      <span>{patient.phone}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Visit:</span>
                      <span className="font-medium">
                        {formatDate(patient.lastVisit)}
                      </span>
                    </div>
                    {patient.nextAppointment && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Next Appointment:
                        </span>
                        <span className="font-medium text-blue-600">
                          {formatDate(patient.nextAppointment)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="font-medium">
                        {patient.completedTreatments} /{' '}
                        {patient.totalTreatments}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredPatients.length === 0 && (
            <div className="col-span-full text-center py-12 text-muted-foreground">
              No patients found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Patients;
