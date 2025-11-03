# Seeder Routes

This module provides endpoints for seeding the database with dummy data for testing and development purposes.

## Available Endpoints

### 1. Seed Treatments (`seeder.seedTreatments`)

Seeds treatments (both single and multiple visits) for the organization.

**Input Schema:**
```typescript
{
  count: number;           // Number of treatments to create (1-50, default: 10)
  organizationId: string;  // Organization ID to associate treatments with
}
```

**Features:**
- Generates both MEDICAL_SERVICE and COSMETIC_SERVICE treatments
- Creates SINGLE_VISIT and MULTIPLE_VISIT treatments
- Adds 2-5 medical components per treatment
- For multiple visit treatments, creates 2-5 visit records
- Realistic treatment names and descriptions using Faker.js

**Requirements:**
- Medical components must exist in the database before seeding

---

### 2. Seed Staff (`seeder.seedStaff`)

Seeds staff members (doctors and general staff) for the organization.

**Input Schema:**
```typescript
{
  count: number;              // Number of staff to create (1-50, default: 10)
  organizationId: string;     // Organization ID
  type?: 'DOCTOR' | 'STAFF' | 'BOTH';  // Type filter (default: 'BOTH')
}
```

**Features:**
- Generates realistic staff profiles with proper positions
- Creates work schedules (4-6 days per week, Mon-Sat)
- Assigns doctors to treatments automatically
- Includes contact information, employment type, and status
- Work hours: 7-9 AM start, 4-6 PM end

**Staff Positions:**
- **Doctors:** General Dentist, Orthodontist, Periodontist, Endodontist, Oral Surgeon, etc.
- **Staff:** Dental Hygienist, Dental Assistant, Receptionist, Office Manager, etc.

---

### 3. Seed Patients (`seeder.seedPatients`)

Seeds patients with comprehensive dental profiles, plus optional reviews and ratings.

**Input Schema:**
```typescript
{
  count: number;              // Number of patients to create (1-50, default: 10)
  organizationId: string;     // Organization ID
  generateReviews?: boolean;  // Generate reviews/ratings (default: true)
  reviewsPerPatient?: number; // Max reviews per patient (0-5, default: 2)
}
```

**Features:**
- Complete dental care history and habits
- Realistic patient demographics
- Generates ratings (1.0-5.0) for treatments
- Creates detailed reviews based on rating scores
- 70% of ratings get accompanying reviews

**Generated Data:**
- Personal info (name, email, phone, address, age, gender)
- Dental care habits (brushing frequency, floss usage, etc.)
- Dental visit history
- Treatment reviews and ratings

**Requirements:**
- Treatments must exist in the database for review generation

---

## Usage Example

```typescript
// Seed 15 treatments
await trpc.seeder.seedTreatments.mutate({
  count: 15,
  organizationId: 'org-123',
});

// Seed 20 staff members (both doctors and staff)
await trpc.seeder.seedStaff.mutate({
  count: 20,
  organizationId: 'org-123',
  type: 'BOTH',
});

// Seed 30 patients with reviews
await trpc.seeder.seedPatients.mutate({
  count: 30,
  organizationId: 'org-123',
  generateReviews: true,
  reviewsPerPatient: 3,
});
```

## Recommended Seeding Order

1. **Medical Components** (manual or separate seeder)
2. **Treatments** (`seedTreatments`) - requires medical components
3. **Staff** (`seedStaff`) - can assign to treatments
4. **Patients** (`seedPatients`) - generates reviews for treatments

## Notes

- All endpoints are protected and require authentication
- Uses @faker-js/faker for realistic data generation
- Phone numbers are generated in Philippine format (+639XXXXXXXXX)
- All timestamps are randomized within reasonable ranges
- Data is organization-scoped for multi-tenancy support

## Error Handling

The seeders will throw errors if:
- Medical components don't exist when seeding treatments
- Treatments don't exist when generating reviews
- Invalid count or organizationId provided
- Database constraints are violated
