import { protectedProcedure, router } from '@/server/trpc';
import * as archiveTreatment from './handlers/archive-treatments';
import * as createTreatment from './handlers/create-treatment';
import * as duplicateTreatment from './handlers/duplicate-treatment';
import * as getAllTreatments from './handlers/get-all-treatments';
import * as getTotalTreatments from './handlers/get-total-treatments';
import * as getTreatment from './handlers/get-treatment';
import * as getTreatmentRatings from './handlers/get-treatment-ratings';
import * as getTreatmentReviews from './handlers/get-treatment-reviews';
import * as updateTreatment from './handlers/update-treatment';

const treatments = router({
  createTreatment: protectedProcedure
    .input(createTreatment.inputSchema)
    .mutation(createTreatment.handler),
  updateTreatment: protectedProcedure
    .input(updateTreatment.inputSchema)
    .mutation(updateTreatment.handler),
  duplicateTreatment: protectedProcedure
    .input(duplicateTreatment.inputSchema)
    .mutation(duplicateTreatment.handler),
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
  getTreatmentRatings: protectedProcedure
    .input(getTreatmentRatings.inputSchema)
    .query(getTreatmentRatings.handler),
  getTreatmentReviews: protectedProcedure
    .input(getTreatmentReviews.inputSchema)
    .query(getTreatmentReviews.handler),
});

export default treatments;
