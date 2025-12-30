import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTRPC } from '@/lib/trpc';
import { Route } from '@/routes/_protected/(clinic)/staff-list/$staffId';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  V2,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { ArchiveIcon, EditIcon, MoreVertical, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import {
  useArchiveStaffIdAction,
  useUpdateStaffIdAction,
} from '../__common/context/context';
import type { StaffColumnType } from '../__types';
import Appointments from './sub-pages/Appointments';
import EmployeeData from './sub-pages/EmployeeData';
import Overview from './sub-pages/Overview';
import Patients from './sub-pages/Patients';

const ViewStaff = () => {
  const { staffId } = Route.useParams();
  const navigate = useNavigate();

  const trpc = useTRPC();
  const { data: routeData } = useQuery(
    trpc.staffs.getStaff.queryOptions({ id: staffId }),
  );

  const { data: servicesData } = useQuery(
    trpc.staffs.getStaffServices.queryOptions({ id: staffId }),
  );

  const [tab, setTab] = useQueryState('tab', {
    defaultValue: 'overview',
    history: 'replace',
  });

  const isMobile = useIsMobile();

  const onShowUpdateModal = useUpdateStaffIdAction();
  const onShowArchiveModal = useArchiveStaffIdAction();

  const handleArchiveSuccess = () => {
    navigate({ to: '/staff-list' });
  };

  if (!routeData) {
    return <div>No staff data found.</div>;
  }

  const staff = routeData.data;

  // Redirect if staff is archived
  if (staff.isArchived) {
    navigate({ to: '/staff-list' });
    return null;
  }

  const name = `${staff.firstName} ${staff.lastName}`;
  const profile = staff.avatar?.url || '/avatars/placeholder.png';

  return (
    <div className="flex flex-col h-full">
      <div className="flex px-5 py-3 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/staff-list">Staff List</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Staff Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="p-5">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <Avatar className="size-20">
              <AvatarImage
                src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${profile}`}
                alt={name.substring(0, 2)}
              />
              <AvatarFallback className="bg-amber-500 text-white font-bold">
                {[name.split(' ')[0][0], name.split(' ')[1][0]]
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex gap-1 flex-col">
              <span className="text-xl font-bold">{name}</span>
              <span className="text-gray-600 text-base capitalize">
                {staff.specialist?.title || 'General Staff'}{' '}
                {staff.specialist?.title && (
                  <span className="text-xs text-muted-foreground">
                    ({staff.specialist?.code})
                  </span>
                )}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-start">
            {!isMobile && (
              <Button variant="primary" className="gap-2">
                <PlusIcon className="size-5" />
                Create appointment
              </Button>
            )}
            <V2.DropdownMenu modal={false}>
              <V2.DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-[38px] w-10 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreVertical className="size-5" />
                </Button>
              </V2.DropdownMenuTrigger>
              <V2.DropdownMenuContent className="min-w-36">
                <V2.DropdownMenuLabel>Actions</V2.DropdownMenuLabel>
                <V2.DropdownMenuSeparator />
                <V2.DropdownMenuGroup>
                  {isMobile && (
                    <V2.DropdownMenuItem
                      onClick={() => console.log('Create appointment')}
                    >
                      <span className="flex items-center gap-x-2">
                        <PlusIcon className="size-5 text-inherit" />
                        <span>Create appointment</span>
                      </span>
                    </V2.DropdownMenuItem>
                  )}
                  <V2.DropdownMenuItem
                    onClick={() => onShowUpdateModal?.({ staffId, name })}
                  >
                    <span className="flex items-center gap-x-2">
                      <EditIcon className="size-4 text-inherit" />
                      <span>Update staff</span>
                    </span>
                  </V2.DropdownMenuItem>
                  <V2.DropdownMenuItem
                    onClick={() =>
                      onShowArchiveModal?.(
                        {
                          id: staffId,
                          firstName: staff.firstName,
                          lastName: staff.lastName,
                          email: staff.email,
                          contactNumber: staff.contactNumber,
                          avatar: staff.avatar,
                          status: staff.status,
                          specialist: staff.specialist || null,
                          specialistRecord: staff.specialist || null,
                          createdAt: staff.createdAt,
                          updatedAt: staff.updatedAt,
                          workSchedules: [],
                          assignedServices: [],
                          isArchived: staff.isArchived || false,
                        } as unknown as StaffColumnType,
                        handleArchiveSuccess,
                      )
                    }
                  >
                    <span className="flex items-center gap-x-2 text-red-500">
                      <ArchiveIcon className="size-4 text-inherit" />
                      <span>Archive staff</span>
                    </span>
                  </V2.DropdownMenuItem>
                </V2.DropdownMenuGroup>
                <V2.DropdownMenuSeparator />
              </V2.DropdownMenuContent>
            </V2.DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <Root defaultValue={tab} onChangeTab={setTab}>
          <List>
            <ListItem value="overview">Overview</ListItem>
            <ListItem value="appointments">Appointments</ListItem>
            <ListItem value="patients">Patients</ListItem>
            <ListItem value="employee-data">Employee Data</ListItem>
          </List>
          <TabContent
            value="overview"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <Overview
              staffId={staffId}
              services={(servicesData?.data?.assignedServices || []).map(
                (s) => ({ id: s.id, name: s.name }),
              )}
            />
          </TabContent>
          <TabContent
            value="appointments"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <Appointments staffId={staffId} />
          </TabContent>
          <TabContent
            value="patients"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <Patients staffId={staffId} />
          </TabContent>
          <TabContent
            value="employee-data"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <EmployeeData staffId={staffId} />
          </TabContent>
        </Root>
      </div>
    </div>
  );
};

export default ViewStaff;
