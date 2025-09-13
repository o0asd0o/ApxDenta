import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type AssignedServicesFormType,
  assignedServicesSchema,
} from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { useUpdateStaffId } from '../../__common/context/context';
import { invalidateStaffList } from '../../__common/queries';
import { AssignedServicesForm } from '../../add/forms/AssignedServicesForm';
import Wrapper from './Wrapper';

type Props = {
  onSubmitted: () => void;
};

const UpdateStaffServices: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(assignedServicesSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateAssignServices:${staffId}`);
      if (cache) return cache;

      const staffServices = await directTrpc.staffs.getStaffServices.query({
        id: staffId as string,
      });

      const defaultValues = {
        cosmeticServices:
          staffServices.data.assignedServices
            .filter((service) => service.category === 'COSMETIC_SERVICE')
            .map((item) => item.id) || [],
        treatmentService:
          staffServices.data.assignedServices
            .filter((service) => service.category === 'MEDICAL_SERVICE')
            .map((item) => item.id) || [],
      } satisfies Partial<AssignedServicesFormType>;

      objectStorage.setItem(`UpdateAssignServices:${staffId}`, defaultValues);

      return defaultValues;
    },
  });

  const trpc = useTRPC();

  const { mutate: updateServices, isPending } = useMutation(
    trpc.staffs.updateStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        objectStorage.removeItem(`UpdateAssignServices:${staffId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <Wrapper
      form={form}
      isLoading={isPending}
      onSubmit={async (values) => {
        updateServices({
          staffId: staffId as string,
          assignedServices: values,
        });
      }}
    >
      <AssignedServicesForm
        form={form as UseFormReturn<AssignedServicesFormType>}
      />
    </Wrapper>
  );
};

export default UpdateStaffServices;
