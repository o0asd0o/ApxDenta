import {
  EMPLOYMENT_TYPE_BADGES,
  STAFF_STATUS_BADGES,
} from '@/constants/badges';
import { useTRPC } from '@/lib/trpc';
import { cn } from '@/lib/utils';
import type { EmploymentType, StaffStatus } from '@repo/domain/db';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import {
  Banknote,
  Briefcase,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
} from 'lucide-react';
import React from 'react';

interface EmployeeDataProps {
  staffId: string;
}

interface StaffData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  address?: string | null;
  emergencyContactName?: string | null;
  emergencyContactRelation?: string | null;
  emergencyContactPhone?: string | null;
  employmentType: EmploymentType;
  status: StaffStatus;
  createdAt: Date;
  specialist?: { title: string; code: string } | null;
}

interface WorkSchedule {
  day: string;
  from: Date;
  to: Date;
}

interface DayOff {
  id: string;
  name: string;
  from: Date;
  to: Date | null;
  repeat: boolean | null;
  isDefault: boolean | null;
}

interface Service {
  id: string;
  name: string;
}

const DAY_ORDER = [
  'MONDAY',
  'TUESDAY',
  'WEDNESDAY',
  'THURSDAY',
  'FRIDAY',
  'SATURDAY',
  'SUNDAY',
];
const DAY_NAMES: Record<string, string> = {
  MONDAY: 'Monday',
  TUESDAY: 'Tuesday',
  WEDNESDAY: 'Wednesday',
  THURSDAY: 'Thursday',
  FRIDAY: 'Friday',
  SATURDAY: 'Saturday',
  SUNDAY: 'Sunday',
};

