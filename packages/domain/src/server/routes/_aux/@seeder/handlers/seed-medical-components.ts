import type { HandlerType } from '@/server/types';
import { faker } from '@faker-js/faker';
import { z } from 'zod';

const inputSchema = z.object({
  count: z.number().min(1).max(100).default(20),
  organizationId: z.string(),
});

type Params = HandlerType<z.infer<typeof inputSchema>>;

const componentCategories = {
  anesthesia: [
    'Lidocaine 2%',
    'Articaine 4%',
    'Mepivacaine 3%',
    'Prilocaine 4%',
    'Bupivacaine 0.5%',
  ],
  restorative: [
    'Composite Resin',
    'Glass Ionomer Cement',
    'Amalgam Alloy',
    'Dental Bonding Agent',
    'Temporary Filling Material',
    'Flowable Composite',
  ],
  endodontic: [
    'Gutta-Percha Points',
    'Endodontic Sealer',
    'Root Canal Files',
    'Calcium Hydroxide',
    'EDTA Solution',
    'Sodium Hypochlorite',
  ],
  periodontal: [
    'Scaling Solution',
    'Periodontal Dressing',
    'Chlorhexidine Gel',
    'Antibacterial Mouthwash',
  ],
  prosthetic: [
    'Dental Cement',
    'Crown Material',
    'Bridge Material',
    'Denture Base Resin',
    'Impression Material',
    'Bite Registration Material',
  ],
  surgical: [
    'Surgical Sutures',
    'Hemostatic Agent',
    'Bone Graft Material',
    'Membrane Barrier',
    'Surgical Gauze',
  ],
  preventive: [
    'Fluoride Varnish',
    'Dental Sealant',
    'Prophy Paste',
    'Disclosing Solution',
  ],
  cosmetic: [
    'Teeth Whitening Gel',
    'Veneer Cement',
    'Polishing Strips',
    'Whitening Trays',
  ],
  orthodontic: [
    'Orthodontic Brackets',
    'Archwire',
    'Elastic Ligatures',
    'Bonding Adhesive',
    'Separator Elastics',
  ],
  medicaments: [
    'Antibiotic Paste',
    'Analgesic Gel',
    'Anti-inflammatory Gel',
    'Desensitizing Agent',
  ],
};

const handler = async ({ input, ctx }: Params) => {
  const { count, organizationId } = input;
  const createdIds: string[] = [];

  // Flatten all component names
  const allComponents = Object.values(componentCategories).flat();

  // Shuffle and take the required count
  const selectedComponents = faker.helpers
    .shuffle(allComponents)
    .slice(0, count);

  for (const componentName of selectedComponents) {
    // Price varies based on component type
    let basePrice: number;

    if (
      componentName.includes('Whitening') ||
      componentName.includes('Veneer')
    ) {
      basePrice = faker.number.float({
        min: 500,
        max: 2000,
        fractionDigits: 2,
      });
    } else if (
      componentName.includes('Graft') ||
      componentName.includes('Implant')
    ) {
      basePrice = faker.number.float({
        min: 1000,
        max: 5000,
        fractionDigits: 2,
      });
    } else if (
      componentName.includes('Crown') ||
      componentName.includes('Bridge')
    ) {
      basePrice = faker.number.float({
        min: 800,
        max: 3000,
        fractionDigits: 2,
      });
    } else if (
      componentName.includes('Sutures') ||
      componentName.includes('Gauze')
    ) {
      basePrice = faker.number.float({ min: 50, max: 200, fractionDigits: 2 });
    } else {
      basePrice = faker.number.float({ min: 100, max: 800, fractionDigits: 2 });
    }

    const component = await ctx.db
      .insertInto('MedicalComponent')
      .values({
        name: componentName,
        price: basePrice,
        organizationId,
        createdAt: faker.date.past({ years: 1 }),
        updatedAt: new Date(),
      })
      .returning('id')
      .executeTakeFirstOrThrow();

    createdIds.push(component.id);
  }

  return {
    status: 'SUCCESS' as const,
    message: `Successfully seeded ${count} medical components`,
    data: { createdIds, count: createdIds.length },
  };
};

export { inputSchema, handler };
