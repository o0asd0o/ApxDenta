import { Button, V2 } from '@repo/ui/components';
import { Link } from '@tanstack/react-router';
import { ArchiveIcon, EditIcon, EyeIcon, MoreVertical } from 'lucide-react';
import {
  useArchiveTreatmentIdAction,
  useUpdateTreatmentIdAction,
} from './__common/context/context';
import type { TreatmentColumnType } from './__types';

export const RenderTreatmentActions = (actions: {
  treatmentId: string;
  name: string;
  original: TreatmentColumnType;
}) => {
  const onShowUpdateModal = useUpdateTreatmentIdAction();
  const onShowArchiveModal = useArchiveTreatmentIdAction();

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
            <V2.DropdownMenuItem>
              <Link
                to="/treatments/$treatmentId"
                params={{ treatmentId: actions.treatmentId }}
              >
                <span className="flex items-center gap-x-2">
                  <EyeIcon className="size-4 text-inherit" />
                  <span>View Treatment</span>
                </span>
              </Link>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() =>
                onShowUpdateModal({
                  treatmentId: actions.treatmentId,
                  name: actions.name,
                })
              }
            >
              <span className="flex items-center gap-x-2">
                <EditIcon className="size-4 text-inherit" />
                <span>Update Treatment</span>
              </span>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() => onShowArchiveModal(actions.original)}
            >
              <span className="flex items-center gap-x-2 text-red-500">
                <ArchiveIcon className="size-4 text-inherit" />
                <span>Archive</span>
              </span>
            </V2.DropdownMenuItem>
          </V2.DropdownMenuGroup>
          <V2.DropdownMenuSeparator />
        </V2.DropdownMenuContent>
      </V2.DropdownMenu>
    </div>
  );
};
