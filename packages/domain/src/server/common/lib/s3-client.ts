import { env } from '@/env';
import {
  DeleteObjectCommand,
  type DeleteObjectCommandInput,
  GetObjectCommand,
  type GetObjectCommandInput,
  PutObjectCommand,
  type PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl as getObjectSignedUrl } from '@aws-sdk/s3-request-presigner';

// move to environment.ts
const bucketName = env.AWS_BUCKET_NAME;
const bucketRegion = env.AWS_BUCKET_REGION;
const accessKeySecret = env.AWS_ACCESS_KEY_SECRET;
const accessKey = env.AWS_ACCESS_KEY;

const client = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: accessKeySecret,
  },
  region: bucketRegion,
});

const s3Client = {
  uploadFile: (fileBuffer: Buffer, fileName: string, mimetype: string) => {
    const uploadParams: PutObjectCommandInput = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
      ContentType: mimetype,
      CacheControl: 'public,max-age=31536000,immutable',
    };

    return client.send(new PutObjectCommand(uploadParams));
  },

  deleteFile: (fileName: string) => {
    const deleteParams: DeleteObjectCommandInput = {
      Bucket: bucketName,
      Key: fileName,
    };

    return client.send(new DeleteObjectCommand(deleteParams));
  },

  getSignedUrl: (key: string, fileName?: string) => {
    const params: GetObjectCommandInput = {
      Bucket: bucketName,
      Key: key,
      ...(fileName && {
        ResponseContentDisposition: `attachment; filename="${fileName}"`,
      }),
    };

    const command = new GetObjectCommand(params);
    const seconds = 60 * 60;

    return getObjectSignedUrl(client, command, { expiresIn: seconds });
  },
};

export default s3Client;
