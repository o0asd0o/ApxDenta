import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import { type StaffInfoFormType, staffInfoSchema } from '@repo/schemas';
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
import { StaffInfoForm } from '../../add/forms/StaffInfoForm';
import { useUpdateStaffId } from '../context/context';

type Props = {
  onSubmitted: () => void;
};
const UpdateStaffInfo: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(staffInfoSchema.partial()),
    defaultValues: async () => {
      const staff = await directTrpc.staffs.getStaff.query({
        id: staffId as string,
      });

      const specialistId = `${staff.data.specialist?.id}--${staff.data.specialist?.title}`;

      return {
        email: staff.data.email || '',
        phoneNumber: staff.data.contactNumber || '',
        file: `${import.meta.env.VITE_PUBLIC_CDN_URL}${staff.data.avatar?.url}`,
        address: staff.data.address || '',
        firstName: staff.data.firstName || '',
        lastName: staff.data.lastName || '',
        specialistId,
        type: staff.data.employmentType,
      } satisfies Partial<StaffInfoFormType>;
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
        onSubmit={form.handleSubmit((values) => {
          const { dirtyFields } = form.formState;

          const includeDirty = <T,>(keys: keyof StaffInfoFormType) => {
            return dirtyFields[keys] ? (values[keys] as T) : undefined;
          };

          updateStaffInfo({
            staffId: staffId as string,
            staffData: {
              email: includeDirty('email'),
              phoneNumber: includeDirty('phoneNumber'),
              // file: values.file, // TODO: handle file upload
              address: includeDirty('address'),
              firstName: includeDirty('firstName'),
              lastName: includeDirty('lastName'),
              specialistId: (includeDirty('specialistId') as string)?.split(
                '--',
              )[0],
              type: includeDirty('type'),
            },
          });
        })}
      >
        <div className="px-5 py-4 max-h-[calc(100%_-_70px)] overflow-x-auto">
          <StaffInfoForm
            isUpdate
            form={form as UseFormReturn<StaffInfoFormType>}
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
            disabled={isPending}
            isLoading={isPending}
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
