import type { HandlerType } from '@/server/types';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

const inputSchema = z.object({
  count: z.number().min(1).max(50).default(30),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const treatmentNames = {
  MEDICAL_SERVICE: [
    'Dental Filling',
    'Root Canal Treatment',
    'Tooth Extraction',
    'Dental Crown',
    'Dental Bridge',
    'Periodontal Treatment',
    'Dental Implant',
    'Wisdom Tooth Removal',
    'Dental Cleaning',
    'Fluoride Treatment',
    'Cavity Treatment',
    'Gum Disease Treatment',
    'Oral Surgery',
    'Dental Abscess Treatment',
    'TMJ Treatment',
  ],
  COSMETIC_SERVICE: [
    'Teeth Whitening',
    'Dental Veneers',
    'Invisalign Treatment',
    'Dental Bonding',
    'Smile Makeover',
    'Cosmetic Contouring',
    'Gum Contouring',
    'Porcelain Veneers',
    'Composite Veneers',
    'Teeth Reshaping',
  ],
};

const handler = async ({ input, ctx }: Params) => {
  const { count } = input;
  const createdIds: string[] = [];

  // Get existing medical components for treatment components
  const medicalComponents = await ctx.db
    .selectFrom('MedicalComponent')
    .select(['id', 'name', 'price'])
    .where('organizationId', '=', ctx.organizationId)
    .limit(20)
    .execute();

  if (medicalComponents.length === 0) {
    throw new Error(
      'No medical components found. Please seed medical components first.',
    );
  }

  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement([
      'MEDICAL_SERVICE',
      'COSMETIC_SERVICE',
    ] as const);
    const visitType = faker.helpers.arrayElement([
      'SINGLE_VISIT',
      'MULTIPLE_VISIT',
    ] as const);

    const availableNames = treatmentNames[category];
    const name = faker.helpers.arrayElement(availableNames);

    const duration = faker.helpers.arrayElement([
      0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4,
    ]);
    const pricePerDuration = faker.number.float({
      min: 500,
      max: 5000,
      fractionDigits: 2,
    });

    // Create treatment
    const treatment = await ctx.db
      .insertInto('Treatment')
      .values({
        name: `${name} - ${faker.word.adjective()}`,
        category,
        description: faker.lorem.sentences(2),
        visitType,
        duration,
        pricePerDuration,
        status: faker.helpers.arrayElement([
          'FINALIZED',
          'SAMPLE',
          'INACTIVE',
        ] as const),
        organizationId: ctx.organizationId,
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: new Date(),
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    createdIds.push(treatment.id);

    // Add treatment components (2-5 components per treatment)
    const componentCount = faker.number.int({ min: 2, max: 5 });
    const selectedComponents = faker.helpers.arrayElements(
      medicalComponents,
      componentCount,
    );

    for (const component of selectedComponents) {
      const quantity = faker.number.int({ min: 1, max: 10 });
      const isFree = faker.datatype.boolean({ probability: 0.2 }); // 20% chance of being free

      await ctx.db
        .insertInto('TreatmentComponent')
        .values({
          treatmentId: treatment.id,
          medicalComponentId: component.id,
          quantity,
          free: isFree,
          freeUpTo:
            isFree && faker.datatype.boolean()
              ? faker.number.int({ min: 1, max: 5 })
              : null,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .execute();
    }

    // If multiple visit, create visit records
    if (visitType === 'MULTIPLE_VISIT') {
      const visitCount = faker.number.int({ min: 2, max: 5 });
      for (let v = 1; v <= visitCount; v++) {
        await ctx.db
          .insertInto('TreatmentVisit')
          .values({
            treatmentId: treatment.id,
            sequence: v,
          })
          .execute();
      }
    }
  }

  return {
    status: 'SUCCESS' as const,
    message: `Successfully seeded ${count} treatments`,
    data: { createdIds, count: createdIds.length },
  };
};

export { inputSchema, handler };
