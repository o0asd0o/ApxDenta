import { cn } from '@/lib/utils';
import { Badge, Card, CardContent, CardHeader } from '@repo/ui/components';
import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Clock,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';

// Mock data for demonstration
const statsData = [
  {
    title: 'Total Appointments',
    value: '234',
    change: '+12%',
    icon: CalendarDays,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Active Patients',
    value: '89',
    change: '+8%',
    icon: Users,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Working Hours',
    value: '42h',
    change: 'This week',
    icon: Clock,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Average Rating',
    value: '4.8',
    change: '98% positive',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
  },
];

const recentActivities = [
  {
    id: 1,
    type: 'appointment',
    description: 'Completed appointment with Sarah Johnson',
    time: '2 hours ago',
    status: 'completed' as const,
  },
  {
    id: 2,
    type: 'appointment',
    description: 'Scheduled appointment with Michael Chen',
    time: '5 hours ago',
    status: 'scheduled' as const,
  },
  {
    id: 3,
    type: 'review',
    description: 'Received 5-star review from Emma Davis',
    time: '1 day ago',
    status: 'review' as const,
  },
  {
    id: 4,
    type: 'appointment',
    description: 'Completed appointment with David Wilson',
    time: '2 days ago',
    status: 'completed' as const,
  },
];

const skills = [
  'Teeth Cleaning',
  'Root Canal',
  'Dental Implants',
  'Orthodontics',
  'Cosmetic Dentistry',
  'Emergency Care',
];

const certifications = [
  { name: 'Doctor of Dental Surgery (DDS)', year: '2015' },
  { name: 'Advanced Endodontics Certification', year: '2018' },
  { name: 'Invisalign Certified Provider', year: '2020' },
  { name: 'Laser Dentistry Certification', year: '2021' },
];

const Overview: React.FC = () => {
  return (
    <div className="md:px-5 space-y-5">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {statsData.map((stat) => (
          <Card key={stat.title} className="py-3">
            <CardContent className="px-6 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <TrendingUp className="size-4" />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 rounded-lg">
                  <stat.icon className="size-10 md:size-12 text-gray-200" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Recent Activity</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div
                      className={cn('p-2 rounded-full', {
                        'bg-green-50': activity.status === 'completed',
                        'bg-blue-50': activity.status === 'scheduled',
                        'bg-yellow-50': activity.status === 'review',
                      })}
                    >
                      {activity.status === 'completed' && (
                        <CheckCircle2 className="size-5 text-green-400" />
                      )}
                      {activity.status === 'scheduled' && (
                        <Clock className="size-5 text-blue-400" />
                      )}
                      {activity.status === 'review' && (
                        <Star className="size-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills & Expertise */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Skills & Expertise</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Briefcase className="size-5" />
            Certifications & Education
          </h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-start gap-3 p-3 rounded-lg border bg-card"
              >
                <div className="p-2 rounded-full bg-primary/10">
                  <Briefcase className="size-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Obtained in {cert.year}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
