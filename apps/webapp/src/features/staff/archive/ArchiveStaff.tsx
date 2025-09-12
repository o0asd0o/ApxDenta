import { useTRPC } from '@/lib/trpc';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import ArchiveDialog from '../components/ArchiveDialog';
import { useArchiveModalVisibility } from '../update/context/context';

const ArchiveStaff: React.FC = () => {
  const [open, setOpen, staff] = useArchiveModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.staffs.archiveStaffInfo.mutationOptions(),
  );

  return (
    <ArchiveDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={async () => {
        await mutateAsync({ staffIds: [staff.staffId as string] });
      }}
      doctorName={staff.name}
    />
  );
};

export default ArchiveStaff;
