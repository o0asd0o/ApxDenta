import s3Client from '@/server/common/lib/s3-client';
import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.instanceof(FormData);

type Params = HandlerType<z.infer<typeof inputSchema>>;

type FormDataType = Partial<{
  file: File;
  name: string;
  type: string;
  size: number;
}>;

const handler = async ({ input, ctx }: Params) => {
  const formData = {} as Record<string, FormDataType>;
  for (const [key, value] of input.entries()) {
    if ((value as unknown) instanceof File) {
      const file = value as unknown as File;
      formData[key] = {
        name: file.name,
        type: file.type,
        size: file.size,
        file: file,
      };
    }
  }

  const name = formData?.file?.name as string;
  const mimetype = formData?.file?.type as string;
  const fileSize = formData?.file?.size as number;
  const arrayBuffer = await (formData?.file?.file as File).arrayBuffer();

  const buffer = Buffer.from(arrayBuffer);

  const randomName = crypto.randomUUID();

  await s3Client.uploadFile(buffer, randomName, mimetype);

  const file = await ctx.db
    .insertInto('File')
    .values({
      name,
      url: randomName,
      type: mimetype,
      size: fileSize,
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return {
    status: 'SUCCESS' as const,
    data: { fileName: name, fileUrl: randomName, id: file.id },
  };
};

export { inputSchema, handler };
