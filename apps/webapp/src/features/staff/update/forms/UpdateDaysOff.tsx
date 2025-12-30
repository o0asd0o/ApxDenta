import UpdateWrapper from '@/components/UpdateWrapper';
import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import { type DayOffsFormType, dayOffsSchema } from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { useUpdateStaffId } from '../../__common/context/context';
import { invalidateStaffList } from '../../__common/queries';
import { getExcludedAdditionalDayOffs } from '../../__helpers';
import { useAdditionalDayOff } from '../../add/context/context';
import { DaysOffForm } from '../../add/forms/DaysOffForm';

type Props = {
  onSubmitted: () => void;
};

export const UpdateDaysOff: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const [extraDayOffs, setAdditionalDayOff] = useAdditionalDayOff();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(dayOffsSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateDaysOff:${staffId}`);
      if (cache) return cache;

      const { data: staffDaysOff } =
        await directTrpc.staffs.getStaffDaysOff.query({
          id: staffId as string,
        });

      const defaultValues = {
        dayOffs: staffDaysOff.daysOff.map((item) => item.id),
      };

      const extras = staffDaysOff.daysOff.filter((item) => !item.isDefault);

      setAdditionalDayOff(
        extras.map((item) => ({
          name: item.name,
          from: new Date(String(item.from)),
          to: new Date(String(item.to)),
          repeat: item.repeat || undefined,
          id: item.id,
        })),
      );

      objectStorage.setItem(`UpdateDaysOff:${staffId}`, defaultValues);

      return defaultValues;
    },
  });

  const trpc = useTRPC();

  const { mutate: updateDaysOff, isPending } = useMutation(
    trpc.staffs.updateStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        objectStorage.removeItem(`UpdateDaysOff:${staffId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <UpdateWrapper
      form={form}
      isLoading={isPending}
      onSubmit={async (values) => {
        const dayOffs = getExcludedAdditionalDayOffs(
          extraDayOffs,
          (values as DayOffsFormType).dayOffs,
        );

        updateDaysOff({
          staffId: staffId as string,
          dayOffs: { dayOffs },
          extraDayOffs,
        });
      }}
    >
      <DaysOffForm form={form as UseFormReturn<DayOffsFormType>} />
    </UpdateWrapper>
  );
};
