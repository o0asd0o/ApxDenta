import { createDb } from './client';
import { dentalTreatments } from './seeder-fixtures/dental-treatments';
import { specialistRecords } from './seeder-fixtures/specialist-records';

const db = createDb({ databaseUrl: process.env.SERVER_POSTGRES_URL as string });

const createSpecialistRecords = async () => {
  await db
    .insertInto('SpecialistsRecord')
    .values(
      specialistRecords.map((item) => {
        return {
          title: item.specialty,
          description: item.description,
          code: item.code,
        };
      }),
    )
    .execute();
};

const createTreatments = async () => {
  const combiled = [
    ...dentalTreatments.cosmetic.map((item) => ({
      ...item,
      type: 'COSMETIC',
    })),
    ...dentalTreatments.medical.map((item) => ({
      ...item,
      type: 'MEDICAL',
    })),
  ];
  await db
    .insertInto('Treatment')
    .values(
      combiled.map((item) => {
        return {
          category:
            item.type === 'COSMETIC' ? 'COSMETIC_SERVICE' : 'MEDICAL_SERVICE',
          descrpition: item.description,
          name: item.name,
          pricePerDuration: 100,
          duration: 1,
          visitType: item.visits > 1 ? 'MULTIPLE_VISIT' : 'SINGLE_VISIT',
        };
      }),
    )
    .execute();
};
const main = async () => {
  // create specialist record
  // await createSpecialistRecords();
  // create treatments
  await createTreatments();
};

main().then(async () => {
  console.log('All Good');
});
