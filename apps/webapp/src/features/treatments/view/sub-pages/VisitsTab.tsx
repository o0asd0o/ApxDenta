import { TimelineLayout } from '@/components/TimelineLayout';
import type { TreatmentVisitType } from '@repo/domain/db';
import { Badge, Card, CardContent } from '@repo/ui/components';
import type { TimelineElement } from '@repo/ui/components';
import { Calendar } from 'lucide-react';
import React from 'react';
import type { TreatmentVisits } from '../__types';

interface VisitsTabProps {
  treatment: {
    visitType: TreatmentVisitType;
    visits: TreatmentVisits;
  };
}

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis rutrum leo eget mattis. Duis leo libero, tempus sit amet dictum a, pretium non enim. Integer sed arcu 
`;

const VisitsTab: React.FC<VisitsTabProps> = ({ treatment }) => {
  const visits = treatment.visits || [];

  if (treatment.visitType === 'SINGLE_VISIT') {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <Calendar className="size-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              Single Visit Treatment
            </h3>
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
            <h3 className="text-lg font-semibold mb-2">No Visits Configured</h3>
            <p className="text-sm text-muted-foreground">
              No visit schedule has been set up for this treatment yet.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedVisits = [...visits].sort(
    (a, b) => (a.sequence || 0) - (b.sequence || 0),
  );

  const timelineItems: TimelineElement[] = sortedVisits.map((visit, index) => ({
    id: visit.sequence || index + 1,
    date: visit.gracePeriod
      ? `Grace Period: ${visit.gracePeriod} ${visit.gracePeriodUnit?.toLowerCase() || 'days'}`
      : new Date().toDateString(),
    title: `Visit ${visit.sequence}`,
    description: visit.visitTreatment?.description || lorem,
    icon: () => <span className="font-semibold text-sm">{visit.sequence}</span>,
    color: 'primary' as const,
  }));

  console.log('timelineItems', timelineItems);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Treatment Visit Schedule</h3>
        <Badge variant="outline">{visits.length} Visits Required</Badge>
      </div>

      <TimelineLayout
        items={timelineItems}
        size="md"
        iconColor="primary"
        connectorColor="primary"
        animate={true}
        className="mx-0"
      />
    </div>
  );
};

export default VisitsTab;
