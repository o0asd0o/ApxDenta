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
  treatmentName?: string;
}

const ArchiveTreatmentDialog: React.FC<ArchiveStaffDialogProps> = ({
  open,
  loading,
  setOpen,
  onArchive,
  treatmentName,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Archive Treatment</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to archive{' '}
            {treatmentName ? (
              <span className="font-bold text-gray-900">{treatmentName}</span>
            ) : (
              ' this treatment'
            )}
            ? This action will disable their access and hide their account from
            staff lists.
          </p>
        </div>
        <DialogFooter>
          <Button
            disabled={loading}
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button isLoading={loading} variant="destructive" onClick={onArchive}>
            Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveTreatmentDialog;
