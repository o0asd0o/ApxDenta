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
    <Card className="relative overflow-hidden bg-white border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-200 py-0 gap-2">
      {/* Decorative line header */}
      <div className="h-1.5 bg-gray-200" />

      {/* Action Menu */}
      <div className="absolute top-4 right-3">
        <RenderTreatmentActions
          name={treatment.name}
          treatmentId={treatment.id}
          original={treatment}
        />
      </div>

      {/* Header Section */}
      <div className="p-4 pb-3">
        {/* Treatment Name & Status */}
        <div className="pr-8 mb-1 flex gap-3">
          <h3 className="font-semibold text-base leading-tight mb-1">
            {treatment.name}
          </h3>
        </div>
        <div className="flex gap-2">
          {treatment.status === 'SAMPLE' && (
            <div className="inline-block mt-0.5">
              {TREATMENT_STATUS_BADGES['SAMPLE' as const]}
            </div>
          )}
          <div>{TREATMENT_TYPE_BADGES[treatment.visitType]}</div>
        </div>
        {/* Visit Type Badge */}
      </div>

      <Separator />

      {/* Content Section */}
      <div className="p-4 pt-3 space-y-3">
        {/* Price & Duration */}
        <div className="space-y-1.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-gray-500">Starts from</span>
            <span className="font-semibold text-sm">₱{formattedPrice}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-600">
            <Clock className="size-3.5 text-gray-400" />
            <span>
              {duration} hour{duration !== 1 ? 's' : ''}
              {treatment.visitType === 'MULTIPLE_VISIT' && (
                <span className="text-gray-500"> / treatment</span>
              )}
            </span>
          </div>
        </div>

        <Separator />

        {/* Rating & Reviews */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[10px] text-primary-600 uppercase font-semibold mb-1">
              <Star className="size-3" />
              Rating
            </div>
            <div className="text-xs font-medium text-gray-900">
              {treatment.averageRating && (
                <span className="flex items-center gap-1">
                  <Star className="size-3 text-yellow-500 fill-yellow-500" />
                  {treatment.averageRating.toFixed(1)}
                </span>
              )}
              {!treatment.averageRating && (
                <span className="text-gray-400 font-normal">No ratings</span>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg p-2.5 border border-gray-100">
            <div className="flex items-center gap-1.5 text-[10px] text-primary-600 uppercase font-semibold mb-1">
              Reviews
            </div>
            <div className="text-xs font-medium text-gray-900">
              {treatment.totalReviews || 0} review
              {treatment.totalReviews !== 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Description (if exists) */}
        {treatment.description && (
          <>
            <Separator />
            <p className="text-xs text-gray-600 line-clamp-2">
              {treatment.description}
            </p>
          </>
        )}
      </div>
    </Card>
  );
};

export default TreatmentCard;
