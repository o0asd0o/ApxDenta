import StarRating from '@/components/StarRating';
import { Badge, Card, CardContent, CardHeader } from '@repo/ui/components';
import { Star } from 'lucide-react';
import React from 'react';

interface RatingsTabProps {
  treatmentId: string;
}

const RatingsTab: React.FC<RatingsTabProps> = ({
  treatmentId: _treatmentId,
}) => {
  // You'll need to create this query in your tRPC router
  // const trpc = useTRPC();
  // const { data } = useQuery(
  //   trpc.treatments.getRatings.queryOptions({ treatmentId }),
  // );

  // Mock data for demonstration
  const ratings = [
    {
      id: '1',
      rate: 5,
      remark: 'Excellent treatment! Very satisfied with the results.',
      createdAt: new Date('2024-01-15'),
      patient: { name: 'John Doe' },
    },
    {
      id: '2',
      rate: 4.5,
      remark: 'Great service and professional staff.',
      createdAt: new Date('2024-01-10'),
      patient: { name: 'Jane Smith' },
    },
    {
      id: '3',
      rate: 5,
      remark: 'Highly recommend! The procedure was painless and effective.',
      createdAt: new Date('2024-01-05'),
      patient: { name: 'Bob Johnson' },
    },
  ];

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
  const averageRating =
    ratings.reduce((sum, r) => sum + r.rate, 0) / ratings.length;

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
                    Based on {ratings.length} rating
                    {ratings.length !== 1 ? 's' : ''}
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
                    <p className="text-sm text-muted-foreground mt-1">
                      {rating.patient?.name || 'Anonymous'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {new Date(rating.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
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
