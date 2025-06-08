import { protectedProcedure, router } from '@/server/trpc';
import * as createSpecialistRecord from './handlers/create-specialist-record';
import * as getAllSpecialistRecords from './handlers/get-specialist-records';

const specialistRecord = router({
  createSpecialistRecord: protectedProcedure
    .input(createSpecialistRecord.inputSchema)
    .mutation(createSpecialistRecord.handler),
  getAllSpecialistRecords: protectedProcedure
    .input(getAllSpecialistRecords.inputSchema)
    .query(getAllSpecialistRecords.handler),
});

export default specialistRecord;
