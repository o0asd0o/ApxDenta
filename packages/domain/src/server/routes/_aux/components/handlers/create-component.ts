import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  name: z.string().min(1, 'Component name is required'),
  price: z.number().min(0, 'Price must be at least 0'),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const created = await ctx.db
    .insertInto('MedicalComponent')
    .values({
      name: input.name,
      price: input.price,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning('id')
    .executeTakeFirstOrThrow();

  return { status: 'SUCCESS' as const, id: created.id };
};

export { inputSchema, handler };
