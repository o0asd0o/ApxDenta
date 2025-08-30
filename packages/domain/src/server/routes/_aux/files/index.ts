import { protectedProcedure, router } from '@/server/trpc';
import * as deleteFile from './handlers/delete-file';
import * as uploadFile from './handlers/upload-file';

const files = router({
  uploadFile: protectedProcedure
    .input(uploadFile.inputSchema)
    .mutation(uploadFile.handler),
  deleteFile: protectedProcedure
    .input(deleteFile.inputSchema)
    .mutation(deleteFile.handler),
});

export default files;
