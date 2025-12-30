import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import React from 'react';
import type { PatientForDelete } from '../__types';

interface DeleteMultiplePatientsDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
  patients?: PatientForDelete[];
}

const DeleteMultiplePatientsDialog: React.FC<
  DeleteMultiplePatientsDialogProps
> = ({ open, loading, setOpen, onDelete, patients }) => {
  const count = patients?.length || 0;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Delete Multiple Patients</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Are you sure you want to delete
            {count > 0 ? (
              <span className="font-bold text-gray-900">
                {' '}
                {count} patient{count > 1 ? 's' : ''}
              </span>
            ) : (
              ' these patients'
            )}
            ? This action cannot be undone and will permanently remove the
            patients and all associated data.
          </p>
          {patients && patients.length > 0 && (
            <ul className="mt-4 text-xs text-gray-600 list-disc list-inside max-h-[200px] overflow-y-auto">
              {patients.map((patient) => {
                const name = patient.name;
                const nameParts = name.split(' ');
                const initials = [nameParts[0]?.[0], nameParts[1]?.[0]]
                  .filter(Boolean)
                  .join('')
                  .toUpperCase();
                return (
                  <li key={patient.id} className="flex items-center gap-3 py-2">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${patient.avatar || ''}`}
                        alt={name}
                      />
                      <AvatarFallback className="bg-primary-500 text-white font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
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
          <Button isLoading={loading} variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteMultiplePatientsDialog;
