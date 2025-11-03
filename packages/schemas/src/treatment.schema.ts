import z from 'zod';

export const treatmentSchema = z.object({
  treatmentName: z.string({ required_error: 'Treatment name is required' }),
  category: z.enum(['COSMETIC', 'MEDICAL'], {
    required_error: 'Treatment category is required',
  }),
  visitType: z.enum(['SINGLE', 'MULTIPLE'], {
    required_error: 'Visit type is required',
  }),
  description: z.string({ required_error: 'Description is required' }),
  price: z.number().min(0, 'Price must be at least 0').optional(),
  duration: z
    .number()
    .min(0.5, 'Duration must be at least 30 minutes')
    .optional(),

  components: z
    .object({
      id: z.string(),
      quantity: z.number().min(1, 'Quantity must be at least 1'),
      free: z.boolean().optional(),
      freeUpTo: z.number().optional(),
    })
    .array()
    .min(1, 'At least one component is required'),
});

export type TreatmentFormType = z.infer<typeof treatmentSchema>;
