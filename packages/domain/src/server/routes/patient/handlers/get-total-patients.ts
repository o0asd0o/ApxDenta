import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  isActive: z.boolean().optional(),
});

export type GetTotalPatientsProps = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: GetTotalPatientsProps) => {
  let query = ctx.db
    .selectFrom('Patient')
    .select(ctx.db.fn.countAll().as('count'))
    .where('Patient.organizationId', '=', ctx.organizationId);

  // Active patients: have reservations in last 6 months
  // Inactive patients: no reservations in last 6 months or never had one
  if (input.isActive !== undefined) {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    if (input.isActive) {
      query = query.where(({ exists, selectFrom }) =>
        exists(
          selectFrom('Reservation')
            .select('id')
            .whereRef('Reservation.patientId', '=', 'Patient.id')
            .where('Reservation.createdAt', '>=', sixMonthsAgo),
        ),
      );
    } else {
      query = query.where(({ not, exists, selectFrom }) =>
        not(
          exists(
            selectFrom('Reservation')
              .select('id')
              .whereRef('Reservation.patientId', '=', 'Patient.id')
              .where('Reservation.createdAt', '>=', sixMonthsAgo),
          ),
        ),
      );
    }
  }

  const result = await query.executeTakeFirst();

  return {
    status: 'SUCCESS' as const,
    data: {
      count: Number(result?.count || 0),
    },
  };
};

export { inputSchema, handler };
