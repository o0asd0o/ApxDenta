import { protectedProcedure, router } from '../../trpc';
import * as createReserveration from './handlers/create-reservation';
import * as getAllReservations from './handlers/get-all-reservations';
import * as getReservation from './handlers/get-reservation';

const reserverations = router({
  createStaff: protectedProcedure
    .input(createReserveration.inputSchema)
    .mutation(createReserveration.handler),
  getAllStaffs: protectedProcedure
    .input(getAllReservations.inputSchema)
    .query(getAllReservations.handler),
  getStaff: protectedProcedure
    .input(getReservation.inputSchema)
    .query(getReservation.handler),
});

export default reserverations;
