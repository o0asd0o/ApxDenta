import { useTRPC } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useDeleteModalVisibility } from '../__common/context/context';
import { invalidatePatientsList } from '../__common/queries';
import DeletePatientDialog from './DeletePatientDialog';

const DeletePatient: React.FC = () => {
  const [open, setOpen, patient] = useDeleteModalVisibility();

  const trpc = useTRPC();

  const { mutateAsync, isPending } = useMutation(
    trpc.patients.deletePatient.mutationOptions({
      onSuccess: async () => {
        await invalidatePatientsList(queryClient, trpc);
      },
      onSettled: () => setOpen(false),
    }),
  );

  return (
    <DeletePatientDialog
      loading={isPending}
      open={open}
      setOpen={setOpen}
      onDelete={() =>
        mutateAsync({ patientIds: [patient.patientId as string] })
      }
      patientName={patient.name}
    />
  );
};

export default DeletePatient;
