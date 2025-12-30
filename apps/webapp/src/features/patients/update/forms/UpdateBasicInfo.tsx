import UpdateWrapper from '@/components/UpdateWrapper';
import { useUploadFile } from '@/hooks/upload/useUploadFile';
import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { extractFileIdFromUrl } from '@/lib/utils';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type PatientBasicInfoFormType,
  patientBasicInfoSchema,
} from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { useUpdatePatientId } from '../../__common/context/context';
import { invalidatePatientsList } from '../../__common/queries';
import BasicInfoForm from '../../add/forms/BasicInfoForm';

type Props = {
  onSubmitted: () => void;
};

const UpdateBasicInfo: React.FC<Props> = ({ onSubmitted }) => {
  const [processingFile, setProcessingFile] = React.useState<boolean>(false);

  const directTrpc = useTRPCClient();
  const patientId = useUpdatePatientId();

  const [uploadFile] = useUploadFile();

  const trpc = useTRPC();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(patientBasicInfoSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateBasicInfo:${patientId}`);
      if (cache) return cache;

      const patient = await directTrpc.patients.getPatient.query({
        patientId: patientId as string,
      });

      const data = patient.data;
      if (!data) return {};

      const defaultValues = {
        file: data.avatar?.url
          ? `${import.meta.env.VITE_PUBLIC_CDN_URL}${data.avatar.url}`
          : undefined,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        email: data.email || '',
        phoneNumber: data.phoneNumber || '',
        address: data.address || '',
        age: data.age || undefined,
        gender: data.gender || undefined,
      } satisfies Partial<PatientBasicInfoFormType>;

      objectStorage.setItem(`UpdateBasicInfo:${patientId}`, defaultValues);

      return defaultValues;
    },
  });

  const { mutate: updatePatient, isPending } = useMutation(
    trpc.patients.updatePatient.mutationOptions({
      onSuccess: async () => {
        await invalidatePatientsList(queryClient, trpc);
        objectStorage.removeItem(`UpdateBasicInfo:${patientId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <UpdateWrapper
      isLoading={isPending || processingFile}
      form={form}
      onSubmit={async (values) => {
        const { dirtyFields, defaultValues } = form.formState;

        let newAvatarId: string | undefined | null = undefined;

        const includeIfDirty = <T,>(key: keyof PatientBasicInfoFormType) => {
          return dirtyFields[key] ? (values[key] as T) : undefined;
        };

        if (dirtyFields.file) {
          setProcessingFile(true);

          if (values.file && values.file instanceof File) {
            const oldAvatarUrl = extractFileIdFromUrl(
              defaultValues?.file as string,
            );

            const promises: Promise<unknown>[] = [
              uploadFile({ file: values.file }),
            ];

            if (oldAvatarUrl) {
              promises.push(
                directTrpc.files.deleteFile.mutate({
                  fileId: oldAvatarUrl,
                }),
              );
            }

            const [response] = await Promise.all(promises);
            newAvatarId = (response as { id: string }).id;
          } else if (!values.file) {
            // File was removed
            newAvatarId = null;
          }

          setProcessingFile(false);
        }

        updatePatient({
          patientId: patientId as string,
          firstName: includeIfDirty('firstName'),
          lastName: includeIfDirty('lastName'),
          email: includeIfDirty('email'),
          phoneNumber: includeIfDirty('phoneNumber'),
          address: includeIfDirty('address'),
          age: includeIfDirty('age'),
          gender: includeIfDirty('gender'),
          avatarId: newAvatarId,
        });
      }}
    >
      <BasicInfoForm form={form as UseFormReturn<PatientBasicInfoFormType>} />
    </UpdateWrapper>
  );
};

export default UpdateBasicInfo;
