import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
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
import { Link } from '@tanstack/react-router';
import { ArchiveIcon, EditIcon, MoreVertical } from 'lucide-react';
import { useQueryState } from 'nuqs';

const ViewStaff = () => {
  const { staffId } = Route.useParams();

  const trpc = useTRPC();
  const { data: routeData } = useQuery(
    trpc.staffs.getStaff.queryOptions({ id: staffId }),
  );

  const [tab, setTab] = useQueryState('tab', {
    defaultValue: 'overview',
    history: 'replace',
  });

  if (!routeData) {
    return <div>No staff data found.</div>;
  }

  const staff = routeData.data;

  const name = `${staff.firstName} ${staff.lastName}`;
  const profile = staff.avatar?.url || '/avatars/placeholder.png';

  return (
    <div>
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
            <Button>Create appointment</Button>
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
                  <V2.DropdownMenuItem
                    onClick={() => console.log('Update staff')}
                  >
                    <span className="flex items-center gap-x-2">
                      <EditIcon className="size-4 text-inherit" />
                      <span>Update</span>
                    </span>
                  </V2.DropdownMenuItem>
                  <V2.DropdownMenuItem
                    onClick={() => console.log('Archive staff')}
                  >
                    <span className="flex items-center gap-x-2 text-red-500">
                      <ArchiveIcon className="size-4 text-inherit" />
                      <span>Archive</span>
                    </span>
                  </V2.DropdownMenuItem>
                </V2.DropdownMenuGroup>
                <V2.DropdownMenuSeparator />
              </V2.DropdownMenuContent>
            </V2.DropdownMenu>
          </div>
        </div>
      </div>
      <div>
        <Root defaultValue={tab} onChangeTab={setTab}>
          <List>
            <ListItem value="overview">Overview</ListItem>
            <ListItem value="appointments">Appointments</ListItem>
            <ListItem value="patients">Patients</ListItem>
            <ListItem value="employee-data">Employee Data</ListItem>
          </List>
          <TabContent value="overview" className="py-5 gap-5 flex flex-col">
            Overview
          </TabContent>
          <TabContent value="appointments" className="py-5 gap-5 flex flex-col">
            Appointments
          </TabContent>
          <TabContent value="patients" className="py-5 gap-5 flex flex-col">
            Patients
          </TabContent>
          <TabContent
            value="employee-data"
            className="py-5 gap-5 flex flex-col"
          >
            Employee Data
          </TabContent>
        </Root>
      </div>
    </div>
  );
};

export default ViewStaff;
