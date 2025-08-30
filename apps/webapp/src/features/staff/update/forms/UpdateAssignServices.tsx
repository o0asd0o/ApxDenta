import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AssignedServicesFormType,
  assignedServicesSchema,
} from '@repo/schemas';
import {
  Button,
  Form,
  Loader,
  SheetClose,
  SheetFooter,
} from '@repo/ui/components';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { invalidateStaffList } from '../../__common/queries';
import { AssignedServicesForm } from '../../add/forms/AssignedServicesForm';
import { useUpdateStaffId } from '../context/context';

type Props = {
  onSubmitted: () => void;
};
const UpdateStaffInfo: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(assignedServicesSchema.partial()),
    defaultValues: async () => {
      const staffServices = await directTrpc.staffs.getStaffServices.query({
        id: staffId as string,
      });

      return {
        cosmeticServices:
          staffServices.data.assignedServices
            .filter((service) => service.category === 'COSMETIC_SERVICE')
            .map((item) => item.id) || [],
        treatmentService:
          staffServices.data.assignedServices
            .filter((service) => service.category === 'MEDICAL_SERVICE')
            .map((item) => item.id) || [],
      } satisfies Partial<AssignedServicesFormType>;
    },
  });

  const trpc = useTRPC();

  const { mutate: updateStaffInfo, isPending } = useMutation(
    trpc.staffs.updateStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        onSubmitted();
      },
    }),
  );

  if (form.formState.isLoading) {
    return (
      <Loader className="[&>svg]:size-[50px] [&>svg]:text-gray-300 h-full" />
    );
  }

  return (
    <Form {...form}>
      <form
        className="h-full flex flex-col"
        onSubmit={form.handleSubmit(async (values) => {
          //
        })}
      >
        <div className="px-5 py-4 max-h-[calc(100%_-_70px)] overflow-x-auto">
          <AssignedServicesForm
            isUpdate
            form={form as UseFormReturn<AssignedServicesFormType>}
          />
        </div>
        <SheetFooter className="px-5 flex justify-end border-t">
          <SheetClose>
            <Button variant="ghost" className="w-[120px]" type="button">
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="submit"
            variant="primary"
            className="w-[120px]"
            disabled={isPending || processingFile}
            isLoading={isPending || processingFile}
            loadingText="Saving..."
          >
            Update
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
};

export default UpdateStaffInfo;
