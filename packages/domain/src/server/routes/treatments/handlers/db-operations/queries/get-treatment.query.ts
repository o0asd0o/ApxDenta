import type { DatabaseInstance } from '@/db';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { getAverageDuration } from './get-all-treatments.query';

export const getTreatmentById = async (
  db: DatabaseInstance,
  treatmentId: string,
) => {
  return db
    .selectFrom('Treatment')
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('TreatmentComponent')
          .select([
            'TreatmentComponent.id',
            'TreatmentComponent.free',
            'TreatmentComponent.free',
            'TreatmentComponent.freeUpTo',
            'TreatmentComponent.quantity',
            (ieb1) => {
              return jsonObjectFrom(
                ieb1
                  .selectFrom('MedicalComponent')
                  .whereRef(
                    'MedicalComponent.id',
                    '=',
                    'TreatmentComponent.medicalComponentId',
                  )
                  .select(['MedicalComponent.name', 'MedicalComponent.price']),
              ).as('medicalComponent');
            },
          ])
          .whereRef('TreatmentComponent.treatmentId', '=', 'Treatment.id'),
      ).as('components');
    })
    .select((eb) => getAverageDuration(eb).as('averageDuration'))
    .selectAll()
    .where('Treatment.id', '=', treatmentId)
    .executeTakeFirstOrThrow();
};
