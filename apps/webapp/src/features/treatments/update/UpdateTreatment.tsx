import TreatmentSeeder from '@/components/@seeders/TreatmentSeeder';
import { StackDialogDrawer } from '@/components/dialog/stacked/StackDialogDrawer';
import StackProvider from '@/components/dialog/stacked/StackProvider';
import { useActiveOrganization } from '@/lib/auth-client';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import { type TreatmentFormType, treatmentSchema } from '@repo/schemas';
import { Form } from '@repo/ui/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import React, { useEffect } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  useUpdateModalVisibility,
  useUpdateTreatmentId,
} from '../__common/context/context';
import MultipleVisitForm from '../add/forms/MultipleVisitForm';
import TreatmentBaseForm from '../add/forms/TreatmentBaseForm';
import CreateTreamentFooter from '../components/CreateTreamentFooter';

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

// TODO:
// handle update treatment
// implement MAPS for addresses
// implement viewing of treatments
// implement patients page

const UpdateTreatment: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useUpdateModalVisibility();

  const trpc = useTRPC();
  const directTrpc = useTRPCClient();
  const queryClient = useQueryClient();

  const treatmentId = useUpdateTreatmentId();

  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(treatmentSchema),
    defaultValues: async () => {
      const treatment = await directTrpc.treatments.getTreatment.query({
        id: treatmentId as string,
      });

      console.log({ treatment });

      return Promise.resolve({
        visitType: treatment.data.visitType,
        category: treatment.data.category,
        treatmentName: treatment.data.name,
        description: treatment.data.description,
        duration: treatment.data.duration,
        price: treatment.data.pricePerDuration,
        visits:
          treatment.data.visitType === 'MULTIPLE_VISIT'
            ? treatment.data.visits?.map((visit) => ({
                visitId: visit.id,
                treatmentId: `${visit.visitTreatment?.id}--${visit.visitTreatment?.name}`,
                gracePeriod: visit.gracePeriod || undefined,
                gracePeriodUnit: visit.gracePeriodUnit || undefined,
              }))
            : [],
        components:
          treatment.data.visitType === 'SINGLE_VISIT'
            ? treatment.data.components?.map((component) => ({
                componentId: component.id,
                id: component.medicalComponentId,
                quantity: component.quantity,
                free: component.free || false,
                freeUpTo: component.freeUpTo || 0,
              }))
            : [],
      });
    },
  });

  useEffect(() => {
    if (drawerOpen && treatmentId) {
      (async () => {
        const treatment = await directTrpc.treatments.getTreatment.query({
          id: treatmentId as string,
        });

        form.reset({
          visitType: treatment.data.visitType,
          category: treatment.data.category,
          treatmentName: treatment.data.name,
          description: treatment.data.description,
          duration: treatment.data.duration,
          price: treatment.data.pricePerDuration,
          visits:
            treatment.data.visitType === 'MULTIPLE_VISIT'
              ? treatment.data.visits?.map((visit) => ({
                  visitId: visit.id,
                  treatmentId: `${visit.visitTreatment?.id}--${visit.visitTreatment?.name}`,
                  gracePeriod: visit.gracePeriod || undefined,
                  gracePeriodUnit: visit.gracePeriodUnit || undefined,
                }))
              : [],
          components:
            treatment.data.visitType === 'SINGLE_VISIT'
              ? treatment.data.components?.map((component) => ({
                  componentId: component.id,
                  id: component.medicalComponentId,
                  quantity: component.quantity,
                  free: component.free || false,
                  freeUpTo: component.freeUpTo || 0,
                }))
              : [],
        });
      })();
    }
  }, [drawerOpen, treatmentId, form, directTrpc]);

  const { data: activeOrg } = useActiveOrganization();

  const stacks = GET_TREATMENT_FORM_STACKS(form);

  const { mutate: updateTreatment, isPending } = useMutation(
    trpc.treatments.updateTreatment.mutationOptions({
      onSuccess: async () => {
        toast.success('Treatment updated successfully');
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: trpc.treatments.getAllTreatments.queryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: trpc.treatments.getTotalTreatments.queryKey(),
          }),
          queryClient.invalidateQueries({ queryKey: ['treatmentList'] }),
        ]);

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
          disabledTooltip={
            !activeOrg ? 'You need to setup an organization first' : undefined
          }
          mobileIcon={<PlusIcon className="size-5" />}
          onSubmit={(event, currentIndex) => {
            if (currentIndex === 0) {
              return form.handleSubmit(
                (values) => {
                  updateTreatment({
                    id: treatmentId as string,
                    category: values.category,
                    name: values.treatmentName,
                    description: values.description,
                    pricePerduration: values.price || 1,
                    duration: values.duration || 1,
                    components: values.components?.map((component) => ({
                      id: component.componentId,
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
                        id: item.visitId,
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

export default UpdateTreatment;
