import type { StaffType } from './__types';

export const generateDummyStaffData = (count: number): StaffType[] => {
  const data: StaffType[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      id: `${i}`,
      account: {
        user: {
          name: `Staff ${i}`,
          email: `staff${i}@example.com`, // staff$i@example.com',
        },
      },
      type: i % 2 === 0 ? 'DOCTOR' : 'STAFF',
      position: 'DOCTOR',
      employmentType: i % 2 === 0 ? 'FULL_TIME' : 'PART_TIME',
      lastName: 'Doe',
      firstName: 'John',
      contactNumber: '123-456-7890',
      address: '123 Main St',
      specialistsRecordId: null,
      accountId: '2',
      lat: null,
      long: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      workingDays: i % 2 === 0 ? ['M', 'T', 'TH', 'ST'] : ['S', 'W', 'F', 'ST'],
      assignedTreatment:
        i % 2 === 0 ? ['Detal Service'] : ['Detal Service', 'Oral Hygiene'],
    });
  }
  return data;
};
