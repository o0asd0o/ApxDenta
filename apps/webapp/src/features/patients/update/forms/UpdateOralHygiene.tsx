import UpdateWrapper from '@/components/UpdateWrapper';
import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type PatientOralHygieneFormType,
  patientOralHygieneSchema,
} from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { useUpdatePatientId } from '../../__common/context/context';
import { invalidatePatientsList } from '../../__common/queries';
import OralHygieneForm from '../../add/forms/OralHygieneForm';

type Props = {
  onSubmitted: () => void;
};

const UpdateOralHygiene: React.FC<Props> = ({ onSubmitted }) => {
  const directTrpc = useTRPCClient();
  const patientId = useUpdatePatientId();

  const trpc = useTRPC();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(patientOralHygieneSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateOralHygiene:${patientId}`);
      if (cache) return cache;

      const patient = await directTrpc.patients.getPatient.query({
        patientId: patientId as string,
      });

      const data = patient.data;
      if (!data) return {};

      const defaultValues = {
        dentalCareStart: data.dentalCareStart || undefined,
        lastDentalVisit: data.lastDentalVisit || undefined,
        oralHygieneDuration: data.oralHygieneDuration || undefined,
        washTeethFrequency: data.washTeethFrequency || undefined,
        changeToothBrushFrequency: data.changeToothBrushFrequency || undefined,
        usingDentalFloss: data.usingDentalFloss ?? false,
        usingMouthWash: data.usingMouthWash ?? false,
      } satisfies Partial<PatientOralHygieneFormType>;

      objectStorage.setItem(`UpdateOralHygiene:${patientId}`, defaultValues);

      return defaultValues;
    },
  });

  const { mutate: updatePatient, isPending } = useMutation(
    trpc.patients.updatePatient.mutationOptions({
      onSuccess: async () => {
        await invalidatePatientsList(queryClient, trpc);
        objectStorage.removeItem(`UpdateOralHygiene:${patientId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <UpdateWrapper
      isLoading={isPending}
      form={form}
      onSubmit={async (values) => {
        const { dirtyFields } = form.formState;

        const includeIfDirty = <T,>(key: keyof PatientOralHygieneFormType) => {
          return dirtyFields[key] ? (values[key] as T) : undefined;
        };

        updatePatient({
          patientId: patientId as string,
          dentalCareStart: includeIfDirty('dentalCareStart'),
          lastDentalVisit: includeIfDirty('lastDentalVisit'),
          oralHygieneDuration: includeIfDirty('oralHygieneDuration'),
          washTeethFrequency: includeIfDirty('washTeethFrequency'),
          changeToothBrushFrequency: includeIfDirty(
            'changeToothBrushFrequency',
          ),
          usingDentalFloss: includeIfDirty('usingDentalFloss'),
          usingMouthWash: includeIfDirty('usingMouthWash'),
        });
      }}
    >
      <OralHygieneForm
        form={form as UseFormReturn<PatientOralHygieneFormType>}
      />
    </UpdateWrapper>
  );
};

export default UpdateOralHygiene;
