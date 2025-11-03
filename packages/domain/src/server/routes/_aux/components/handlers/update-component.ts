import type { HandlerType } from '@/server/types';
import { z } from 'zod';

const inputSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Component name is required').optional(),
  price: z.number().min(0, 'Price must be at least 0').optional(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const { id, ...updateData } = input;

  if (!updateData.name && updateData.price === undefined) {
    return { status: 'SUCCESS' as const, message: 'No fields to update' };
  }

  const updated = await ctx.db
    .updateTable('MedicalComponent')
    .set({
      ...(updateData.name && { name: updateData.name }),
      ...(updateData.price !== undefined && { price: updateData.price }),
      updatedAt: new Date(),
    })
    .where('id', '=', id)
    .returning('id')
    .executeTakeFirstOrThrow();

  return { status: 'SUCCESS' as const, id: updated.id };
};

export { inputSchema, handler };
