import { jsonObjectFrom } from 'kysely/helpers/postgres';
import type { GetPatientParams } from '../../get-patient';

export const getPatient = async (context: GetPatientParams) => {
  const {
    ctx: { db, organizationId },
    input,
  } = context;

  const patient = await db
    .selectFrom('Patient')
    .selectAll('Patient')
    .where('Patient.id', '=', input.patientId)
    .where('Patient.organizationId', '=', organizationId)
    .select((eb) =>
      jsonObjectFrom(
        eb
          .selectFrom('File')
          .select(['File.url', 'File.id'])
          .whereRef('File.id', '=', 'Patient.avatarId'),
      ).as('avatar'),
    )
    .executeTakeFirst();

  return patient;
};
