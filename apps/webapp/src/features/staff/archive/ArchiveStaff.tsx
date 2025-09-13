import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { invalidateStaffList } from '../__common/queries';
import ArchiveDialog from '../components/ArchiveDialog';
import { useArchiveModalVisibility } from '../update/context/context';

const ArchiveStaff: React.FC = () => {
  const [open, setOpen, staff] = useArchiveModalVisibility();

  const trpc = useTRPC();

  console.log({ staff });

  const { mutateAsync, isPending } = useMutation(
    trpc.staffs.archiveStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <ArchiveDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() => mutateAsync({ staffIds: [staff.staffId as string] })}
      doctorName={staff.name}
    />
  );
};

export default ArchiveStaff;
