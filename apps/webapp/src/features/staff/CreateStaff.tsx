import { DialogDrawer } from '@/components/DialogDrawer';
import StepperComponent from '@/components/stepper/StepperComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, SheetClose } from '@repo/ui/components';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import type { CreateStaffFormType } from './__types';
import {
  useFormStepper,
  useStepperSteps,
  useStepperUtls,
} from './add/context/context';
import { AssignedServicesForm } from './add/forms/AssignedServicesForm';
import { DaysOffForm } from './add/forms/DaysOffForm';
import { StaffInfoForm } from './add/forms/StaffInfoForm';
import { WorkingHoursForm } from './add/forms/WorkingHoursForm';

const CreateStaff: React.FC = () => {
  const stepper = useFormStepper();
  const utils = useStepperUtls();
  const steps = useStepperSteps();

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  });

  const onSubmit = (values: z.infer<typeof stepper.current.schema>) => {
    console.log(`Form values for step ${stepper.current.id}:`, values);
    if (stepper.isLast) {
      stepper.reset();
    } else {
      stepper.next();
    }
  };

  const currentIndex = utils?.getIndex(stepper.current.id) || 0;

  return (
    <Form {...form}>
      <DialogDrawer
        className="ml-auto"
        title="Add new Doctor Staff"
        actionText="Add Doctor"
        onSubmit={form.handleSubmit(onSubmit)}
        footer={
          <>
            {stepper.isFirst && (
              <SheetClose>
                <Button
                  variant="ghost"
                  className="w-[120px]"
                  onClick={() => stepper?.prev()}
                  type="button"
                >
                  Cancel
                </Button>
              </SheetClose>
            )}
            {!stepper.isFirst && (
              <Button
                variant="ghost"
                className="w-[120px]"
                onClick={() => stepper?.prev()}
                type="button"
              >
                Back
              </Button>
            )}

            <Button variant="primary" className="w-[120px]" type="submit">
              Next
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-6">
          <StepperComponent
            form={form}
            currentIndex={currentIndex}
            stepper={stepper}
            stepsLength={steps?.length || 0}
          />
          {stepper?.switch({
            assignedServices: () => (
              <AssignedServicesForm form={form as CreateStaffFormType} />
            ),
            daysOff: () => <DaysOffForm form={form as CreateStaffFormType} />,
            staffInfo: () => (
              <StaffInfoForm form={form as CreateStaffFormType} />
            ),
            workingHours: () => (
              <WorkingHoursForm form={form as CreateStaffFormType} />
            ),
          })}
        </div>
      </DialogDrawer>
    </Form>
  );
};

export default CreateStaff;
