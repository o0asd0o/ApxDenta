import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
} from '@repo/ui/components';
import { Image as ImageIcon, MessageSquare } from 'lucide-react';
import React from 'react';

interface ReviewsTabProps {
  treatmentId: string;
}

const ReviewsTab: React.FC<ReviewsTabProps> = ({
  treatmentId: _treatmentId,
}) => {
  // You'll need to create this query in your tRPC router
  // const trpc = useTRPC();
  // const { data } = useQuery(
  //   trpc.treatments.getReviews.queryOptions({ treatmentId }),
  // );

  // Mock data for demonstration
  const reviews = [
    {
      id: '1',
      description:
        'Amazing experience! The staff was very professional and the treatment exceeded my expectations. Would definitely recommend to anyone looking for quality dental care.',
      createdAt: new Date('2024-01-15'),
      patient: {
        name: 'John Doe',
        image: null,
      },
      images: [
        {
          id: '1',
          fileKey: 'image1.jpg',
          url: 'https://via.placeholder.com/400x300',
        },
        {
          id: '2',
          fileKey: 'image2.jpg',
          url: 'https://via.placeholder.com/400x300',
        },
      ],
    },
    {
      id: '2',
      description:
        'Very satisfied with the results. The procedure was explained clearly and I felt comfortable throughout.',
      createdAt: new Date('2024-01-10'),
      patient: {
        name: 'Jane Smith',
        image: null,
      },
      images: [],
    },
    {
      id: '3',
      description:
        'Excellent service from start to finish. The treatment was painless and the results are fantastic!',
      createdAt: new Date('2024-01-05'),
      patient: {
        name: 'Bob Johnson',
        image: null,
      },
      images: [
        {
          id: '3',
          fileKey: 'image3.jpg',
          url: 'https://via.placeholder.com/400x300',
        },
      ],
    },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

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

  // Sort reviews by date (most recent first)
  const recentReviews = [...reviews].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Recent Reviews</h3>
        <Badge variant="secondary">
          {reviews.length} Review{reviews.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {recentReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="size-10">
                    <AvatarImage src={review.patient?.image || undefined} />
                    <AvatarFallback className="text-sm">
                      {getInitials(review.patient?.name || 'Anonymous')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-sm">
                      {review.patient?.name || 'Anonymous'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
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
                          src={image.url}
                          alt={`Review ${image.fileKey}`}
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
