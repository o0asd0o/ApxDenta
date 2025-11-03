import { StackDialogDrawer } from '@/components/dialog/stacked/StackDialogDrawer';
import StackProvider from '@/components/dialog/stacked/StackProvider';
import { useActiveOrganization } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TreatmentFormType, treatmentSchema } from '@repo/schemas';
import { Button, Form } from '@repo/ui/components';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import MultipleVisitForm from './forms/MultipleVisitForm';
import TreatmentBaseForm from './forms/TreatmentBaseForm';

const GetSacks = (form: UseFormReturn<TreatmentFormType>) => [
  {
    id: 'treatment-form-1',
    component: <TreatmentBaseForm form={form} />,
    title: 'Add Treatment',
  },
  {
    id: 'treatment-form-2',
    component: <MultipleVisitForm form={form} />,
    title: 'Set Multiple Visits',
  },
];

/**
 * TODO:
 * 1. Refactor the form
 * 2. Integrate multiple visit form
 * 3. Integrate API for actual creation of treatment
 * 4. Implement other fetaures - update, delete, bulk delete
 * 5. Implement Seeder for every empty main records
 */

const CreateTreatment: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      components: [{ id: '', quantity: 1, free: false, freeUpTo: 0 }],
      visitType: 'SINGLE',
    },
  });
  const { data: activeOrg } = useActiveOrganization();

  const stocks = GetSacks(form);

  return (
    <Form {...form}>
      <StackProvider stackCount={stocks.length}>
        <StackDialogDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          className="ml-auto"
          actionText="Add Treatment"
          disabledTooltip={
            !activeOrg ? 'You need to setup an organization first' : undefined
          }
          mobileIcon={<PlusIcon className="size-5" />}
          onSubmit={form.handleSubmit(
            (values) => {
              console.log('values', values);
            },
            (err) => {
              console.log({ err });
            },
          )}
          stacks={stocks}
          footer={
            <Button
              type="submit"
              variant="primary"
              className="w-[120px]"
              loadingText="Saving..."
            >
              Save
            </Button>
          }
        />
      </StackProvider>
    </Form>
  );
};

export default CreateTreatment;
