// Re-export common helpers from lib
export { formatDate, getInitials } from '@/lib/utils';

export const RATING_COLORS: Record<number, string> = {
  5: 'text-green-600',
  4: 'text-lime-600',
  3: 'text-yellow-600',
  2: 'text-orange-600',
  1: 'text-red-600',
};

export const getRatingLabel = (rating: number): string => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 3.5) return 'Good';
  if (rating >= 2.5) return 'Average';
  if (rating >= 1.5) return 'Below Average';
  return 'Poor';
};
