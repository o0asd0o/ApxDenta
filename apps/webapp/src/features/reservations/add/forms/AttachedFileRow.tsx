import { cn } from '@/lib/utils';
import { FileText, Image, Trash2, X } from 'lucide-react';
import React from 'react';
import type { AttachedReservationFile } from '../../components/__types';

type Props = {
  file: AttachedReservationFile;
  onRemove: (fileId: string) => void;
};

const formatFileSize = (size: number) => {
  if (size >= 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(size / 1024).toFixed(2)} KB`;
};

const getFileVisual = (file: AttachedReservationFile) => {
  if (file.type.includes('image')) {
    return {
      Icon: Image,
      className: 'bg-teal-100 text-teal-600',
    };
  }

  if (file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf')) {
    return {
      Icon: FileText,
      className: 'bg-red-100 text-red-600',
    };
  }

  return {
    Icon: FileText,
    className: 'bg-blue-100 text-blue-600',
  };
};

const AttachedFileRow: React.FC<Props> = ({ file, onRemove }) => {
  const { Icon, className } = getFileVisual(file);
  const complete = file.status === 'completed';

  return (
    <div className="grid grid-cols-[32px_1fr_24px] gap-3">
      <span
        className={cn(
          'flex size-8 items-center justify-center rounded-md',
          className,
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <div className="flex items-start justify-between gap-3">
          <p className="truncate text-sm font-medium text-gray-900">
            {file.name}
          </p>
          <span className="whitespace-nowrap text-xs text-gray-500">
            {complete ? 'Completed' : `${file.progress}%`}
          </span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-emerald-500 transition-all"
            style={{ width: `${file.progress}%` }}
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          {formatFileSize(file.size)}
        </p>
      </div>
      <button
        type="button"
        className="mt-0.5 flex size-6 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
        onClick={() => onRemove(file.id)}
        aria-label={`Remove ${file.name}`}
      >
        {complete ? <Trash2 className="size-4" /> : <X className="size-4" />}
      </button>
    </div>
  );
};

export default AttachedFileRow;
