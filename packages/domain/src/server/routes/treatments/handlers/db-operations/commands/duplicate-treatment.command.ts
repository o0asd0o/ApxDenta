import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { DuplicateTreatmentParams } from '../../duplicate-treatment';

export const duplicateTreatment = async ({
  ctx,
  input,
}: DuplicateTreatmentParams) => {
  const db = ctx.db;

  // Get the original treatment with its components and visits
  const original = await db
    .selectFrom('Treatment')
    .selectAll()
    .where('id', '=', input.treatmentId)
    .where('organizationId', '=', ctx.organizationId)
    .executeTakeFirstOrThrow();

  // Get components
  const components = await db
    .selectFrom('TreatmentComponent')
    .selectAll()
    .where('treatmentId', '=', input.treatmentId)
    .execute();

  // Get visits
  const visits = await db
    .selectFrom('TreatmentVisit')
    .selectAll()
    .where('treatmentId', '=', input.treatmentId)
    .execute();

  // Create duplicate treatment with "(Copy)" suffix
  const duplicated = await db
    .insertInto('Treatment')
    .values({
      category: original.category,
      description: original.description,
      duration: original.duration,
      name: `${original.name} (Copy)`,
      pricePerDuration: original.pricePerDuration,
      visitType: original.visitType,
      organizationId: ctx.organizationId,
      unit: original.unit,
      status: 'SAMPLE', // Duplicated treatments start as SAMPLE
      ...GET_DETAULT_DATES(),
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  // Duplicate components
  if (components.length > 0) {
    await db
      .insertInto('TreatmentComponent')
      .values(
        components.map((item) => ({
          medicalComponentId: item.medicalComponentId,
          quantity: item.quantity,
          free: item.free,
          freeUpTo: item.freeUpTo,
          treatmentId: duplicated.id,
          ...GET_DETAULT_DATES(),
        })),
      )
      .execute();
  }

  // Duplicate visits
  if (visits.length > 0) {
    await db
      .insertInto('TreatmentVisit')
      .values(
        visits.map((item) => ({
          sequence: item.sequence,
          treatmentId: duplicated.id,
          visitTreatmentId: item.visitTreatmentId,
          gracePeriod: item.gracePeriod,
          gracePeriodUnit: item.gracePeriodUnit,
        })),
      )
      .execute();
  }

  return duplicated;
};
