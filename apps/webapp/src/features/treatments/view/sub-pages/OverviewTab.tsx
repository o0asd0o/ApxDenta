import Tooth from '@/assets/tooth';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components';
import { ClipboardList, Package } from 'lucide-react';
import React from 'react';
import type { TreatmentComponents } from '../__types';

type Props = {
  treatment: {
    description: string;
    pricePerDuration: number;
    averageDuration: number | null;
    duration: number;
    components: TreatmentComponents;
  };
};

const OverviewTab: React.FC<Props> = ({ treatment }) => {
  return (
    <div className="space-y-6">
      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="size-5" />
            Description
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {treatment.description || 'No description available.'}
          </p>
        </CardContent>
      </Card>

      {/* Components */}
      {treatment.components && treatment.components.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="size-5" />
              Components ({treatment.components.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {treatment.components.map((component) => (
                <div
                  key={component.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent"
                >
                  <div className="flex items-center gap-2">
                    <Tooth className="size-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm">
                        {component.medicalComponent?.name ||
                          'Unknown Component'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Qty: {component.quantity}</Badge>
                    {component.free && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        Free{' '}
                        {component.freeUpTo && `(up to ${component.freeUpTo})`}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Price Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Price Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-sm text-muted-foreground">
                Price per Duration
              </span>
              <span className="font-medium">
                ₱
                {new Intl.NumberFormat('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(treatment.pricePerDuration)}
              </span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-sm text-muted-foreground">
                Duration (hours)
              </span>
              <span className="font-medium">
                {treatment.averageDuration || treatment.duration} hr
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-semibold">Total Starting Price</span>
              <span className="text-xl font-semibold text-primary">
                ₱
                {new Intl.NumberFormat('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(treatment.pricePerDuration * treatment.duration)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
