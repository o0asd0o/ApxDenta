import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useArchiveMultipleModalVisibility } from '../__common/context/context';
import { invalidateTreatmentList } from '../__common/queries';
import ArchiveMultipleTreatmentDialog from '../components/ArchiveMultipleTreatmentDialog';

const ArchiveMultipleTreatment: React.FC = () => {
  const [open, setOpen, treatments, callback] =
    useArchiveMultipleModalVisibility();

  const trpc = useTRPC();

  console.log({ open, setOpen, treatments, callback });

  const { mutateAsync, isPending } = useMutation(
    trpc.treatments.archiveTreatment.mutationOptions({
      onSuccess: async () => {
        await invalidateTreatmentList(queryClient, trpc);
        if (callback) {
          callback();
        }
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <ArchiveMultipleTreatmentDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() =>
        mutateAsync({ treatmentIds: treatments.map((s) => s.id) })
      }
      treatments={treatments}
    />
  );
};

export default ArchiveMultipleTreatment;
