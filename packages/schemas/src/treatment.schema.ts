import z from 'zod';

export const treatmentSchema = z
  .object({
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

    visits: z
      .object({
        treatmentId: z.string().or(z.null()),
        gracePeriod: z
          .number()
          .min(0, 'Grace period must be at least 0')
          .optional(),
        gracePeriodUnit: z.enum(['DAYS', 'WEEKS', 'MONTHS']).optional(),
      })
      .array()
      .optional(),
    components: z
      .object({
        id: z.string().min(1, 'Component is required'),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
        free: z.boolean().optional(),
        freeUpTo: z.number().optional(),
      })
      .array()
      .optional(),
  })
  .superRefine((data, ctx) => {
    const isMultipleVisit = data.visits && data.visits.length > 0;

    if (isMultipleVisit) {
      // If multiple visits, visits array is required and must have at least 1 visit
      if (!data.visits || data.visits.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one visit is required',
          path: ['visits'],
        });
      }
    } else {
      // If single visit, require components, price, and duration
      if (!data.components || data.components.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one component is required',
          path: ['components'],
        });
      }

      if (!data.price || data.price === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Price is required',
          path: ['price'],
        });
      }

      if (!data.duration) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Duration is required',
          path: ['duration'],
        });
      }
    }
  });

export type TreatmentFormType = z.infer<typeof treatmentSchema>;
