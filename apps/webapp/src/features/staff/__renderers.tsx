import { BASE_SCHEDULES } from '@/constants/schedules';
import { cn } from '@/lib/utils';
import type { WorkingDay } from '@repo/domain/db';
import { Button, V2 } from '@repo/ui/components';
import { EditIcon, EyeIcon, MoreVertical, Trash2Icon } from 'lucide-react';
import { useUpdateStaffIdAction } from './update/context/context';

export const renderWorkingDays = (
  value: { day: WorkingDay }[],
  className?: string,
) => {
  return (
    <div className={cn('gap-1 flex flex-wrap', className)}>
      {Object.keys(BASE_SCHEDULES).map((sched) => {
        const hit = value.some((item) => item.day === (sched as WorkingDay));

        const label = BASE_SCHEDULES[sched as WorkingDay];
        return (
          <div
            key={sched}
            className={cn(
              'h-5.5 w-5.5 rounded-full bg-gray-200 flex  text-gray-400 items-center justify-center text-[10px] font-medium',
              hit && 'bg-[#61B0FF] text-primary-foreground border-blue-400',
            )}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export const RenderStaffActions = (actions: {
  staffId: string;
  onView: (staffId: string) => void;
  onDelete: (staffId: string) => void;
}) => {
  const onShowUpdateModal = useUpdateStaffIdAction();

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
              onClick={() => actions.onView(actions.staffId)}
            >
              <span className="flex items-center gap-x-2">
                <EyeIcon className="size-4 text-inherit" />
                <span>View Doctor</span>
              </span>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() => onShowUpdateModal(actions.staffId)}
            >
              <span className="flex items-center gap-x-2">
                <EditIcon className="size-4 text-inherit" />
                <span>Update Doctor</span>
              </span>
            </V2.DropdownMenuItem>
            <V2.DropdownMenuItem
              onClick={() => actions.onDelete(actions.staffId)}
            >
              <span className="flex items-center gap-x-2 text-red-500">
                <Trash2Icon className="size-4 text-inherit" />
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
