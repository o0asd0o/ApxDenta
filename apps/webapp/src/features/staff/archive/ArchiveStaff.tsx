import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'sonner';
import { useArchiveModalVisibility } from '../__common/context/context';
import { invalidateStaffList } from '../__common/queries';
import ArchiveStaffDialog from '../components/ArchiveStaffDialog';

const ArchiveStaff: React.FC = () => {
  const [open, setOpen, staff, callback] = useArchiveModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.staffs.archiveStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        toast.success('Staff archived successfully');
        callback?.();
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <ArchiveStaffDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() => mutateAsync({ staffIds: [staff.staffId as string] })}
      doctorName={staff.name}
    />
  );
};

export default ArchiveStaff;
