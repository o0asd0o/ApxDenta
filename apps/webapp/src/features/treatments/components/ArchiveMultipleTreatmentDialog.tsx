import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import { DotIcon } from 'lucide-react';
import React from 'react';
import type { TreatmentColumnType } from '../__types';

interface ArchiveMultipleTreatmentDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onArchive: () => void;
  treatments?: TreatmentColumnType[];
}

const ArchiveMultipleTreatmentDialog: React.FC<
  ArchiveMultipleTreatmentDialogProps
> = ({ open, loading, setOpen, onArchive, treatments }) => {
  const count = treatments?.length || 0;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Archive Multiple Treatments</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to archive
            {count > 0 ? (
              <span className="font-medium text-gray-900">
                {' '}
                {count} treatment{count > 1 ? 's' : ''}
              </span>
            ) : (
              ' these treatments'
            )}
            ? This action will disable their access and hide their accounts from
            staff lists.
          </p>
          {treatments && treatments.length > 0 && (
            <ul className="mt-4 text-xs text-gray-600 list-disc list-inside">
              {treatments.map((treatment) => {
                const name = `${treatment.name}`;
                return (
                  <li
                    key={treatment.id}
                    className="flex items-center gap-1 py-1 text-black font-medium"
                  >
                    <DotIcon />
                    <span className="text-sm">{name}</span>
                  </li>
                );
              })}
            </ul>
          )}
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
            Archive All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArchiveMultipleTreatmentDialog;
