import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import { type WorkingHoursFormType, workingHoursSchema } from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import { produce } from 'immer';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { invalidateStaffList } from '../../__common/queries';
import { WorkingHoursForm } from '../../add/forms/WorkingHoursForm';
import { useUpdateStaffId } from '../context/context';
import Wrapper from './Wrapper';

type Props = {
  onSubmitted: () => void;
};
const UpdateWorkingHours: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(workingHoursSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateWorkingHours:${staffId}`);
      if (cache) return cache;

      const { data: staffWorkingHours } =
        await directTrpc.staffs.getStaffWorkingHours.query({
          id: staffId as string,
        });

      const workSchedules = staffWorkingHours.workSchedules;

      const defaultValues = workSchedules.reduce(
        (acc, current) => {
          const splitStart = String(current.from).split(':');
          const start = splitStart[0] + splitStart[1];
          const splitEnd = String(current.to).split(':');
          const end = splitEnd[0] + splitEnd[1];

          return produce(acc, (draft) => {
            draft[current.day.toLowerCase() as keyof WorkingHoursFormType] = {
              startTime: current.from ? Number(start) : undefined,
              endTime: current.to ? Number(end) : undefined,
            } as WorkingHoursFormType[keyof WorkingHoursFormType];
          });
        },
        {} as Partial<WorkingHoursFormType>,
      );

      objectStorage.setItem(`UpdateWorkingHours:${staffId}`, defaultValues);

      return defaultValues;
    },
  });

  const trpc = useTRPC();

  const { mutate: updateWorkingSchedule, isPending } = useMutation(
    trpc.staffs.updateStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        objectStorage.removeItem(`UpdateWorkingHours:${staffId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <Wrapper
      form={form}
      isLoading={isPending}
      onSubmit={async (values) => {
        updateWorkingSchedule({
          staffId: staffId as string,
          workingHours: values,
        });
      }}
    >
      <WorkingHoursForm form={form as UseFormReturn<WorkingHoursFormType>} />
    </Wrapper>
  );
};

export default UpdateWorkingHours;
