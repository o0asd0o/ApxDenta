import { FormControl, FormField, FormItem } from '@repo/ui/components';
import { FileUp } from 'lucide-react';
import React from 'react';
import type { UseFormReturn } from 'react-hook-form';
import type {
  AttachedReservationFile,
  TreatmentAndDentistFormValues,
} from '../../components/__types';
import AttachedFileRow from './AttachedFileRow';

type Props = {
  form: UseFormReturn<TreatmentAndDentistFormValues>;
};

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const createAttachedFile = (file: File): AttachedReservationFile => ({
  id: `attached-file-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  file,
  name: file.name,
  size: file.size,
  type: file.type,
  progress: 0,
  status: 'uploading',
});

const AttachedFilesInput: React.FC<Props> = ({ form }) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const attachedFiles = form.watch('attachedFiles') ?? [];

  React.useEffect(() => {
    const uploadingFiles = attachedFiles.filter(
      (file) => file.status === 'uploading',
    );

    if (uploadingFiles.length === 0) return;

    const interval = window.setInterval(() => {
      const currentFiles = form.getValues('attachedFiles') ?? [];
      const nextFiles = currentFiles.map((file) => {
        if (file.status !== 'uploading') return file;

        const nextProgress = Math.min(file.progress + 25, 100);

        return {
          ...file,
          progress: nextProgress,
          status: nextProgress === 100 ? 'completed' : 'uploading',
        } satisfies AttachedReservationFile;
      });

      form.setValue('attachedFiles', nextFiles, {
        shouldDirty: true,
        shouldValidate: false,
      });
    }, 450);

    return () => window.clearInterval(interval);
  }, [attachedFiles, form]);

  const appendFiles = (files: FileList | File[]) => {
    const currentFiles = form.getValues('attachedFiles') ?? [];
    const availableSlots = MAX_FILES - currentFiles.length;

    if (availableSlots <= 0) return;

    const acceptedFiles = Array.from(files)
      .filter((file) => file.size <= MAX_FILE_SIZE)
      .slice(0, availableSlots)
      .map(createAttachedFile);

    form.setValue('attachedFiles', [...currentFiles, ...acceptedFiles], {
      shouldDirty: true,
      shouldValidate: false,
    });
  };

  const removeFile = (fileId: string) => {
    form.setValue(
      'attachedFiles',
      attachedFiles.filter((file) => file.id !== fileId),
      {
        shouldDirty: true,
        shouldValidate: false,
      },
    );
  };

  return (
    <FormField
      control={form.control}
      name="attachedFiles"
      render={() => (
        <FormItem>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs leading-none text-gray-900">
              Attached Files{' '}
              <span className="font-normal text-gray-400">(Optional)</span>
            </p>
            <span className="text-xs text-gray-400">
              {attachedFiles.length} of {MAX_FILES}
            </span>
          </div>
          <FormControl>
            <div
              className="mt-2 flex min-h-[74px] items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white px-4 py-3"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                appendFiles(event.dataTransfer.files);
              }}
            >
              <input
                ref={inputRef}
                type="file"
                multiple
                className="hidden"
                onChange={(event) => {
                  if (event.target.files) appendFiles(event.target.files);
                  event.target.value = '';
                }}
              />
              <div className="flex items-center gap-3 text-sm">
                <span className="flex size-8 items-center justify-center rounded-md bg-gray-100 text-gray-400">
                  <FileUp className="size-4" />
                </span>
                <span className="text-gray-700">Drag & drop files here</span>
                <button
                  type="button"
                  className="font-medium text-primary"
                  onClick={() => inputRef.current?.click()}
                >
                  Browse Files
                </button>
              </div>
            </div>
          </FormControl>
          <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
            <span>Maximum upload file sizes : 10MB</span>
            <span>
              {attachedFiles.length} of {MAX_FILES}
            </span>
          </div>

          {attachedFiles.length > 0 && (
            <div className="mt-3 flex flex-col gap-3">
              {attachedFiles.map((file) => (
                <AttachedFileRow
                  key={file.id}
                  file={file}
                  onRemove={removeFile}
                />
              ))}
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default AttachedFilesInput;
