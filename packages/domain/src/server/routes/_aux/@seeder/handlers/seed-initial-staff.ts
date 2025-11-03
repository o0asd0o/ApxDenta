import type { HandlerType } from '@/server/types';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

const inputSchema = z.object({
  count: z.number().min(1).max(50).default(10),
  organizationId: z.string(),
  type: z.enum(['DOCTOR', 'STAFF', 'BOTH']).optional().default('BOTH'),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const doctorPositions = [
  'General Dentist',
  'Orthodontist',
  'Periodontist',
  'Endodontist',
  'Oral Surgeon',
  'Prosthodontist',
  'Pediatric Dentist',
  'Cosmetic Dentist',
];

const staffPositions = [
  'Dental Hygienist',
  'Dental Assistant',
  'Receptionist',
  'Office Manager',
  'Dental Technician',
  'Practice Manager',
  'Billing Specialist',
  'Dental Nurse',
];

const handler = async ({ input, ctx }: Params) => {
  const { count, organizationId, type } = input;
  const createdIds: string[] = [];

  for (let i = 0; i < count; i++) {
    const gender = faker.person.sex() as 'male' | 'female';
    const firstName = faker.person.firstName(gender);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName }).toLowerCase();
    const contactNumber = `+639${faker.string.numeric(9)}`;

    let staffType: 'DOCTOR' | 'STAFF';
    let position: string;

    if (type === 'BOTH') {
      staffType = faker.helpers.arrayElement(['DOCTOR', 'STAFF'] as const);
    } else if (type === 'DOCTOR') {
      staffType = 'DOCTOR';
    } else {
      staffType = 'STAFF';
    }

    if (staffType === 'DOCTOR') {
      position = faker.helpers.arrayElement(doctorPositions);
    } else {
      position = faker.helpers.arrayElement(staffPositions);
    }

    const employmentType = faker.helpers.arrayElement([
      'FULL_TIME',
      'PART_TIME',
    ] as const);
    const status = faker.helpers.arrayElement([
      'ACTIVE',
      'INACTIVE',
      'EXPIRED',
      'TERMINATED',
      'RESIGNED',
      'SUSPENDED',
    ] as const);

    // Create staff
    const staff = await ctx.db
      .insertInto('Staff')
      .values({
        type: staffType,
        firstName,
        lastName,
        email,
        contactNumber,
        address: faker.location.streetAddress(true),
        position,
        employmentType,
        status,
        organizationId,
        createdAt: faker.date.past({ years: 2 }),
        updatedAt: new Date(),
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    createdIds.push(staff.id);

    // Create work schedules (Mon-Sat)
    const workDays: Array<
      'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY'
    > = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

    // Randomly select 4-6 working days
    const selectedDays = faker.helpers.arrayElements(
      workDays,
      faker.number.int({ min: 4, max: 6 }),
    );

    for (const day of selectedDays) {
      const startHour = faker.number.int({ min: 7, max: 9 });
      const endHour = faker.number.int({ min: 16, max: 18 });

      // Create time objects (using arbitrary dates, only time matters)
      const fromTime = new Date();
      fromTime.setHours(startHour, 0, 0, 0);

      const toTime = new Date();
      toTime.setHours(endHour, 0, 0, 0);

      await ctx.db
        .insertInto('WorkSchedule')
        .values({
          staffId: staff.id,
          day,
          from: fromTime,
          to: toTime,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .execute();
    }

    // Assign to some treatments if doctor
    if (staffType === 'DOCTOR') {
      const treatments = await ctx.db
        .selectFrom('Treatment')
        .select('id')
        .where('organizationId', '=', organizationId)
        .limit(faker.number.int({ min: 3, max: 10 }))
        .execute();

      if (treatments.length > 0) {
        const selectedTreatments = faker.helpers.arrayElements(
          treatments,
          Math.min(treatments.length, faker.number.int({ min: 2, max: 5 })),
        );

        for (const treatment of selectedTreatments) {
          // Insert into the many-to-many relationship table
          await ctx.db
            .insertInto('_StaffAssignedTreatment')
            .values({
              A: staff.id,
              B: treatment.id,
            })
            .execute();
        }
      }
    }
  }

  return {
    status: 'SUCCESS' as const,
    message: `Successfully seeded ${count} staff members`,
    data: { createdIds, count: createdIds.length },
  };
};

export { inputSchema, handler };
