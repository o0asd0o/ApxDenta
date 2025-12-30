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
import { toast } from 'sonner';
import { useUpdateModalVisibility } from '../__common/context/context';
import { PATIENT_FORMS } from '../add/context/context';
import UpdateBasicInfo from './forms/UpdateBasicInfo';
import UpdateOralHygiene from './forms/UpdateOralHygiene';

const UpdatePatient: React.FC = () => {
  const [open, setOpen] = useUpdateModalVisibility();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="gap-0 absolute top-5 sm:top-10 right-2.5 sm:h-[calc(100%_-_80px)] h-[calc(100%_-_40px)] rounded-3xl w-[calc(100%-20px)] sm:max-w-[500px]">
        <SheetHeader className="border-b border-b-border px-4 py-3 h-14">
          <SheetTitle className="text-lg">Update Patient</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-[calc(100%_-_56px)] flex-1">
          <div className={cn('grid gap-2 overflow-y-hidden h-full')}>
            <div className="flex flex-col overflow-y-hidden h-full">
              <Root defaultValue={PATIENT_FORMS[0].id}>
                <List className="w-full">
                  {PATIENT_FORMS.map((form) => (
                    <ListItem key={form.id} value={form.id}>
                      <div className="inline-flex gap-2 items-center whitespace-nowrap">
                        <span className="[&>svg]:size-3.5">{form.icon}</span>
                        <span className="text-sm">{form.label}</span>
                      </div>
                    </ListItem>
                  ))}
                </List>
                <TabContent
                  value="basicInfo"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateBasicInfo
                    onSubmitted={() => {
                      toast.success('Patient updated successfully');
                      setOpen(false);
                    }}
                  />
                </TabContent>
                <TabContent
                  value="oralHygiene"
                  className="flex flex-col p-0 h-[calc(100%_-_46px)]"
                >
                  <UpdateOralHygiene
                    onSubmitted={() => {
                      toast.success('Patient updated successfully');
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

export default UpdatePatient;
