import StarRating from '@/components/StarRating';
import { useTRPC } from '@/lib/trpc';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { Star } from 'lucide-react';
import React from 'react';
import { formatDate } from './__helpers';

interface RatingsTabProps {
  treatmentId: string;
}

const RatingsTab: React.FC<RatingsTabProps> = ({ treatmentId }) => {
  const trpc = useTRPC();
  const { data: ratingsData, isLoading } = useQuery(
    trpc.treatments.getTreatmentRatings.queryOptions({
      treatmentId,
      page: 1,
      perPage: 20,
    }),
  );

  const ratings = ratingsData?.data?.items || [];
  const summary = ratingsData?.data?.summary;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32 w-full" />
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!ratings || ratings.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Star className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">No Ratings Yet</h3>
            <p className="text-sm text-muted-foreground">
              This treatment hasn't received any ratings yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Sort ratings by rate (highest first)
  const topRatings = [...ratings].sort((a, b) => b.rate - a.rate);
  const averageRating = summary?.averageRating || 0;
  const totalCount = summary?.totalCount || ratings.length;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-2">
                Average Rating
              </p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold">
                  {averageRating.toFixed(1)}
                </span>
                <div className="flex flex-col gap-1">
                  <StarRating rating={averageRating} />
                  <span className="text-xs text-muted-foreground">
                    Based on {totalCount} rating
                    {totalCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>
            <Star className="size-16 text-yellow-500 fill-yellow-500 opacity-20" />
          </div>
        </CardContent>
      </Card>

      {/* Top Ratings */}
      <div>
        <h3 className="text-lg font-bold mb-4">Top Ratings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          {topRatings.slice(0, 6).map((rating) => (
            <Card key={rating.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <StarRating rating={rating.rate} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {formatDate(rating.createdAt)}
                  </Badge>
                </div>
              </CardHeader>
              {rating.remark && (
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    "{rating.remark}"
                  </p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingsTab;
