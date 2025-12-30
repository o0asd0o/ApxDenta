import { useTRPC } from '@/lib/trpc';
import {
  cn,
  formatMonthYear,
  formatRelativeTime,
  formatYear,
} from '@/lib/utils';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from 'lucide-react';
import React from 'react';

interface OverviewProps {
  staffId: string;
  services: { id: string; name: string }[];
}

const Overview: React.FC<OverviewProps> = ({ staffId, services }) => {
  const trpc = useTRPC();

  const { data: overviewData, isLoading } = useQuery(
    trpc.staffs.getStaffOverview.queryOptions({ staffId }),
  );

  const stats = overviewData?.data.stats;
  const recentActivities = overviewData?.data.recentActivities || [];
  const certifications = overviewData?.data.certifications || [];
  const educations = overviewData?.data.educations || [];

  const statsData = [
    {
      title: 'Total Appointments',
      value: stats?.totalAppointments?.toString() || '0',
      change: `${stats?.completionRate || 0}% completed`,
      icon: CalendarDays,
    },
    {
      title: 'Active Patients',
      value: stats?.activePatients?.toString() || '0',
      change: 'Unique patients',
      icon: Users,
    },
    {
      title: 'Weekly Hours',
      value: `${stats?.weeklyWorkingHours || 0}h`,
      change: 'Per week',
      icon: Clock,
    },
    {
      title: 'Average Rating',
      value: stats?.averageRating?.toFixed(1) || '0.0',
      change: 'Based on reviews',
      icon: Star,
    },
  ];
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
                {isLoading ? (
                  <>
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                      >
                        <Skeleton className="size-9 rounded-full" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/4" />
                        </div>
                      </div>
                    ))}
                  </>
                ) : recentActivities.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No recent activity
                  </p>
                ) : (
                  recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0"
                    >
                      <div
                        className={cn('p-2 rounded-full', {
                          'bg-green-50': activity.status === 'completed',
                          'bg-blue-50': activity.status === 'scheduled',
                          'bg-red-50': activity.status === 'cancelled',
                        })}
                      >
                        {activity.status === 'completed' && (
                          <CheckCircle2 className="size-5 text-green-400" />
                        )}
                        {activity.status === 'scheduled' && (
                          <Clock className="size-5 text-blue-400" />
                        )}
                        {activity.status === 'cancelled' && (
                          <XCircle className="size-5 text-red-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatRelativeTime(activity.time)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills & Expertise (Services) */}
        <div>
          <Card>
            <CardHeader>
              <h3 className="text-lg font-bold">Skills & Expertise</h3>
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

      {/* Certifications & Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Certifications */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Award className="size-5" />
              Certifications
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </>
              ) : certifications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No certifications added
                </p>
              ) : (
                certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {cert.issuer}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Issued: {formatMonthYear(cert.issueDate)}
                          {cert.expiryDate && (
                            <>
                              {' • Expires: '}
                              {formatMonthYear(cert.expiryDate)}
                            </>
                          )}
                        </p>
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink className="size-4" />
                        </a>
                      )}
                    </div>
                    {cert.credentialId && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Education */}
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap className="size-5" />
              Education
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <>
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  ))}
                </>
              ) : educations.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No education added
                </p>
              ) : (
                educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="pb-4 border-b last:border-b-0 last:pb-0"
                  >
                    <p className="font-medium">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution}
                      {edu.field && ` • ${edu.field}`}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.startDate && formatYear(edu.startDate)}
                      {edu.startDate && ' - '}
                      {edu.isCurrent
                        ? 'Present'
                        : edu.endDate
                          ? formatYear(edu.endDate)
                          : ''}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
