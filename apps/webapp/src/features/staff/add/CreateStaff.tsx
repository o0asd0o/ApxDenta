import DoctorSeeder from '@/components/@seeders/DoctorSeeder';
import GenStaffSSeeder from '@/components/@seeders/GenStaffSeeder';
import { DialogDrawer } from '@/components/dialog/DialogDrawer';
import StepperComponent from '@/components/stepper/StepperComponent';
import { useUploadFile } from '@/hooks/upload/useUploadFile';
import { useActiveOrganization } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import type {
  AssignedServicesFormType,
  DayOffsFormType,
  StaffInfoFormType,
  WorkingHoursFormType,
} from '@repo/schemas';
import { Button, Form, SheetClose } from '@repo/ui/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type WritableDraft, produce } from 'immer';
import { PlusIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { invalidateStaffList } from '../__common/queries';
import {
  extractSpecialistIdFromValue,
  getExcludedAdditionalDayOffs,
} from '../__helpers';
import type { AllFormsType, CreateStaffFormType } from '../__types';
import {
  useAdditionalDayOff,
  useFormStepper,
  useFormValues,
  useStaffType,
  useStepperSteps,
  useStepperUtls,
} from './context/context';
import { AssignedServicesForm } from './forms/AssignedServicesForm';
import { DaysOffForm } from './forms/DaysOffForm';
import { StaffInfoForm } from './forms/StaffInfoForm';
import { WorkingHoursForm } from './forms/WorkingHoursForm';

const CreateStaff: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const stepper = useFormStepper();
  const utils = useStepperUtls();
  const steps = useStepperSteps();
  const [formValues, setFormValues] = useFormValues();
  const [additionDayOff] = useAdditionalDayOff();
  const type = useStaffType();
  const form = useForm({
    mode: 'onTouched',
    resolver: stepper?.current.schema
      ? // @ts-ignore type mismatch
        zodResolver(stepper.current?.schema)
      : undefined,
  });

  const { data: activeOrg } = useActiveOrganization();
  const trpc = useTRPC();

  const queryClient = useQueryClient();

  console.log({ stepper });
  const { mutateAsync: saveStaff, isPending } = useMutation(
    trpc.staffs.createStaff.mutationOptions({
      onSuccess: async () => {
        form.reset();
        setDrawerOpen(false);
        toast.success('Staff created successfully!');

        await invalidateStaffList(queryClient, trpc);
      },
      onError: (error) => {
        toast.error(
          error.message ||
            'There was an error while creating the staff. Please try again.',
        );
        setSubmitting(false);
      },
    }),
  );

  const [uploadFile] = useUploadFile();

  const onSubmit = useCallback(
    async (params: {
      id: typeof stepper.current.id;
      values: z.infer<typeof stepper.current.schema>;
    }) => {
      const { id, values: _values } = params;

      const currentValues = _values as AllFormsType[keyof AllFormsType];
      setFormValues?.(
        produce((_draft) => {
          const draft = _draft as WritableDraft<AllFormsType>;
          // @ts-ignore type mismatch
          draft[id] = currentValues;
        }),
      );

      if (stepper.isLast) {
        setSubmitting(true);
        const avatar = formValues?.staffInfo?.file as File;
        const savedFile = await uploadFile({ file: avatar });

        const dayOffs = getExcludedAdditionalDayOffs(
          additionDayOff,
          (currentValues as DayOffsFormType).dayOffs,
        );

        await saveStaff({
          type,
          staffInfo: {
            ...(formValues?.staffInfo as StaffInfoFormType),
            file: { id: savedFile.id },
            ...(type === 'DOCTOR' && {
              specialistId: extractSpecialistIdFromValue(formValues?.staffInfo),
            }),
          },
          assignedServices:
            formValues?.assignedServices as AssignedServicesFormType,
          dayOffs: { dayOffs },
          extraDayOffs: additionDayOff,
          workingHours: formValues?.workingHours as WorkingHoursFormType,
        });
        setSubmitting(false);
      } else {
        stepper.next();
      }
    },
    [
      setFormValues,
      saveStaff,
      uploadFile,
      type,
      formValues,
      additionDayOff,
      stepper,
    ],
  );

  const currentIndex =
    utils?.getIndex(
      stepper?.current.id as
        | 'assignedServices'
        | 'dayOffs'
        | 'workingHours'
        | 'staffInfo',
    ) || 0;

  const staffLabel = type === 'DOCTOR' ? 'Doctor' : 'Staff';

  return (
    <Form {...form}>
      <DialogDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        className="ml-auto"
        title={
          <span className="inline-flex">
            <span>Add new {staffLabel}</span>
            <>
              {type === 'DOCTOR' && <DoctorSeeder />}
              {type === 'STAFF' && <GenStaffSSeeder />}
            </>
          </span>
        }
        actionText={`Add ${staffLabel}`}
        disabledTooltip={
          !activeOrg ? 'You need to setup an organization first' : undefined
        }
        mobileIcon={<PlusIcon className="size-5" />}
        onSubmit={form.handleSubmit((values) =>
          onSubmit({
            id: stepper?.current.id as
              | 'assignedServices'
              | 'dayOffs'
              | 'workingHours'
              | 'staffInfo',
            values,
          }),
        )}
        footer={
          <>
            {stepper?.isFirst && (
              <SheetClose>
                <Button variant="ghost" className="w-[120px]" type="button">
                  Cancel
                </Button>
              </SheetClose>
            )}
            {!stepper?.isFirst && (
              <Button
                variant="ghost"
                className="w-[120px]"
                onClick={() => stepper?.prev()}
                type="button"
              >
                Back
              </Button>
            )}
            <Button
              type="submit"
              variant="primary"
              className="w-[120px]"
              disabled={isPending || submitting}
              isLoading={isPending || submitting}
              loadingText="Saving..."
            >
              {stepper?.isLast ? 'Save' : 'Next'}
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
          <AnimatePresence mode="wait">
            <motion.div
              key={stepper?.current?.id || 'empty'}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {stepper?.switch({
                assignedServices: () => (
                  <AssignedServicesForm form={form as CreateStaffFormType} />
                ),
                dayOffs: () => (
                  <DaysOffForm form={form as CreateStaffFormType} />
                ),
                staffInfo: () => (
                  <StaffInfoForm
                    type={type}
                    form={form as CreateStaffFormType}
                  />
                ),
                workingHours: () => (
                  <WorkingHoursForm form={form as CreateStaffFormType} />
                ),
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogDrawer>
    </Form>
  );
};

export default CreateStaff;
