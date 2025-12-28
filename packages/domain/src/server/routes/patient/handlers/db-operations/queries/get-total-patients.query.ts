import type { GetTotalPatientsProps } from '../../get-total-patients';

export const getTotalPatients = async (context: GetTotalPatientsProps) => {
  const {
    ctx: { db, organizationId },
    input: { isActive },
  } = context;

  let query = db
    .selectFrom('Patient')
    .select(db.fn.countAll().as('count'))
    .where('Patient.organizationId', '=', organizationId);

  // Active patients: have reservations in last 6 months
  // Inactive patients: no reservations in last 6 months or never had one

  if (isActive !== undefined) {
    query = query.where(
      'Patient.status',
      'in',
      isActive ? ['ACTIVE', 'NEW'] : ['INACTIVE'],
    );
  }

  const result = await query.executeTakeFirst();

  return {
    count: Number(result?.count || 0),
  };
};
