import { useTRPC } from '@/lib/trpc';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import ArchiveMultipleDialog from '../components/ArchiveMultipleDialog';
import { useArchiveMultipleModalVisibility } from '../update/context/context';

const ArchiveMultipleStaff: React.FC = () => {
  const [open, setOpen, staffs] = useArchiveMultipleModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.staffs.archiveStaffInfo.mutationOptions(),
  );
  return (
    <ArchiveMultipleDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={async () => {
        await mutateAsync({ staffIds: staffs.map((s) => s.staffId) });
      }}
      doctorNames={staffs.map((s) => s.name)}
    />
  );
};

export default ArchiveMultipleStaff;
