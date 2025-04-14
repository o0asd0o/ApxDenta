import { protectedProcedure, router } from '../../trpc';
import * as createAsset from './handlers/create-assets';
import * as getAllAssets from './handlers/get-all-assets';
import * as getAsset from './handlers/get-asset';

const assets = router({
  createAsset: protectedProcedure
    .input(createAsset.inputSchema)
    .mutation(createAsset.handler),
  getAllAssets: protectedProcedure
    .input(getAllAssets.inputSchema)
    .query(getAllAssets.handler),
  getAsset: protectedProcedure
    .input(getAsset.inputSchema)
    .query(getAsset.handler),
});

export default assets;
