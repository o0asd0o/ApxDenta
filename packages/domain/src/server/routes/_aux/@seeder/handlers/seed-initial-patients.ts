import type { HandlerType } from '@/server/types';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

const inputSchema = z.object({
  count: z.number().min(1).max(50).default(10),
  organizationId: z.string(),
  generateReviews: z.boolean().default(true),
  reviewsPerPatient: z.number().min(0).max(5).default(2),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const handler = async ({ input, ctx }: Params) => {
  const { count, generateReviews, reviewsPerPatient } = input;
  const createdPatientIds: string[] = [];
  const createdReviewIds: string[] = [];
  const createdRatingIds: string[] = [];

  // Get available treatments for reviews/ratings
  const treatments = await ctx.db
    .selectFrom('Treatment')
    .select('id')
    .where('organizationId', '=', ctx.organizationId)
    .execute();

  if (treatments.length === 0 && generateReviews) {
    throw new Error('No treatments found. Please seed treatments first.');
  }

  for (let i = 0; i < count; i++) {
    const gender = faker.person.sex() as 'male' | 'female';
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const phoneNumber = `+639${faker.string.numeric(9)}`;

    // Create patient with comprehensive dental profile
    const patient = await ctx.db
      .insertInto('Patient')
      .values({
        firstName,
        lastName,
        email,
        phoneNumber,
        address: faker.location.streetAddress(true),
        age: faker.number.int({ min: 18, max: 75 }),
        gender: gender === 'male' ? 'MALE' : 'FEMALE',

        // Dental care habits
        dentalCareStart: faker.helpers.arrayElement([
          'TEENAGER',
          'ABOUT_20',
          'ABOUT_30',
          'AFTER_30',
        ] as const),
        lastDentalVisit: faker.helpers.arrayElement([
          'LESS_THAN_3_MONTHS',
          'LESS_THAN_6_MONTHS',
          'A_YEAR_AGO',
          'DONT_REMEMBER',
        ] as const),
        oralHygieneDuration: faker.helpers.arrayElement([
          'AROUND_1_MINUTE',
          'ABOUNT_2_MINUTES',
          'MORE_THAN_2_MINUTES',
          'I_DONT_KNOW',
        ] as const),
        washTeethFrequency: faker.helpers.arrayElement([
          'ONCE',
          'TWICE',
          'THRICE',
          'MORE_THAN_THRICE',
        ] as const),
        changeToothBrushFrequency: faker.helpers.arrayElement([
          'EVERY_3_MONTHS',
          'EVERY_6_MONTHS',
          'EVERY_YEAR',
          'AS_OCCUR',
        ] as const),
        usingDentalFloss: faker.datatype.boolean(),
        organizationId: ctx.organizationId,
        createdAt: faker.date.past({ years: 3 }),
        updatedAt: new Date(),
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    createdPatientIds.push(patient.id);

    // Generate reviews and ratings if enabled
    if (generateReviews && treatments.length > 0) {
      const reviewCount = faker.number.int({ min: 0, max: reviewsPerPatient });

      const selectedTreatments = faker.helpers.arrayElements(
        treatments,
        Math.min(reviewCount, treatments.length),
      );

      for (const treatment of selectedTreatments) {
        // Create rating
        const rate = faker.number.float({ min: 1, max: 5, fractionDigits: 1 });
        const rating = await ctx.db
          .insertInto('Rating')
          .values({
            treatmentId: treatment.id,
            rate,
            remark: faker.helpers.arrayElement([
              'Excellent service!',
              'Very satisfied with the results',
              'Professional and caring staff',
              'Highly recommend',
              'Great experience overall',
              'Pain-free procedure',
              'Worth every penny',
              'Could be better',
              'Average experience',
              null,
            ]),
            createdAt: faker.date.past({ years: 1 }),
          })
          .returning('id')
          .executeTakeFirstOrThrow();

        createdRatingIds.push(rating.id);

        // Create review (70% chance)
        if (faker.datatype.boolean({ probability: 0.7 })) {
          const positiveReviews = [
            'The treatment was excellent. The dentist was very professional and explained everything clearly.',
            'I was nervous at first, but the staff made me feel comfortable. Great results!',
            'Highly recommend this treatment. Very happy with the outcome.',
            'The procedure was quick and painless. The team is very skilled.',
            "Best dental experience I've had. The facilities are modern and clean.",
            'Amazing service from start to finish. Will definitely come back.',
            "Professional, efficient, and caring. Couldn't ask for more.",
            'The treatment exceeded my expectations. Very pleased with the results.',
          ];

          const neutralReviews = [
            'The treatment was okay. It did what it was supposed to do.',
            'Average experience. Nothing special but got the job done.',
            'Decent service. The wait time was a bit long though.',
            'It was fine. Met my expectations.',
          ];

          const reviews =
            rate >= 4
              ? positiveReviews
              : rate >= 3
                ? [...positiveReviews, ...neutralReviews]
                : neutralReviews;

          const review = await ctx.db
            .insertInto('Review')
            .values({
              treatmentId: treatment.id,
              description: faker.helpers.arrayElement(reviews),
              createdAt: faker.date.past({ years: 1 }),
              updatedAt: new Date(),
            })
            .returning('id')
            .executeTakeFirstOrThrow();

          createdReviewIds.push(review.id);
        }
      }
    }
  }

  return {
    status: 'SUCCESS' as const,
    message: `Successfully seeded ${count} patients with ${createdReviewIds.length} reviews and ${createdRatingIds.length} ratings`,
    data: {
      patients: {
        createdIds: createdPatientIds,
        count: createdPatientIds.length,
      },
      reviews: { createdIds: createdReviewIds, count: createdReviewIds.length },
      ratings: { createdIds: createdRatingIds, count: createdRatingIds.length },
    },
  };
};

export { inputSchema, handler };
