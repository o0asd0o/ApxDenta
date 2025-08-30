import s3Client from '@/server/common/lib/s3-client';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  fileId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  await Promise.all([
    s3Client.deleteFile(input.fileId),
    ctx.db
      .deleteFrom('File')
      .where('id', '=', input.fileId)
      .executeTakeFirstOrThrow(),
  ]);

  return {
    status: 'SUCCESS' as const,
    data: null,
  };
};

export { inputSchema, handler };
