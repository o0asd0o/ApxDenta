import { protectedProcedure, router } from '../../trpc';
import * as getAllPatients from './handlers/get-all-patients';
import * as getTotalPatients from './handlers/get-total-patients';

const patients = router({
  getAllPatients: protectedProcedure
    .input(getAllPatients.inputSchema)
    .query(getAllPatients.handler),
  getTotalPatients: protectedProcedure
    .input(getTotalPatients.inputSchema)
    .query(getTotalPatients.handler),
});

export default patients;
