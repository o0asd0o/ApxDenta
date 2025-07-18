import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

type UploadFileResponse = {
  result: {
    data: {
      json: {
        data: {
          fileName: string;
          fileUrl: string;
          id: string;
        };
      };
    };
  };
};

type Param = { file: File };

export const useUploadFile = () => {
  const { mutateAsync: uploadFile, isPending } = useMutation<
    UploadFileResponse['result']['data']['json']['data'],
    Error,
    Param
  >({
    mutationFn: async ({ file }) => {
      const fileFormData = new FormData();
      fileFormData.append('file', file as unknown as File);

      const upload = await axios.post<UploadFileResponse>(
        `${import.meta.env.VITE_PUBLIC_SERVER_URL}/trpc/files.uploadFile`,
        fileFormData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        },
      );

      return upload.data.result.data.json.data;
    },
    onError: (error) => {
      toast.error(`Failed to upload file: ${error.message}`);
    },
  });

  return [uploadFile, isPending] as const;
};
