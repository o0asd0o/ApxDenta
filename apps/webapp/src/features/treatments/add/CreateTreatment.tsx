import TreatmentSeeder from '@/components/@seeders/TreatmentSeeder';
import { StackDialogDrawer } from '@/components/dialog/stacked/StackDialogDrawer';
import StackProvider from '@/components/dialog/stacked/StackProvider';
import { useActiveOrganization } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TreatmentFormType, treatmentSchema } from '@repo/schemas';
import { Form } from '@repo/ui/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import CreateTreamentFooter from '../components/CreateTreamentFooter';
import MultipleVisitForm from './forms/MultipleVisitForm';
import TreatmentBaseForm from './forms/TreatmentBaseForm';

/**
 * TODO:
 * 1. Refactor the form (DONE)
 * 2. Integrate multiple visit form (DONE)
 * 3. Integrate API for actual creation of treatment (DONE)
 *    a. See details for visit item
 *    b. handle computed price and duration for multiple visit
 * 4. Implement other fetaures - update, delete, bulk delete
 * 5. Implement Seeder for every empty main records
 */

const GET_TREATMENT_FORM_STACKS = (form: UseFormReturn<TreatmentFormType>) => [
  {
    id: 'treatment-form-1',
    component: <TreatmentBaseForm form={form} />,
    title: (
      <span className="flex items-center">
        <span>Add Treatment</span>
        <TreatmentSeeder />
      </span>
    ),
  },
  {
    id: 'treatment-form-2',
    component: <MultipleVisitForm form={form} />,
    title: 'Set Multiple Visits',
  },
];

const CreateTreatment: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(treatmentSchema),
    defaultValues: {
      components: [{ id: '', quantity: 1, free: false, freeUpTo: 0 }],
      visitType: 'SINGLE',
    },
  });

  const { data: activeOrg } = useActiveOrganization();

  const stacks = GET_TREATMENT_FORM_STACKS(form);

  const { mutate: createTreatment, isPending } = useMutation(
    trpc.treatments.createTreatment.mutationOptions({
      onSuccess: () => {
        toast.success('Treatment created successfully');
        queryClient.invalidateQueries({
          queryKey: trpc.treatments.getAllTreatments.queryKey(),
        });
        queryClient.invalidateQueries({
          queryKey: trpc.treatments.getTotalTreatments.queryKey(),
        });
        form.reset();
      },
      onError: (error) => {
        toast.error(
          `Failed to create treatment: ${error.message || 'Unknown error'}`,
        );
      },
      onSettled: () => {
        setDrawerOpen(false);
      },
    }),
  );

  return (
    <Form {...form}>
      <StackProvider stackCount={stacks.length}>
        <StackDialogDrawer
          open={drawerOpen}
          setOpen={setDrawerOpen}
          className="ml-auto"
          actionText="Add Treatment"
          disabledTooltip={
            !activeOrg ? 'You need to setup an organization first' : undefined
          }
          mobileIcon={<PlusIcon className="size-5" />}
          onSubmit={(event, currentIndex) => {
            if (currentIndex === 0) {
              return form.handleSubmit(
                (values) => {
                  createTreatment({
                    category: `${values.category}_SERVICE`,
                    name: values.treatmentName,
                    description: values.description,
                    pricePerduration: values.price || 1,
                    duration: values.duration || 1,
                    components: values.components?.map((component) => ({
                      quantity: component.quantity,
                      medicalComponentId: component.id,
                      free: component.free,
                      freeUpTo: component.freeUpTo,
                    })),
                    status: 'FINALIZED',
                    visitType:
                      (values.visits?.length || 0) === 0
                        ? 'SINGLE_VISIT'
                        : 'MULTIPLE_VISIT',
                    unit: 'PER_JAW',
                    visits: values.visits
                      ?.filter((item) => !!item.treatmentId)
                      ?.map((item) => ({
                        treatmentId: (item.treatmentId as string).split(
                          '--',
                        )[0] as string,
                        gracePeriod: item.gracePeriod,
                        gracePeriodUnit: item.gracePeriodUnit,
                      })),
                  });
                },
                (err) => console.log({ err }),
              )(event);
            }
          }}
          stacks={stacks}
          footer={<CreateTreamentFooter form={form} loading={isPending} />}
        />
      </StackProvider>
    </Form>
  );
};

export default CreateTreatment;
