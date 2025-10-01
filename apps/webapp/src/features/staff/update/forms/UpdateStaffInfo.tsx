import { useUploadFile } from '@/hooks/upload/useUploadFile';
import objectStorage from '@/lib/object-storage';
import { useTRPC, useTRPCClient } from '@/lib/trpc';
import { extractFileIdFromUrl } from '@/lib/utils';
import { queryClient } from '@/providers/Root';
import { zodResolver } from '@hookform/resolvers/zod';
import { type StaffInfoFormType, staffInfoSchema } from '@repo/schemas';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { useUpdateStaffId } from '../../__common/context/context';
import { invalidateStaffList } from '../../__common/queries';
import { StaffInfoForm } from '../../add/forms/StaffInfoForm';
import Wrapper from './Wrapper';

type Props = {
  onSubmitted: () => void;
  type: 'DOCTOR' | 'STAFF';
};
const UpdateStaffInfo: React.FC<Props> = ({ onSubmitted, type }) => {
  const [processingFile, setProcessingFile] = React.useState<boolean>(false);

  const directTrpc = useTRPCClient();
  const staffId = useUpdateStaffId();

  const [uploadFile] = useUploadFile();

  const trpc = useTRPC();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(staffInfoSchema.partial()),
    defaultValues: async () => {
      const cache = objectStorage.getItem(`UpdateStaffInfo:${staffId}`);
      if (cache) return cache;

      const staff = await directTrpc.staffs.getStaff.query({
        id: staffId as string,
      });

      const specialistId = `${staff.data.specialist?.id}--${staff.data.specialist?.title}`;

      const defaultValues = {
        email: staff.data.email || '',
        phoneNumber: staff.data.contactNumber || '',
        file: `${import.meta.env.VITE_PUBLIC_CDN_URL}${staff.data.avatar?.url}`,
        address: staff.data.address || '',
        firstName: staff.data.firstName || '',
        lastName: staff.data.lastName || '',
        specialistId,
        type: staff.data.employmentType,
      } satisfies Partial<StaffInfoFormType>;

      objectStorage.setItem(`UpdateStaffInfo:${staffId}`, defaultValues);

      return defaultValues;
    },
  });

  const { mutate: updateStaffInfo, isPending } = useMutation(
    trpc.staffs.updateStaffInfo.mutationOptions({
      onSuccess: async () => {
        await invalidateStaffList(queryClient, trpc);
        objectStorage.removeItem(`UpdateStaffInfo:${staffId}`);
        onSubmitted();
      },
    }),
  );

  return (
    <Wrapper
      isLoading={isPending || processingFile}
      form={form}
      onSubmit={async (values) => {
        const { dirtyFields, defaultValues } = form.formState;

        let newAvatarUrl: string | undefined = undefined;

        const includeIfDirty = <T,>(keys: keyof StaffInfoFormType) => {
          return dirtyFields[keys] ? (values[keys] as T) : undefined;
        };

        if (includeIfDirty('file')) {
          setProcessingFile(true);
          const oldAvatarUrl = extractFileIdFromUrl(
            defaultValues?.file as string,
          );

          const [response] = await Promise.all([
            uploadFile({ file: values.file as File }),
            directTrpc.files.deleteFile.mutate({ fileId: oldAvatarUrl }),
          ]);

          newAvatarUrl = response.id;
          setProcessingFile(false);
        }

        updateStaffInfo({
          staffId: staffId as string,
          staffData: {
            email: includeIfDirty('email'),
            phoneNumber: includeIfDirty('phoneNumber'),
            file: newAvatarUrl ? { id: newAvatarUrl } : undefined,
            address: includeIfDirty('address'),
            firstName: includeIfDirty('firstName'),
            lastName: includeIfDirty('lastName'),
            specialistId: (includeIfDirty('specialistId') as string)?.split(
              '--',
            )[0],
            type: includeIfDirty('type'),
          },
        });
      }}
    >
      <StaffInfoForm
        isUpdate
        type={type}
        form={form as UseFormReturn<StaffInfoFormType>}
      />
    </Wrapper>
  );
};

export default UpdateStaffInfo;
