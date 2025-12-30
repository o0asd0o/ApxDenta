import DateDisplay from '@/components/DateDisplay';
import PillTabs from '@/components/PillTabs';
import { DataTable } from '@/components/data-table/DataTable';
import { PATIENT_STATUS_BADGES } from '@/constants/badges';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import useLayoutState from '@/hooks/use-layout-state';
import { useTRPC } from '@/lib/trpc';
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
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import type { ColumnDef } from '@tanstack/react-table';
import {
  LayoutGrid,
  ListIcon,
  Mail,
  Phone,
  TrendingDown,
  TrendingUp,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';

interface PatientsProps {
  staffId: string;
}

interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  avatar: string | null;
  status: PatientStatus;
  lastVisit: Date | null;
  nextAppointment: Date | null;
  totalTreatments: number;
  completedTreatments: number;
}

const getStatusColor = (status: PatientStatus) => {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'INACTIVE':
      return 'bg-gray-100 text-gray-700 border-gray-300';
    case 'NEW':
      return 'bg-blue-100 text-blue-700 border-blue-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
};

const formatDate = (date: Date | null) => {
  if (!date) return null;
  return new Date(date).toLocaleDateString('en-US', {
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
      const patientName = `${patient.firstName} ${patient.lastName}`;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-9">
            <AvatarImage
              src={
                patient.avatar
                  ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${patient.avatar}`
                  : undefined
              }
              alt={patientName}
            />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {getInitials(patient.firstName, patient.lastName)}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium">{patientName}</span>
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
            <span>{patient.phoneNumber}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => {
      const lastVisit = row.original.lastVisit;
      return lastVisit ? (
        <span className="text-sm">{formatDate(lastVisit)}</span>
      ) : (
        <span className="text-muted-foreground">-</span>
      );
    },
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

const Patients: React.FC<PatientsProps> = ({ staffId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page] = useState(1);
  const perPage = 20;

  const [viewMode, setViewMode] = useLayoutState();
  const debouncedSearch = useDebouncedValue(searchQuery, 300);

  const trpc = useTRPC();
  const { data: patientsData, isLoading } = useQuery(
    trpc.staffs.getStaffPatients.queryOptions({
      staffId,
      page,
      perPage,
      status:
        statusFilter !== 'all' ? (statusFilter as PatientStatus) : undefined,
      search: debouncedSearch || undefined,
    }),
  );

  const patients = patientsData?.data || [];
  const totalPatients = patientsData?.count || 0;
  const activePatients = patients.filter(
    (p: Patient) => p.status === 'ACTIVE',
  ).length;
  const newPatients = patients.filter(
    (p: Patient) => p.status === 'NEW',
  ).length;

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
                <p className="text-2xl font-bold mt-1">
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    totalPatients
                  )}
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
                  Active Patients
                </p>
                <p className="text-2xl font-bold mt-1">
                  {isLoading ? (
                    <Skeleton className="h-8 w-12" />
                  ) : (
                    activePatients
                  )}
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
                  {isLoading ? <Skeleton className="h-8 w-12" /> : newPatients}
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
              placeholder="Search patient"
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
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="NEW">New</SelectItem>
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
          <CardContent className="p-0 overflow-hidden">
            {patients.length > 0 ? (
              <DataTable
                columns={patientColumns}
                data={patients}
                variant="card"
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Users className="size-12 text-muted-foreground/30 mb-3" />
                <p className="text-muted-foreground font-medium">
                  No patients found
                </p>
                <p className="text-sm text-muted-foreground/70">
                  This staff member has no patients matching your criteria.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Card View */}
      {!isLoading && viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {patients.map((patient) => {
            const patientName = `${patient.firstName} ${patient.lastName}`;
            return (
              <Card key={patient.id} className="py-0">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-12">
                        <AvatarImage
                          src={
                            patient.avatar
                              ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${patient.avatar}`
                              : undefined
                          }
                          alt={patientName}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {getInitials(patient.firstName, patient.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold">{patientName}</p>
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
                        <span>{patient.phoneNumber}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Last Visit:
                        </span>
                        <span className="font-medium">
                          {formatDate(patient.lastVisit) || '-'}
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
            );
          })}
          {patients.length === 0 && (
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
