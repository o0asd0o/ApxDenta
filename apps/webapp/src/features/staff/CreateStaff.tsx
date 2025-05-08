import { DrawerModal } from '@/components/DialogDrawer';
import { Button, SheetClose } from '@repo/ui/components';
import React from 'react';

const CreateStaff: React.FC = () => {
  return (
    <DrawerModal
      className="ml-auto"
      title="Add new Doctor Staff"
      actionText="Add Doctor"
      footer={
        <>
          <SheetClose asChild>
            <Button variant="ghost" className="w-[120px]">
              Cancel
            </Button>
          </SheetClose>
          <SheetClose>
            <Button variant="primary" className="w-[120px]">
              Next
            </Button>
          </SheetClose>
        </>
      }
    >
      asd
    </DrawerModal>
  );
};

export default CreateStaff;
