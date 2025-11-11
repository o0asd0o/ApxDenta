import {
  TREATMENT_STATUS_BADGES,
  TREATMENT_TYPE_BADGES,
} from '@/constants/badges';
import { Card, Separator } from '@repo/ui/components';
import { Clock, Star } from 'lucide-react';
import React from 'react';
import { RenderTreatmentActions } from '../__renderers';
import type { TreatmentColumnType } from '../__types';

interface TreatmentCardProps {
  treatment: TreatmentColumnType;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment }) => {
  const price = treatment.pricePerDuration * treatment.duration;
  const formattedPrice = new Intl.NumberFormat('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);

  const duration =
    treatment.visitType === 'SINGLE_VISIT'
      ? treatment.duration
      : treatment.averageDuration || 1;

  return (
    <Card className=" gap-1 relative p-4 hover:shadow-md transition-shadow border border-gray-200">
      {/* Action Menu */}
      <div className="absolute top-3 right-3">
        <RenderTreatmentActions
          name={treatment.name}
          treatmentId={treatment.id}
          original={treatment}
        />
      </div>

      {/* Treatment Name & Status */}
      <div className="pr-8 mb-1">
        <h3 className="font-semibold text-base leading-tight mb-1">
          {treatment.name}
        </h3>
        {treatment.status === 'SAMPLE' && (
          <div className="inline-block mt-0.5">
            {TREATMENT_STATUS_BADGES['SAMPLE' as const]}
          </div>
        )}
      </div>

      {/* Visit Type Badge */}
      <div className="mb-2">{TREATMENT_TYPE_BADGES[treatment.visitType]}</div>

      <Separator className="mb-2" />

      {/* Price & Duration */}
      <div className="space-y-1.5 mb-2">
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-gray-500">Starts from</span>
          <span className="font-semibold text-sm">₱{formattedPrice}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <Clock className="size-3.5" />
          <span>
            {duration} hour{duration !== 1 ? 's' : ''}
            {treatment.visitType === 'MULTIPLE_VISIT' && (
              <span className="text-gray-500"> / treatment</span>
            )}
          </span>
        </div>
      </div>

      {/* Rating & Reviews */}
      <div className="flex items-center gap-2.5 text-xs">
        {treatment.averageRating ? (
          <>
            <div className="inline-flex items-center gap-1 font-medium">
              <Star className="size-3.5 text-yellow-500 fill-yellow-500" />
              <span>{treatment.averageRating.toFixed(1)}</span>
            </div>
            <span className="text-gray-500">
              {treatment.totalReviews || 0} review
              {treatment.totalReviews !== 1 ? 's' : ''}
            </span>
          </>
        ) : (
          <span className="text-gray-400">No ratings yet</span>
        )}
      </div>

      {/* Description (if exists) */}
      {treatment.description && (
        <>
          <Separator className="my-2" />
          <p className="text-xs text-gray-600 line-clamp-2">
            {treatment.description}
          </p>
        </>
      )}
    </Card>
  );
};

export default TreatmentCard;
