import { Card, CardContent, CardHeader } from '@repo/ui/components';
import { Star } from 'lucide-react';
import React from 'react';

const popularTreatments = [
  { name: 'Scaling Teeth', rating: 4.7, icon: '🦷' },
  { name: 'Tooth Extraction', rating: 4.4, icon: '🦷' },
  { name: 'General Checkup', rating: 4.6, icon: '🦷' },
];

const PopularTreatmentsCard: React.FC = () => {
  return (
    <Card className="gap-2 p-4">
      <CardHeader className="pb-2 pl-1 pr-0">
        <p className="text-sm font-bold text-gray-900">Popular Treatment</p>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-3">
          {popularTreatments.map((treatment) => (
            <div
              key={treatment.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <div className="text-base h-4 w-[3px] bg-gray-300" />
                <span className="text-sm text-gray-700">{treatment.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">
                  {treatment.rating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopularTreatmentsCard;