const formatTime = (time: Date | string) => {
  // Handle both Date objects and string formats
  if (
    time instanceof Date ||
    (typeof time === 'string' && time.includes('T'))
  ) {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  }
  // Handle HH:MM string format
  const [hours, minutes] = String(time).split(':');
  const h = Number.parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${minutes} ${ampm}`;
};

const formatDateRange = (start: Date, end: Date | null) => {
  const startDate = new Date(start).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  if (!end) return startDate;
  const endDate = new Date(end).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  if (startDate === endDate) return startDate;
  return `${startDate} - ${endDate}`;
};

const EmployeeData: React.FC<EmployeeDataProps> = ({ staffId }) => {
  const trpc = useTRPC();

  const { data: staffResult, isLoading: isLoadingStaff } = useQuery(
    trpc.staffs.getStaff.queryOptions({ id: staffId }),
  );

  const { data: workingHoursResult, isLoading: isLoadingHours } = useQuery(
    trpc.staffs.getStaffWorkingHours.queryOptions({ id: staffId }),
  );

  const { data: servicesResult, isLoading: isLoadingServices } = useQuery(
    trpc.staffs.getStaffServices.queryOptions({ id: staffId }),
  );

  const { data: daysOffResult, isLoading: isLoadingDaysOff } = useQuery(
    trpc.staffs.getStaffDaysOff.queryOptions({ id: staffId }),
  );

  const { data: overviewResult, isLoading: isLoadingOverview } = useQuery(
    trpc.staffs.getStaffOverview.queryOptions({ staffId }),
  );

  const staff = staffResult?.data as StaffData | undefined;
  const workingHours = (workingHoursResult?.data.workSchedules ||
    []) as WorkSchedule[];
  const services = (servicesResult?.data.assignedServices || []) as Service[];
  const daysOff = (daysOffResult?.data.daysOff || []) as DayOff[];
  const stats = overviewResult?.data.stats;

  const isLoading =
    isLoadingStaff ||
    isLoadingHours ||
    isLoadingServices ||
    isLoadingDaysOff ||
    isLoadingOverview;

  // Create a working schedule map
  const workingScheduleMap = new Map(workingHours.map((w) => [w.day, w]));
  const fullSchedule = DAY_ORDER.map((day) => ({
    day: DAY_NAMES[day],
    schedule: workingScheduleMap.get(day),
    active: workingScheduleMap.has(day),
  }));

  // Filter upcoming days off
  const upcomingDaysOff = daysOff.filter((d) => new Date(d.from) >= new Date());

  if (isLoading) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="py-0">
              <CardContent className="p-5">
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <CardContent className="p-5">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-5">
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!staff) {
    return <div className="md:px-5">Staff not found</div>;
  }

  return (
    <div className="space-y-5">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Appointments
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {stats?.totalAppointments || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <Calendar className="size-10 md:size-12 text-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Average Rating
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {stats?.averageRating?.toFixed(1) || '0.0'}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <Shield className="size-10 md:size-12 text-gray-200" />
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
                <p className="text-2xl font-semibold mt-1">
                  {stats?.activePatients || 0}
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <User className="size-10 md:size-12 text-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Completion Rate
                </p>
                <p className="text-2xl font-semibold mt-1">
                  {stats?.completionRate || 0}%
                </p>
              </div>
              <div className="p-3 rounded-lg">
                <Briefcase className="size-10 md:size-12 text-gray-200" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="size-5" />
              Personal Information
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 grid grid-cols-1 lg:grid-cols-2">
              <div>
                <div className="flex items-start gap-3">
                  <User className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </p>
                    <p className="text-sm font-medium">
                      {staff.firstName} {staff.lastName}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Email
                    </p>
                    <p className="text-sm font-medium">{staff.email}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start gap-3">
                  <Phone className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Phone
                    </p>
                    <p className="text-sm font-medium">{staff.contactNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Address
                    </p>
                    <p className="text-sm font-medium">
                      {staff.address || '-'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {(staff.emergencyContactName || staff.emergencyContactPhone) && (
              <div className="pt-4 border-t">
                <p className="text-sm font-semibold mb-3">Emergency Contact</p>
                <div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-sm text-muted-foreground">Name</span>
                    <span className="text-sm font-medium">
                      {staff.emergencyContactName || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-sm text-muted-foreground">
                      Relationship
                    </span>
                    <span className="text-sm font-medium">
                      {staff.emergencyContactRelation || '-'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-sm text-muted-foreground">Phone</span>
                    <span className="text-sm font-medium">
                      {staff.emergencyContactPhone || '-'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="size-5" />
              Employment Details
            </h3>
          </CardHeader>
          <CardContent className="">
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-sm text-muted-foreground">Employee ID</span>
              <span className="text-sm font-medium font-mono">
                {staff.id.slice(0, 8).toUpperCase()}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-sm text-muted-foreground">Position</span>
              <span className="text-sm font-medium">
                {staff.specialist?.title || 'General Staff'}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-sm text-muted-foreground">Department</span>
              <span className="text-sm font-medium">
                {staff.specialist?.code || '-'}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-sm text-muted-foreground">Hire Date</span>
              <span className="text-sm font-medium">
                {new Date(staff.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>
              {EMPLOYMENT_TYPE_BADGES[staff.employmentType]}
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-muted-foreground">Status</span>
              {STAFF_STATUS_BADGES[staff.status]}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Working Schedule */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Clock className="size-5" />
            Working Schedule
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {fullSchedule.map((schedule) => (
              <div
                key={schedule.day}
                className={cn('p-4 rounded-lg border', {
                  'bg-primary/10 border-primary/30': schedule.active,
                  'bg-gray-50 border-gray-300': !schedule.active,
                })}
              >
                <p className="font-semibold text-sm mb-1">{schedule.day}</p>
                <p
                  className={`text-xs ${
                    schedule.active ? 'text-muted-foreground' : 'text-gray-500'
                  }`}
                >
                  {schedule.active && schedule.schedule
                    ? `${formatTime(schedule.schedule.from)} - ${formatTime(schedule.schedule.to)}`
                    : 'Off'}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Upcoming Days Off */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="size-5" />
              Upcoming Days Off
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDaysOff.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No upcoming days off
                </p>
              ) : (
                upcomingDaysOff.map((dayOff) => (
                  <div
                    key={dayOff.id}
                    className="flex justify-between items-start p-3 rounded-lg border"
                  >
                    <div>
                      <p className="text-sm font-medium">{dayOff.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDateRange(dayOff.from, dayOff.to)}
                      </p>
                    </div>
                    {dayOff.repeat && (
                      <Badge variant="secondary" className="text-xs">
                        Recurring
                      </Badge>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Assigned Services */}
        <Card className="h-fit">
          <CardHeader>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Banknote className="size-5" />
              Assigned Services
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {services.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No services assigned
                </p>
              ) : (
                services.map((service) => (
                  <Badge key={service.id} variant="outline">
                    {service.name}
                  </Badge>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeData;
