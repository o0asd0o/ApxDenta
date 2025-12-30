import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import type { StaffType } from '@repo/domain/db';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';
import React from 'react';
import { toast } from 'sonner';
import { useUpdateModalVisibility } from '../__common/context/context';
import { STAFF_FORMS } from '../add/context/context';
import UpdateStaffServices from './forms/UpdateAssignServices';
import { UpdateDaysOff } from './forms/UpdateDaysOff';
import UpdateStaffInfo from './forms/UpdateStaffInfo';
import UpdateWorkingHours from './forms/UpdateWorkingHours';

type Props = {
  type?: StaffType;
};
const UpdateStaff: React.FC<Props> = ({ type = 'DOCTOR' }) => {
  const [open, setOpen] = useUpdateModalVisibility();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="gap-0 absolute top-5 sm:top-10 right-2.5 sm:h-[calc(100%_-_80px)] h-[calc(100%_-_40px)] rounded-3xl w-[calc(100%-20px)] sm:max-w-[500px]">
        <SheetHeader className="border-b border-b-border px-4 py-3 h-14">
          <SheetTitle className="text-lg">Update staff</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100%_-_56px)] flex-1">
          <div className={cn('grid gap-2 overflow-y-hidden h-full')}>
            <div className="flex flex-col overflow-y-hidden h-full">
              <Root defaultValue={STAFF_FORMS[0].id}>
                <List className="w-fit">
                  {STAFF_FORMS.map((form) => (
                    <ListItem key={form.id} value={form.id}>
                      <div className="inline-flex gap-2 items-center whitespace-nowrap">
                        <span className=" [&>svg]:size-3.5">{form.icon}</span>
                        <span className="text-sm">{form.label}</span>
                      </div>
                    </ListItem>
                  ))}
                </List>
                <TabContent
                  value="staffInfo"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateStaffInfo
                    type={type}
                    onSubmitted={() => {
                      toast.success('Staff updated successfully');
                      setOpen(false);
                    }}
                  />
                </TabContent>
                <TabContent
                  value="assignedServices"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateStaffServices
                    onSubmitted={() => {
                      toast.success('Staff updated successfully');
                      setOpen(false);
                    }}
                  />
                </TabContent>
                <TabContent
                  value="workingHours"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateWorkingHours
                    onSubmitted={() => {
                      toast.success('Staff updated successfully');
                      setOpen(false);
                    }}
                  />
                </TabContent>

                <TabContent
                  value="dayOffs"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateDaysOff
                    onSubmitted={() => {
                      toast.success('Staff updated successfully');
                      setOpen(false);
                    }}
                  />
                </TabContent>
              </Root>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateStaff;
