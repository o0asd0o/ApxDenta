import { protectedProcedure, router } from '@/server/trpc';
import * as seedPatients from './handlers/seed-initial-patients';
import * as seedStaff from './handlers/seed-initial-staff';
import * as seedTreatments from './handlers/seed-initial-treatments';
import * as seedMedicalComponents from './handlers/seed-medical-components';

const seeder = router({
  seedMedicalComponents: protectedProcedure
    .input(seedMedicalComponents.inputSchema)
    .mutation(seedMedicalComponents.handler),
  seedTreatments: protectedProcedure
    .input(seedTreatments.inputSchema)
    .mutation(seedTreatments.handler),
  seedStaff: protectedProcedure
    .input(seedStaff.inputSchema)
    .mutation(seedStaff.handler),
  seedPatients: protectedProcedure
    .input(seedPatients.inputSchema)
    .mutation(seedPatients.handler),
});

export default seeder;
