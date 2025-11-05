import { protectedProcedure, router } from '@/server/trpc';
import * as archiveTreatment from './handlers/archive-treatment';
import * as createTreatment from './handlers/create-treatment';
import * as getAllTreatments from './handlers/get-all-treatments';
import * as getTotalTreatments from './handlers/get-total-treatments';
import * as getTreatment from './handlers/get-treatment';

const treatments = router({
  createTreatment: protectedProcedure
    .input(createTreatment.inputSchema)
    .mutation(createTreatment.handler),
  getAllTreatments: protectedProcedure
    .input(getAllTreatments.inputSchema)
    .query(getAllTreatments.handler),
  getTreatment: protectedProcedure
    .input(getTreatment.inputSchema)
    .query(getTreatment.handler),
  getTotalTreatments: protectedProcedure
    .input(getTotalTreatments.inputSchema)
    .query(getTotalTreatments.handler),
  archiveTreatment: protectedProcedure
    .input(archiveTreatment.inputSchema)
    .mutation(archiveTreatment.handler),
});

export default treatments;
