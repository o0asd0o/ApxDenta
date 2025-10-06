import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import React from 'react';

interface ArchiveStaffDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onArchive: () => void;
  doctorName?: string;
}

const ArchiveStaffDialog: React.FC<ArchiveStaffDialogProps> = ({
  open,
  loading,
  setOpen,
  onArchive,
  doctorName,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Archive Doctor Account</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to archive
            {doctorName ? (
              <span className="font-bold text-gray-900"> Dr. {doctorName}</span>
            ) : (
              ' this doctor'
            )}
            ? This action will disable their access and hide their account from
            staff lists.
          </p>
        </div>
        <DialogFooter>
          <Button isLoading={loading} variant="destructive" onClick={onArchive}>
            Archive
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

export default ArchiveStaffDialog;
