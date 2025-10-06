import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useArchiveMultipleModalVisibility } from '../__common/context/context';
import { invalidateStaffList } from '../__common/queries';
import ArchiveMultipleStaffDialog from '../components/ArchiveMultipleStaffDialog';

const ArchiveMultipleStaff: React.FC = () => {
  const [open, setOpen, staffs, callback] = useArchiveMultipleModalVisibility();

  const trpc = useTRPC();

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
    <ArchiveMultipleStaffDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() => mutateAsync({ staffIds: staffs.map((s) => s.id) })}
      staffs={staffs}
    />
  );
};

export default ArchiveMultipleStaff;
