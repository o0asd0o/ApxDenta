import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useArchiveModalVisibility } from '../__common/context/context';
import { invalidateTreatmentList } from '../__common/queries';
import ArchiveTreatmentDialog from '../components/ArchiveTreatmentDialog';

const ArchiveTreatment: React.FC = () => {
  const [open, setOpen, treatment, callback] = useArchiveModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.treatments.archiveTreatment.mutationOptions({
      onSuccess: async () => {
        await invalidateTreatmentList(queryClient, trpc);
        callback?.();
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <ArchiveTreatmentDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onArchive={() =>
        mutateAsync({ treatmentIds: [treatment.treatmentId as string] })
      }
      treatmentName={treatment.name}
    />
  );
};

export default ArchiveTreatment;
