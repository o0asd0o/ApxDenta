import dayjs from 'dayjs';
import { createDb } from './client';
import { dentalTreatments } from './seeder-fixtures/dental-treatments';
import { PH_HOLIDAYS } from './seeder-fixtures/ph-holidays';
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

const createDefaultHolidays = async () => {
  return Promise.all(
    PH_HOLIDAYS.map((i) => {
      return db
        .insertInto('DayOff')
        .values({
          from: dayjs(i.from).toDate(),
          name: i.name,
          to: dayjs(i.to).toDate(),
          isDefault: true,
          repeat: true,
        })
        .execute();
    }),
  );
};
const main = async () => {
  await createSpecialistRecords();
  await createTreatments();
  await createDefaultHolidays();
};

main().then(async () => {
  console.log('All Good');
});
