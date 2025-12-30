import type { DatabaseInstance } from '@/db';
import type { UpdatePatientParams } from '../../update-patient';

type UpdateData = Omit<UpdatePatientParams['input'], 'patientId'>;

export const updatePatient = async (
  db: DatabaseInstance,
  patientId: string,
  data: UpdateData,
) => {
  const updateValues: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (data.firstName !== undefined) updateValues.firstName = data.firstName;
  if (data.lastName !== undefined) updateValues.lastName = data.lastName;
  if (data.email !== undefined) updateValues.email = data.email;
  if (data.phoneNumber !== undefined)
    updateValues.phoneNumber = data.phoneNumber;
  if (data.address !== undefined) updateValues.address = data.address;
  if (data.age !== undefined) updateValues.age = data.age;
  if (data.gender !== undefined) updateValues.gender = data.gender;
  if (data.avatarId !== undefined) updateValues.avatarId = data.avatarId;
  if (data.dentalCareStart !== undefined)
    updateValues.dentalCareStart = data.dentalCareStart;
  if (data.lastDentalVisit !== undefined)
    updateValues.lastDentalVisit = data.lastDentalVisit;
  if (data.oralHygieneDuration !== undefined)
    updateValues.oralHygieneDuration = data.oralHygieneDuration;
  if (data.washTeethFrequency !== undefined)
    updateValues.washTeethFrequency = data.washTeethFrequency;
  if (data.changeToothBrushFrequency !== undefined)
    updateValues.changeToothBrushFrequency = data.changeToothBrushFrequency;
  if (data.usingDentalFloss !== undefined)
    updateValues.usingDentalFloss = data.usingDentalFloss;
  if (data.usingMouthWash !== undefined)
    updateValues.usingMouthWash = data.usingMouthWash;
  if (data.status !== undefined) updateValues.status = data.status;
  if (data.lat !== undefined) updateValues.lat = data.lat;
  if (data.long !== undefined) updateValues.long = data.long;

  await db
    .updateTable('Patient')
    .set(updateValues)
    .where('id', '=', patientId)
    .execute();
};
