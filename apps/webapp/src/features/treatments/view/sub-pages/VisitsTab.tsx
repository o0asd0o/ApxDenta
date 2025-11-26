import type { TreatmentVisitType } from '@repo/domain/db';
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components';
import { ArrowRight, Calendar } from 'lucide-react';
import React from 'react';
import type { TreatmentVisits } from '../__types';

interface VisitsTabProps {
  treatment: {
    visitType: TreatmentVisitType;
    visits: TreatmentVisits;
  };
}

const VisitsTab: React.FC<VisitsTabProps> = ({ treatment }) => {
  const visits = treatment.visits || [];

  if (treatment.visitType === 'SINGLE_VISIT') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calendar className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">Single Visit Treatment</h3>
            <p className="text-sm text-muted-foreground">
              This treatment is completed in a single visit.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (visits.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calendar className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-bold mb-2">No Visits Configured</h3>
            <p className="text-sm text-muted-foreground">
              No visit schedule has been set up for this treatment yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Treatment Visit Schedule</h3>
        <Badge variant="secondary">{visits.length} Visits Required</Badge>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-4">
          {visits
            .sort((a, b) => (a.sequence || 0) - (b.sequence || 0))
            .map((visit, index: number) => (
              <Card key={visit.id} className="relative ml-12">
                {/* Timeline dot */}
                <div className="absolute -left-[3.25rem] top-6 size-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {visit.sequence}
                </div>

                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    Visit {visit.sequence}
                    {visit.visitTreatment && (
                      <>
                        <ArrowRight className="size-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-normal">
                          {visit.visitTreatment.name}
                        </span>
                      </>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {visit.gracePeriod && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="size-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          Grace Period:{' '}
                          <span className="font-medium text-foreground">
                            {visit.gracePeriod}{' '}
                            {visit.gracePeriodUnit?.toLowerCase() || 'days'}
                          </span>
                        </span>
                      </div>
                    )}

                    {visit.visitTreatment?.description && (
                      <p className="text-sm text-muted-foreground mt-2">
                        {visit.visitTreatment.description}
                      </p>
                    )}

                    {index < visits.length - 1 && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-muted-foreground italic">
                          After this visit, patient should return within the
                          grace period
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VisitsTab;
