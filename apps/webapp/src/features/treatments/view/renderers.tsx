import { Star } from 'lucide-react';

export const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const fractionalPart = rating % 1;
  const hasPartialStar = fractionalPart > 0;
  const emptyStars = 5 - fullStars - (hasPartialStar ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, i) => (
        <Star
          // biome-ignore lint: index used only for key generation
          key={`full-star-${rating}-${i}`}
          className="size-4 fill-yellow-500 text-yellow-500"
        />
      ))}
      {hasPartialStar && (
        <div key="partial-star" className="relative size-4">
          <Star className="absolute inset-0 size-4 fill-gray-300 text-gray-300" />
          <Star
            className="absolute inset-0 size-4 fill-yellow-500 text-yellow-500"
            style={{
              clipPath: `inset(0 ${100 - fractionalPart * 100}% 0 0)`,
            }}
          />
        </div>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          // biome-ignore lint: index used only for key generation
          key={`empty-star-${rating}-${i}`}
          className="size-4 fill-gray-300 text-gray-300"
        />
      ))}
      <span className="ml-1 text-sm font-semibold">{rating.toFixed(1)}</span>
    </div>
  );
};
