import PatientSeeder from '@/components/@seeders/PatientSeender';
import { DialogDrawer } from '@/components/dialog/DialogDrawer';
import StepperComponent from '@/components/stepper/StepperComponent';
import { useUploadFile } from '@/hooks/upload/useUploadFile';
import { useActiveOrganization } from '@/lib/auth-client';
import { useTRPC } from '@/lib/trpc';
import { zodResolver } from '@hookform/resolvers/zod';
import type {
  PatientBasicInfoFormType,
  PatientOralHygieneFormType,
} from '@repo/schemas';
import { Button, Form, SheetClose } from '@repo/ui/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type WritableDraft, produce } from 'immer';
import { PlusIcon } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React, { useCallback, useState } from 'react';
import { type UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import type { PatientFormValuesType } from './__types';
import {
  useFormStepper,
  useFormValues,
  useStepperSteps,
  useStepperUtils,
} from './context/context';
import BasicInfoForm from './forms/BasicInfoForm';
import OralHygieneForm from './forms/OralHygieneForm';

const CreatePatient: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [uploadFile] = useUploadFile();

  const stepper = useFormStepper();
  const utils = useStepperUtils();
  const steps = useStepperSteps();
  const [formValues, setFormValues] = useFormValues();

  const form = useForm({
    mode: 'onTouched',
    resolver: stepper.current.schema
      ? // @ts-ignore type mismatch between step schemas
        zodResolver(stepper.current.schema)
      : undefined,
  });

  const { data: activeOrg } = useActiveOrganization();

  const { mutateAsync: createPatient, isPending } = useMutation(
    trpc.patients.createPatient.mutationOptions({
      onSuccess: async () => {
        toast.success('Patient created successfully');
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: trpc.patients.getAllPatients.queryKey(),
          }),
          queryClient.invalidateQueries({
            queryKey: trpc.patients.getTotalPatients.queryKey(),
          }),
        ]);

        form.reset();
        setDrawerOpen(false);
        setSubmitting(false);
      },
      onError: (error) => {
        toast.error(
          `Failed to create patient: ${error.message || 'Unknown error'}`,
        );
        setSubmitting(false);
      },
    }),
  );

  const onSubmit = useCallback(
    async (params: {
      id: typeof stepper.current.id;
      values: z.infer<typeof stepper.current.schema>;
    }) => {
      const { id, values: _values } = params;

      const currentValues = _values as
        | PatientBasicInfoFormType
        | PatientOralHygieneFormType;
      setFormValues?.(
        produce((_draft) => {
          const draft = _draft as WritableDraft<PatientFormValuesType>;
          // @ts-ignore type mismatch
          draft[id] = currentValues;
        }),
      );

      if (stepper.isLast) {
        setSubmitting(true);
        const basicInfo = formValues?.basicInfo as PatientBasicInfoFormType;
        const oralHygiene = currentValues as PatientOralHygieneFormType;

        // Upload avatar if file exists
        let avatarId: string | undefined;
        if (basicInfo.file && basicInfo.file instanceof File) {
          const savedFile = await uploadFile({ file: basicInfo.file });
          avatarId = savedFile.id;
        }

        await createPatient({
          firstName: basicInfo.firstName,
          lastName: basicInfo.lastName,
          email: basicInfo.email,
          phoneNumber: basicInfo.phoneNumber,
          address: basicInfo.address,
          age: basicInfo.age,
          gender: basicInfo.gender,
          avatarId,
          dentalCareStart: oralHygiene.dentalCareStart,
          lastDentalVisit: oralHygiene.lastDentalVisit,
          oralHygieneDuration: oralHygiene.oralHygieneDuration,
          washTeethFrequency: oralHygiene.washTeethFrequency,
          changeToothBrushFrequency: oralHygiene.changeToothBrushFrequency,
          usingDentalFloss: oralHygiene.usingDentalFloss,
          usingMouthWash: oralHygiene.usingMouthWash,
        });
      } else {
        stepper.next();
        form.clearErrors();
      }
    },
    [setFormValues, createPatient, formValues, stepper, form, uploadFile],
  );

  const currentIndex =
    utils?.getIndex(stepper?.current.id as 'basicInfo' | 'oralHygiene') || 0;

  return (
    <Form {...form}>
      <DialogDrawer
        open={drawerOpen}
        setOpen={setDrawerOpen}
        className="ml-auto"
        title={
          <span className="inline-flex">
            <span>Add new Patient</span>
            <PatientSeeder />
          </span>
        }
        actionText="Add Patient"
        disabledTooltip={
          !activeOrg ? 'You need to setup an organization first' : undefined
        }
        mobileIcon={<PlusIcon className="size-5" />}
        onSubmit={form.handleSubmit((values) =>
          onSubmit({
            id: stepper?.current.id as 'basicInfo' | 'oralHygiene',
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
                onClick={() => {
                  stepper?.prev();
                  form.clearErrors();
                }}
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
                basicInfo: () => (
                  <BasicInfoForm
                    form={
                      form as unknown as UseFormReturn<PatientBasicInfoFormType>
                    }
                  />
                ),
                oralHygiene: () => (
                  <OralHygieneForm
                    form={
                      form as unknown as UseFormReturn<PatientOralHygieneFormType>
                    }
                  />
                ),
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogDrawer>
    </Form>
  );
};

export default CreatePatient;
