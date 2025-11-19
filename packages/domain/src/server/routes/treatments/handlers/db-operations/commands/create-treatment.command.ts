import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { InsertResult } from 'kysely';
import type { CreateTreatmentParams } from '../../create-treatment';

export const createTreatment = async ({
  ctx,
  input,
}: CreateTreatmentParams) => {
  const created = await ctx.db
    .insertInto('Treatment')
    .values({
      category: input.category,
      description: input.description,
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

  const promises: Promise<InsertResult[]>[] = [];

  if ((input.components?.length || 0) > 0) {
    promises.push(createComponentForTreatment({ ctx, input }, created.id));
  }

  if ((input.visits?.length || 0) > 0) {
    promises.push(createVisitsForTreatment({ ctx, input }, created.id));
  }

  await Promise.all(promises);

  return created;
};

// AUXILIARY FUNCTIONS
const createComponentForTreatment = (
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

const createVisitsForTreatment = (
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
        gracePeriod: item.gracePeriod,
        gracePeriodUnit: item.gracePeriodUnit,
      })),
    )
    .execute();
};
