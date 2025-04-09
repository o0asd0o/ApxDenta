import { protected_, router } from '@/common/trpc/trpc';
import * as createAsset from './handlers/create-assets';
import * as getAllAssets from './handlers/get-all-assets';
import * as getAsset from './handlers/get-asset';

const assets = router({
  createAsset: protected_
    .input(createAsset.inputSchema)
    .mutation(createAsset.handler),
  getAllAssets: protected_
    .input(getAllAssets.inputSchema)
    .query(getAllAssets.handler),
  getAsset: protected_.input(getAsset.inputSchema).query(getAsset.handler),
});

export default assets;
