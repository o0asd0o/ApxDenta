import { Badge, Card, CardContent, CardHeader } from '@repo/ui/components';
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

// Mock data for demonstration
const employeeData = {
  personalInfo: {
    fullName: 'Dr. John Smith',
    email: 'john.smith@zendenta.com',
    phone: '+1 234 567 8910',
    address: '123 Main Street, New York, NY 10001',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 234 567 8911',
    },
  },
  employmentDetails: {
    employeeId: 'EMP-2024-001',
    position: 'Senior Dentist',
    department: 'General Dentistry',
    hireDate: '2018-03-15',
    employmentType: 'Full-time',
    status: 'Active',
  },
  workingHours: [
    { day: 'Monday', hours: '09:00 AM - 05:00 PM', active: true },
    { day: 'Tuesday', hours: '09:00 AM - 05:00 PM', active: true },
    { day: 'Wednesday', hours: '09:00 AM - 05:00 PM', active: true },
    { day: 'Thursday', hours: '09:00 AM - 05:00 PM', active: true },
    { day: 'Friday', hours: '09:00 AM - 03:00 PM', active: true },
    { day: 'Saturday', hours: 'Off', active: false },
    { day: 'Sunday', hours: 'Off', active: false },
  ],
  services: [
    'General Checkup',
    'Teeth Cleaning',
    'Root Canal',
    'Dental Implants',
    'Orthodontics',
    'Cosmetic Dentistry',
    'Emergency Care',
    'Teeth Whitening',
  ],
  upcomingDaysOff: [
    { date: '2024-03-10 - 2024-03-12', reason: 'Medical Conference' },
    { date: '2024-04-05', reason: 'Personal Day' },
    { date: '2024-05-20 - 2024-05-25', reason: 'Vacation' },
  ],
  performance: {
    totalAppointments: 1247,
    averageRating: 4.8,
    patientRetention: 92,
    completionRate: 98,
  },
};

const EmployeeData: React.FC = () => {
  return (
    <div className="px-5 space-y-5">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Total Appointments
                </p>
                <p className="text-2xl font-bold mt-1">
                  {employeeData.performance.totalAppointments}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <Calendar className="size-5 text-blue-500" />
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
                <p className="text-2xl font-bold mt-1">
                  {employeeData.performance.averageRating}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50">
                <Shield className="size-5 text-yellow-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="py-0">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium">
                  Patient Retention
                </p>
                <p className="text-2xl font-bold mt-1">
                  {employeeData.performance.patientRetention}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <User className="size-5 text-green-500" />
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
                <p className="text-2xl font-bold mt-1">
                  {employeeData.performance.completionRate}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <Briefcase className="size-5 text-purple-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <User className="size-5" />
              Personal Information
            </h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <User className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Full Name
                  </p>
                  <p className="text-sm">
                    {employeeData.personalInfo.fullName}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="text-sm">{employeeData.personalInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Phone
                  </p>
                  <p className="text-sm">{employeeData.personalInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="size-5 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Address
                  </p>
                  <p className="text-sm">{employeeData.personalInfo.address}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm font-bold mb-3">Emergency Contact</p>
              <div className="space-y-2 pl-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-medium">
                    {employeeData.personalInfo.emergencyContact.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Relationship:</span>
                  <span className="font-medium">
                    {employeeData.personalInfo.emergencyContact.relationship}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">
                    {employeeData.personalInfo.emergencyContact.phone}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employment Details */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Briefcase className="size-5" />
              Employment Details
            </h3>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Employee ID</span>
              <span className="text-sm font-medium">
                {employeeData.employmentDetails.employeeId}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Position</span>
              <span className="text-sm font-medium">
                {employeeData.employmentDetails.position}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Department</span>
              <span className="text-sm font-medium">
                {employeeData.employmentDetails.department}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Hire Date</span>
              <span className="text-sm font-medium">
                {new Date(
                  employeeData.employmentDetails.hireDate,
                ).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">
                Employment Type
              </span>
              <Badge variant="secondary">
                {employeeData.employmentDetails.employmentType}
              </Badge>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge className="bg-green-100 text-green-700 border-green-200">
                {employeeData.employmentDetails.status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Working Schedule */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Clock className="size-5" />
            Working Schedule
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
            {employeeData.workingHours.map((schedule) => (
              <div
                key={schedule.day}
                className={`p-4 rounded-lg border ${
                  schedule.active
                    ? 'bg-primary/5 border-primary/20'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <p className="font-bold text-sm mb-1">{schedule.day}</p>
                <p
                  className={`text-xs ${
                    schedule.active ? 'text-muted-foreground' : 'text-gray-500'
                  }`}
                >
                  {schedule.hours}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Assigned Services */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Banknote className="size-5" />
              Assigned Services
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {employeeData.services.map((service) => (
                <Badge key={service} variant="outline">
                  {service}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Days Off */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Calendar className="size-5" />
              Upcoming Days Off
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {employeeData.upcomingDaysOff.map((dayOff) => (
                <div
                  key={dayOff.date}
                  className="flex justify-between items-start p-3 rounded-lg border"
                >
                  <div>
                    <p className="text-sm font-medium">{dayOff.reason}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {dayOff.date}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    Approved
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeData;
