import { protectedProcedure, router } from '@/server/trpc';
import * as createTreatment from './handlers/create-treatment';
import * as getAllTreatments from './handlers/get-all-treatments';

const treatments = router({
  createTreatment: protectedProcedure
    .input(createTreatment.inputSchema)
    .mutation(createTreatment.handler),
  getAllTreatments: protectedProcedure
    .input(getAllTreatments.inputSchema)
    .query(getAllTreatments.handler),
});

export default treatments;
