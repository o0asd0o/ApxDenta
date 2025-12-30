import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useDeleteMultipleModalVisibility } from '../__common/context/context';
import { invalidatePatientsList } from '../__common/queries';
import DeleteMultiplePatientsDialog from './DeleteMultiplePatientsDialog';

const DeleteMultiplePatients: React.FC = () => {
  const [open, setOpen, patients, callback] =
    useDeleteMultipleModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.patients.deletePatient.mutationOptions({
      onSuccess: async () => {
        await invalidatePatientsList(queryClient, trpc);
        if (callback) {
          callback();
        }
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <DeleteMultiplePatientsDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onDelete={() => mutateAsync({ patientIds: patients.map((p) => p.id) })}
      patients={patients}
    />
  );
};

export default DeleteMultiplePatients;
