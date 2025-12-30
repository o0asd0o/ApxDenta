import { useTRPC } from '@/lib/trpc';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
} from '@repo/ui/components';
import { useQuery } from '@tanstack/react-query';
import { Image as ImageIcon, MessageSquare } from 'lucide-react';
import React from 'react';
import { formatDate } from './__helpers';

interface ReviewsTabProps {
  treatmentId: string;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({ treatmentId }) => {
  const trpc = useTRPC();
  const { data: reviewsData, isLoading } = useQuery(
    trpc.treatments.getTreatmentReviews.queryOptions({
      treatmentId,
      page: 1,
      perPage: 20,
    }),
  );

  const reviews = reviewsData?.data?.items || [];
  const totalCount = reviewsData?.data?.count || 0;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <MessageSquare className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">No Reviews Yet</h3>
            <p className="text-sm text-muted-foreground">
              This treatment hasn't received any reviews yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Reviews</h3>
        <Badge variant="secondary">
          {totalCount} Review{totalCount !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {review.description}
              </p>

              {review.images && review.images.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ImageIcon className="size-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {review.images.length} Image
                      {review.images.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {review.images.map((image) => (
                      <div
                        key={image.id}
                        className="aspect-video rounded-lg overflow-hidden border bg-muted hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <img
                          src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${image.thumb || image.url}`}
                          alt={image.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewsTab;
