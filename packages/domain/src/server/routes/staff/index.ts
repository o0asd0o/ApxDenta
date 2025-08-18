import { protectedProcedure, publicProcedure, router } from '../../trpc';
import * as createStaff from './handlers/create-staff';
import * as getAllStaffs from './handlers/get-all-staffs';
import * as getInvitedStaff from './handlers/get-invited-staff';
import * as getStaff from './handlers/get-staff';
import * as getTotalStaffs from './handlers/get-total-staffs';
import * as tieStaffToAccount from './handlers/tie-staff-to-account';

const staffs = router({
  createStaff: protectedProcedure
    .input(createStaff.inputSchema)
    .mutation(createStaff.handler),
  getAllStaffs: protectedProcedure
    .input(getAllStaffs.inputSchema)
    .query(getAllStaffs.handler),
  getTotalStaffs: protectedProcedure
    .input(getTotalStaffs.inputSchema)
    .query(getTotalStaffs.handler),
  getStaff: protectedProcedure
    .input(getStaff.inputSchema)
    .query(getStaff.handler),
  getInvitedStaff: publicProcedure
    .input(getInvitedStaff.inputSchema)
    .query(getInvitedStaff.handler),
  tieStaffToAccount: publicProcedure
    .input(tieStaffToAccount.inputSchema)
    .mutation(tieStaffToAccount.handler),
});

export default staffs;
