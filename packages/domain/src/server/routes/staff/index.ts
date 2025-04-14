import { protectedProcedure, router } from '../../trpc';
import * as createAsset from './handlers/create-staff';
import * as getAllAssets from './handlers/get-all-staffs';
import * as getAsset from './handlers/get-staff';

const staffs = router({
  createStaff: protectedProcedure
    .input(createAsset.inputSchema)
    .mutation(createAsset.handler),
  getAllStaffs: protectedProcedure
    .input(getAllAssets.inputSchema)
    .query(getAllAssets.handler),
  getStaff: protectedProcedure
    .input(getAsset.inputSchema)
    .query(getAsset.handler),
});

export default staffs;
