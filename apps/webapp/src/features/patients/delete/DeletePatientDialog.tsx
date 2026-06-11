import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import React from 'react';

interface DeletePatientDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
  patientName?: string;
}

const DeletePatientDialog: React.FC<DeletePatientDialogProps> = ({
  open,
  loading,
  setOpen,
  onDelete,
  patientName,
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Delete Patient</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete
            {patientName ? (
              <span className="font-semibold text-gray-900">
                {' '}
                {patientName}
              </span>
            ) : (
              ' this patient'
            )}
            ? This action cannot be undone and will permanently remove the
            patient and all associated data.
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
          <Button isLoading={loading} variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePatientDialog;
