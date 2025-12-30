import { Button, V2 } from '@repo/ui/components';
import { EditIcon, MoreVertical, Trash2 } from 'lucide-react';
import {
  useDeletePatientAction,
  useUpdatePatientAction,
} from './__common/context/context';
import type { PatientColumnType } from './__types';

export const RenderPatientActions = (actions: {
  patientId: string;
  name: string;
  original: PatientColumnType;
}) => {
  const onShowUpdateModal = useUpdatePatientAction();
  const onShowDeleteModal = useDeletePatientAction();

  return (
    <div className="flex justify-end">
      <V2.DropdownMenu modal={false}>
        <V2.DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreVertical className="h-4 w-4" />
          </Button>
        </V2.DropdownMenuTrigger>
        <V2.DropdownMenuContent className="min-w-46">
          <V2.DropdownMenuLabel>Actions</V2.DropdownMenuLabel>
          <V2.DropdownMenuSeparator />
          <V2.DropdownMenuGroup>
            <V2.DropdownMenuItem
              onClick={() =>
                onShowUpdateModal({
                  patientId: actions.patientId,
                  name: actions.name,
                })
              }
            >
              <span className="flex items-center gap-x-2">
                <EditIcon className="size-4 text-inherit" />
                <span>Edit Patient</span>
              </span>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() =>
                onShowDeleteModal({
                  id: actions.patientId,
                  name: actions.name,
                  avatar: actions.original.avatar?.url || null,
                })
              }
            >
              <span className="flex items-center gap-x-2 text-red-500">
                <Trash2 className="size-4 text-inherit" />
                <span>Delete</span>
              </span>
            </V2.DropdownMenuItem>
          </V2.DropdownMenuGroup>
          <V2.DropdownMenuSeparator />
        </V2.DropdownMenuContent>
      </V2.DropdownMenu>
    </div>
  );
};
