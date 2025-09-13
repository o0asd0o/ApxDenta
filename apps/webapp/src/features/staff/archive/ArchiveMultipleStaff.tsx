import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { invalidateStaffList } from '../__common/queries';
import ArchiveMultipleDialog from '../components/ArchiveMultipleDialog';
import { useArchiveMultipleModalVisibility } from '../update/context/context';

const ArchiveMultipleStaff: React.FC = () => {
  const [open, setOpen, staffs, callback] = useArchiveMultipleModalVisibility();

  const trpc = useTRPC();

  console.log({ open, setOpen, staffs, callback });

  const { mutateAsync, isPending } = useMutation(
    trpc.staffs.archiveStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        if (callback) {
          callback();
        }
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <ArchiveMultipleDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() => mutateAsync({ staffIds: staffs.map((s) => s.id) })}
      staffs={staffs}
    />
  );
};

export default ArchiveMultipleStaff;
