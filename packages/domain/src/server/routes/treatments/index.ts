import { protectedProcedure, router } from '@/server/trpc';
import * as createTreatment from './handlers/create-treatment';
import * as getAllTreatments from './handlers/get-all-treatments';
import * as getTotalTreatments from './handlers/get-total-treatments';

const treatments = router({
  createTreatment: protectedProcedure
    .input(createTreatment.inputSchema)
    .mutation(createTreatment.handler),
  getAllTreatments: protectedProcedure
    .input(getAllTreatments.inputSchema)
    .query(getAllTreatments.handler),
  getTotalTreatments: protectedProcedure
    .input(getTotalTreatments.inputSchema)
    .query(getTotalTreatments.handler),
});

export default treatments;
