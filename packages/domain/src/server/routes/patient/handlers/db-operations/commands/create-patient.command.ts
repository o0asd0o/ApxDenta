import { GET_DETAULT_DATES } from '@/server/utils/helpers';
import type { CreatePatientParams } from '../../create-patient';

export const createPatient = async ({ ctx, input }: CreatePatientParams) => {
  const created = await ctx.db
    .insertInto('Patient')
    .values({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      phoneNumber: input.phoneNumber,
      address: input.address,
      age: input.age,
      gender: input.gender,
      avatarId: input.avatarId,
      dentalCareStart: input.dentalCareStart,
      lastDentalVisit: input.lastDentalVisit,
      oralHygieneDuration: input.oralHygieneDuration,
      washTeethFrequency: input.washTeethFrequency,
      changeToothBrushFrequency: input.changeToothBrushFrequency,
      usingDentalFloss: input.usingDentalFloss,
      usingMouthWash: input.usingMouthWash,
      organizationId: ctx.organizationId,
      lat: input.lat,
      long: input.long,
      status: 'NEW',
      ...GET_DETAULT_DATES(),
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return created;
};
