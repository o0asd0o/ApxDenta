import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@repo/ui/components';
import { cn } from '@repo/ui/lib/utils';
import React from 'react';
import { STAFF_FORMS } from '../add/context/context';
import { useUpdateModalVisibility } from './context/context';
import UpdateStaffServices from './forms/UpdateAssignServices';
import UpdateStaffInfo from './forms/UpdateStaffInfo';

const UpdateStaff: React.FC = () => {
  const [open, setOpen] = useUpdateModalVisibility();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="gap-0 absolute top-10 right-2.5 h-[calc(100%_-_80px)] rounded-3xl w-[calc(100%-20px)] sm:max-w-[500px]">
        <SheetHeader className="border-b border-b-border px-4 py-3 h-14">
          <SheetTitle className="text-lg">Update staff </SheetTitle>
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
                  <UpdateStaffInfo onSubmitted={() => setOpen(false)} />
                </TabContent>
                <TabContent
                  value="assignedServices"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateStaffServices onSubmitted={() => setOpen(false)} />
                </TabContent>

                {/* <TabContent value="assignedServices">
                  General Staff content
                </TabContent> */}
              </Root>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateStaff;
