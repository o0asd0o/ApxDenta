import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { CreateTreatmentParams } from '../create-treatment';

export const createTreatment = ({ ctx, input }: CreateTreatmentParams) => {
  return ctx.db
    .insertInto('Treatment')
    .values({
      category: input.category,
      descrpition: input.descrpition,
      duration: input.duration,
      name: input.name,
      pricePerDuration: input.pricePerduration,
      visitType: input.visitType,
      organizationId: ctx.organizationId,
      unit: input.unit,
      status: input.status,
    })
    .returning('id')
    .executeTakeFirstOrThrow();
};

export const createComponentForTreatment = (
  { ctx, input }: CreateTreatmentParams,
  treatmentId: string,
) => {
  const components = input.components || [];
  return ctx.db
    .insertInto('TreatmentComponent')
    .values(
      components.map((item) => {
        return {
          medicalComponentId: item.medicalComponentId,
          quantity: item.quantity,
          free: item.free,
          freeUpTo: item.freeUpTo,
          treatmentId: treatmentId,
          ...GET_DETAULT_DATES(),
        };
      }),
    )
    .execute();
};

export const createVisitsForTreatment = (
  { ctx, input }: CreateTreatmentParams,
  treatmentId: string,
) => {
  const visits = input.visits || [];
  return ctx.db
    .insertInto('TreatmentVisit')
    .values(
      visits.map((item, index) => ({
        sequence: index + 1,
        treatmentId: treatmentId,
        visitTreatmentId: item.treatmentId,
      })),
    )
    .execute();
};
