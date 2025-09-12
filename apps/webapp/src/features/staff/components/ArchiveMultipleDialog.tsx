import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import React from 'react';

interface ArchiveMultipleDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onArchive: () => Promise<void>;
  doctorNames?: string[];
}

const ArchiveMultipleDialog: React.FC<ArchiveMultipleDialogProps> = ({
  open,
  loading,
  setOpen,
  onArchive,
  doctorNames,
}) => {
  const count = doctorNames?.length || 0;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Archive Multiple Doctor Accounts</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to archive
            {count > 0 ? (
              <span className="font-semibold text-gray-900">
                {' '}
                {count} doctor{count > 1 ? 's' : ''}
              </span>
            ) : (
              ' these doctors'
            )}
            ? This action will disable their access and hide their accounts from
            staff lists.
          </p>
          {doctorNames && doctorNames.length > 0 && (
            <ul className="mt-2 text-xs text-gray-600 list-disc list-inside">
              {doctorNames.map((name) => (
                <li key={name}>Dr. {name}</li>
              ))}
            </ul>
          )}
        </div>
        <DialogFooter>
          <Button
            isLoading={loading}
            variant="destructive"
            onClick={async () => {
              await onArchive();
              setOpen(false);
            }}
          >
            Archive All
          </Button>
          <Button
            disabled={loading}
            variant="ghost"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveMultipleDialog;
