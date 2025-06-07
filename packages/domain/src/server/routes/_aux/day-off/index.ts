import { protectedProcedure, router } from '@/server/trpc';
import * as createDayOff from './handlers/create-day-off';
import * as getDayOff from './handlers/get-day-off';
import * as getStaffDayOffs from './handlers/get-staff-day-offs';

const dayOff = router({
  createDayOff: protectedProcedure
    .input(createDayOff.inputSchema)
    .mutation(createDayOff.handler),
  getStaffDayOffs: protectedProcedure
    .input(getStaffDayOffs.inputSchema)
    .query(getStaffDayOffs.handler),
  getDayOff: protectedProcedure
    .input(getDayOff.inputSchema)
    .query(getDayOff.handler),
});

export default dayOff;
