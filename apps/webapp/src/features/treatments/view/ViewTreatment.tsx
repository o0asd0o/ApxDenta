import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import {
  TREATMENT_STATUS_BADGES,
  TREATMENT_TYPE_BADGES,
} from '@/constants/badges';
import { useTRPC } from '@/lib/trpc';
import { Route } from '@/routes/_protected/(clinic)/treatments/$treatmentId';
import {
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Card,
  CardContent,
  Separator,
  V2,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import {
  Clock,
  DollarSign,
  DoorOpen,
  EditIcon,
  MoreVertical,
  Package,
  Wrench,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import React from 'react';

import { useIsMobile } from '@/hooks/use-mobile';
import OverviewTab from './sub-pages/OverviewTab';
import RatingsTab from './sub-pages/RatingsTab';
import ReviewsTab from './sub-pages/ReviewsTab';
import VisitsTab from './sub-pages/VisitsTab';

/**
 * TODO:
 * 1. have animations for sections
 */
const ViewTreatment: React.FC = () => {
  const { treatmentId } = Route.useParams();

  const trpc = useTRPC();
  const { data: routeData } = useQuery(
    trpc.treatments.getTreatment.queryOptions({ id: treatmentId }),
  );

  const [tab, setTab] = useQueryState('tab', {
    defaultValue: 'overview',
    history: 'replace',
  });

  const isMobile = useIsMobile();

  if (!routeData) {
    return <div>No treatment data found.</div>;
  }

  const treatment = routeData.data;
  const totalPrice = treatment.pricePerDuration * treatment.duration;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex px-5 py-3 border-b">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/treatments">Treatments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Treatment Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Header Section */}
      <div>
        <div className="p-5 pb-0">
          <div className="flex justify-between items-start mb-6">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <span className="text-2xl font-bold">{treatment.name}</span>
                {treatment.status === 'SAMPLE' &&
                  TREATMENT_STATUS_BADGES[treatment.status]}
              </div>
              <div className="flex gap-2 items-center">
                {TREATMENT_TYPE_BADGES[treatment.visitType]}
                <Separator orientation="vertical" className="h-4" />
                <Badge variant="outline" className="gap-1">
                  <Wrench className="size-3" />
                  {treatment.category === 'MEDICAL_SERVICE'
                    ? 'Medical Service'
                    : 'Cosmetic Service'}
                </Badge>
              </div>
            </div>

            <div className="flex gap-2 items-start">
              {!isMobile && (
                <Button variant="outline" className="gap-2">
                  <EditIcon className="size-4" />
                  Edit Treatment
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
                      <V2.DropdownMenuItem>Update</V2.DropdownMenuItem>
                    )}
                    <V2.DropdownMenuItem>Duplicate</V2.DropdownMenuItem>
                    <V2.DropdownMenuItem className="text-destructive">
                      Archive
                    </V2.DropdownMenuItem>
                  </V2.DropdownMenuGroup>
                </V2.DropdownMenuContent>
              </V2.DropdownMenu>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="py-0">
              <CardContent className="p-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Starting Price
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      ₱
                      {new Intl.NumberFormat('en-PH', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(totalPrice)}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <DollarSign className="size-10 md:size-12 text-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0">
              <CardContent className="p-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Duration
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {treatment.averageDuration || treatment.duration} hr
                    </p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <Clock className="size-10 md:size-12 text-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0">
              <CardContent className="p-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Visits
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {treatment.visitType === 'SINGLE_VISIT'
                        ? '1'
                        : treatment.visits?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <DoorOpen className="size-10 md:size-12 text-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="py-0">
              <CardContent className="p-5 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      Components
                    </p>
                    <p className="text-2xl font-bold mt-1">
                      {treatment.components?.length || 0}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg">
                    <Package className="size-10 md:size-12 text-gray-200" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Root
          defaultValue={tab || 'overview'}
          onChangeTab={(value) => {
            if (value) setTab(value);
          }}
        >
          <List>
            <ListItem value="overview">Overview</ListItem>
            <ListItem value="visits">
              Visits{' '}
              {treatment.visitType === 'MULTIPLE_VISIT' &&
                `(${treatment.visits?.length || 0})`}
            </ListItem>
            <ListItem value="ratings">Ratings</ListItem>
            <ListItem value="reviews">Reviews</ListItem>
          </List>

          <TabContent
            value="overview"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <OverviewTab treatment={treatment} />
          </TabContent>

          <TabContent
            value="visits"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <VisitsTab treatment={treatment} />
          </TabContent>

          <TabContent
            value="ratings"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <RatingsTab treatmentId={treatmentId} />
          </TabContent>

          <TabContent
            value="reviews"
            className="py-5 gap-5 flex flex-col bg-sidebar flex-1"
          >
            <ReviewsTab treatmentId={treatmentId} />
          </TabContent>
        </Root>
      </div>
    </div>
  );
};

export default ViewTreatment;
