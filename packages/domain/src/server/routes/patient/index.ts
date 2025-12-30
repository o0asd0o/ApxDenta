import { protectedProcedure, router } from '../../trpc';
import * as createPatient from './handlers/create-patient';
import * as deletePatient from './handlers/delete-patient';
import * as getAllPatients from './handlers/get-all-patients';
import * as getPatient from './handlers/get-patient';
import * as getTotalPatients from './handlers/get-total-patients';
import * as updatePatient from './handlers/update-patient';

const patients = router({
  createPatient: protectedProcedure
    .input(createPatient.inputSchema)
    .mutation(createPatient.handler),
  updatePatient: protectedProcedure
    .input(updatePatient.inputSchema)
    .mutation(updatePatient.handler),
  deletePatient: protectedProcedure
    .input(deletePatient.inputSchema)
    .mutation(deletePatient.handler),
  getPatient: protectedProcedure
    .input(getPatient.inputSchema)
    .query(getPatient.handler),
  getAllPatients: protectedProcedure
    .input(getAllPatients.inputSchema)
    .query(getAllPatients.handler),
  getTotalPatients: protectedProcedure
    .input(getTotalPatients.inputSchema)
    .query(getTotalPatients.handler),
});

export default patients;
