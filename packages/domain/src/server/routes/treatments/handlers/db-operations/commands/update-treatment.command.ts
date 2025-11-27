import type { DatabaseInstance } from '@/db';
import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { UpdateTreatmentParams } from '../../update-treatment';

export const updateTreatment = async ({
  ctx,
  input,
}: UpdateTreatmentParams) => {
  return await ctx.db.transaction().execute(async (trx) => {
    // Update the treatment record
    const updated = await trx
      .updateTable('Treatment')
      .set({
        category: input.category,
        description: input.description,
        duration: input.duration,
        name: input.name,
        pricePerDuration: input.pricePerduration,
        visitType: input.visitType,
        unit: input.unit,
        status: input.status,
        updatedAt: new Date(),
      })
      .where('Treatment.id', '=', input.id)
      .where('Treatment.organizationId', '=', ctx.organizationId)
      .returning('id')
      .executeTakeFirstOrThrow();

    // Smart diff and update components and visits within transaction
    await Promise.all([updateComponents(trx, input), updateVisits(trx, input)]);

    return updated;
  });
};

// AUXILIARY FUNCTIONS

/**
 * Smart update for treatment components
 * - Deletes components that are no longer in the input
 * - Updates existing components if values changed
 * - Inserts new components
 */
const updateComponents = async (
  trx: DatabaseInstance,
  input: UpdateTreatmentParams['input'],
) => {
  const newComponents = input.components || [];

  // Fetch existing components
  const existingComponents = await trx
    .selectFrom('TreatmentComponent')
    .where('TreatmentComponent.treatmentId', '=', input.id)
    .selectAll()
    .execute();

  // Identify components to delete (exist in DB but not in input)
  const newComponentIds = newComponents.map((item) => item.id).filter(Boolean);
  const toDeleteIds = existingComponents.reduce((accu, current) => {
    if (!newComponentIds.includes(current.id)) accu.push(current.id);
    return accu;
  }, [] as string[]);

  // Identify components to update (exist in both, check if values changed)
  const toUpdate = newComponents.filter((newComp) => {
    const existing = existingComponents.find(
      (e) => e.medicalComponentId === newComp.medicalComponentId,
    );
    if (!existing) return false;

    // Check if any values changed
    return (
      existing.quantity !== newComp.quantity ||
      existing.free !== (newComp.free ?? null) ||
      existing.freeUpTo !== (newComp.freeUpTo ?? null)
    );
  });

  // Identify components to insert (in input but not in DB)
  const toInsert = newComponents.filter(
    (newComp) =>
      !existingComponents.some(
        (existing) =>
          existing.medicalComponentId === newComp.medicalComponentId,
      ),
  );

  const promises = [];

  // Delete removed components
  if (toDeleteIds.length > 0) {
    promises.push(
      trx
        .deleteFrom('TreatmentComponent')
        .where('TreatmentComponent.id', 'in', toDeleteIds)
        .execute(),
    );
  }

  // Update changed components
  for (const component of toUpdate) {
    const existing = existingComponents.find(
      (e) => e.medicalComponentId === component.medicalComponentId,
    );
    if (existing) {
      promises.push(
        trx
          .updateTable('TreatmentComponent')
          .set({
            quantity: component.quantity,
            free: component.free ?? null,
            freeUpTo: component.freeUpTo ?? null,
            updatedAt: new Date(),
          })
          .where('TreatmentComponent.id', '=', existing.id)
          .execute(),
      );
    }
  }

  // Insert new components
  if (toInsert.length > 0) {
    promises.push(
      trx
        .insertInto('TreatmentComponent')
        .values(
          toInsert.map((item) => ({
            medicalComponentId: item.medicalComponentId,
            quantity: item.quantity,
            free: item.free ?? null,
            freeUpTo: item.freeUpTo ?? null,
            treatmentId: input.id,
            ...GET_DETAULT_DATES(),
          })),
        )
        .execute(),
    );
  }

  await Promise.all(promises);
};

const updateVisits = async (
  trx: DatabaseInstance,
  input: UpdateTreatmentParams['input'],
) => {
  const newVisits = input.visits || [];

  // Fetch existing visits
  const existingVisits = await trx
    .selectFrom('TreatmentVisit')
    .where('TreatmentVisit.treatmentId', '=', input.id)
    .orderBy('sequence', 'desc')
    .selectAll()
    .execute();

  const newVisitsIds = newVisits.map((v) => v.id).filter(Boolean);
  const toDeleteIds = existingVisits.reduce((accu, current) => {
    if (!newVisitsIds.includes(current.id)) accu.push(current.id);
    return accu;
  }, [] as string[]);

  // Identify visits to update (exist in both, check if values changed)
  const toUpdateItems = newVisits
    .map((newVisit, index) => {
      const existing = existingVisits.find((e) => e.sequence === index + 1);
      if (!existing) return null;

      // Check if any values changed
      const hasChanges =
        existing.visitTreatmentId !== newVisit.treatmentId ||
        existing.gracePeriod !== (newVisit.gracePeriod ?? null) ||
        existing.gracePeriodUnit !== (newVisit.gracePeriodUnit ?? null);

      return hasChanges ? { newVisit, existing, sequence: index + 1 } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Identify visits to insert (new sequence numbers)
  const toInsert = newVisits
    .map((newVisit, index) => {
      const sequence = index + 1;
      const exists = existingVisits.some((e) => e.sequence === sequence);
      return exists ? null : { newVisit, sequence };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  const promises = [];

  // Delete removed visits
  if (toDeleteIds.length > 0) {
    promises.push(
      trx
        .deleteFrom('TreatmentVisit')
        .where('TreatmentVisit.id', 'in', toDeleteIds)
        .execute(),
    );
  }

  // Update changed visits
  for (const { newVisit, existing } of toUpdateItems) {
    promises.push(
      trx
        .updateTable('TreatmentVisit')
        .set({
          visitTreatmentId: newVisit.treatmentId,
          gracePeriod: newVisit.gracePeriod ?? null,
          gracePeriodUnit: newVisit.gracePeriodUnit ?? null,
        })
        .where('TreatmentVisit.id', '=', existing.id)
        .execute(),
    );
  }

  // Insert new visits
  if (toInsert.length > 0) {
    promises.push(
      trx
        .insertInto('TreatmentVisit')
        .values(
          toInsert.map(({ newVisit, sequence }) => ({
            sequence,
            treatmentId: input.id,
            visitTreatmentId: newVisit.treatmentId,
            gracePeriod: newVisit.gracePeriod ?? null,
            gracePeriodUnit: newVisit.gracePeriodUnit ?? null,
          })),
        )
        .execute(),
    );
  }

  await Promise.all(promises);
};
