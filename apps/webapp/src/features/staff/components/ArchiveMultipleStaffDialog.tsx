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
import type { StaffColumnType } from '../__types';

interface ArchiveMultipleStaffDialogProps {
  open: boolean;
  loading: boolean;
  setOpen: (open: boolean) => void;
  onArchive: () => void;
  staffs?: StaffColumnType[];
}

const ArchiveMultipleStaffDialog: React.FC<ArchiveMultipleStaffDialogProps> = ({
  open,
  loading,
  setOpen,
  onArchive,
  staffs,
}) => {
  const count = staffs?.length || 0;
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
          {staffs && staffs.length > 0 && (
            <ul className="mt-4 text-xs text-gray-600 list-disc list-inside">
              {staffs.map((staff) => {
                const name = `${staff.firstName} ${staff.lastName}`;
                return (
                  <li key={staff.id} className="flex items-center gap-3 py-2">
                    <Avatar className="size-9">
                      <AvatarImage
                        src={`${import.meta.env.VITE_PUBLIC_CDN_URL}${staff.avatar?.url as string}`}
                        alt={name}
                      />
                      <AvatarFallback className="bg-amber-500 text-white font-bold">
                        {[name.split(' ')[0][0], name.split(' ')[1][0]]
                          .join('')
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">Dr. {name}</span>
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

export default ArchiveMultipleStaffDialog;
