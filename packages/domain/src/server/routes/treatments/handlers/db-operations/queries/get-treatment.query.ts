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
            'TreatmentComponent.medicalComponentId',
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
    .select((eb) => {
      return jsonArrayFrom(
        eb
          .selectFrom('TreatmentVisit')
          .select([
            'TreatmentVisit.id',
            'TreatmentVisit.sequence',
            'TreatmentVisit.gracePeriod',
            'TreatmentVisit.gracePeriodUnit',
            (ieb1) => {
              return jsonObjectFrom(
                ieb1
                  .selectFrom('Treatment')
                  .whereRef(
                    'Treatment.id',
                    '=',
                    'TreatmentVisit.visitTreatmentId',
                  )
                  .select([
                    'Treatment.name',
                    'Treatment.id',
                    'Treatment.description',
                  ]),
              ).as('visitTreatment');
            },
          ])
          .whereRef('TreatmentVisit.treatmentId', '=', 'Treatment.id'),
      ).as('visits');
    })
    .select((eb) => getAverageDuration(eb).as('averageDuration'))
    .selectAll()
    .where('Treatment.id', '=', treatmentId)
    .executeTakeFirstOrThrow();
};
