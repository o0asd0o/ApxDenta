import { protectedProcedure, router } from '@/server/trpc';
import * as uploadFile from './handlers/upload-file';

const files = router({
  uploadFile: protectedProcedure
    .input(uploadFile.inputSchema)
    .mutation(uploadFile.handler),
});

export default files;
