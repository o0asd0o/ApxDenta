import { DialogDrawer } from '@/components/dialog/DialogDrawer';
import StepperComponent from '@/components/stepper/StepperComponent';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Form, SheetClose } from '@repo/ui/components';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import React from 'react';
import { type Resolver, type UseFormReturn, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { ZodTypeAny } from 'zod';
import {
  createLocalReservationId,
  formatTimeValue,
  getDateAtTime,
  getDateKey,
  getDurationInMinutes,
  getReservationConflict,
  isReservationRangeAvailable,
} from '../components/__helpers';
import type {
  BasicInformationFormValues,
  OralHygieneHabitsFormValues,
  ReservationAddSlot,
  TreatmentAndDentistFormValues,
  TreatmentOption,
  WaitlistFormValues,
  WaitlistReservationInput,
} from '../components/__types';
import type { Doctor, Patient, Reservation } from '../components/types';
import {
  useFormStepper,
  useFormValues,
  useStepperSteps,
  useStepperUtils,
} from './context/context';
import { BasicInformationForm } from './forms/BasicInformationForm';
import { OralHygieneHabitsForm } from './forms/OralHygieneHabitsForm';
import { TreatmentAndDentistForm } from './forms/TreatmentAndDentistForm';

type FormFieldValues = Partial<
  TreatmentAndDentistFormValues &
    BasicInformationFormValues &
    OralHygieneHabitsFormValues
>;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  slot: ReservationAddSlot;
  doctors: Doctor[];
  patients: Patient[];
  treatments: TreatmentOption[];
  reservations: Reservation[];
  onCreateReservation: (input: WaitlistReservationInput) => void;
};

const getDefaultFormValues = (slot: ReservationAddSlot): FormFieldValues => ({
  doctorId: slot.doctor.id,
  date: getDateKey(slot.date),
  startTime: formatTimeValue(slot.startTime),
  endTime: formatTimeValue(slot.endTime),
  note: '',
  attachedFiles: [],
  patientId: '',
  patientName: '',
  email: '',
  phoneNumber: '',
  lastDentalVisit: '',
  dentalCareStart: '',
  washTeethFrequency: '',
  oralHygieneDuration: '',
  changeToothBrushFrequency: '',
  usingMouthWash: true,
  usingDentalFloss: true,
});

export const CreateWaitlistReservation: React.FC<Props> = ({
  open,
  setOpen,
  slot,
  doctors,
  patients,
  treatments,
  reservations,
  onCreateReservation,
}) => {
  const stepper = useFormStepper();
  const utils = useStepperUtils();
  const steps = useStepperSteps();
  const [formValues, setFormValues] = useFormValues();

  const form = useForm<FormFieldValues>({
    mode: 'onTouched',
    resolver: zodResolver(
      stepper.current.schema as ZodTypeAny,
    ) as Resolver<FormFieldValues>,
    defaultValues: getDefaultFormValues(slot),
  });

  React.useEffect(() => {
    form.reset(getDefaultFormValues(slot));
  }, [form, slot]);

  const startTimeValue = form.watch('startTime');
  const endTimeValue = form.watch('endTime');

  const rangeError = React.useMemo(() => {
    if (!startTimeValue || !endTimeValue) return undefined;

    const startTime = getDateAtTime(slot.date, startTimeValue);
    const endTime = getDateAtTime(slot.date, endTimeValue);

    if (endTime <= startTime) return 'End time must be after start time.';

    const conflict = getReservationConflict({
      doctorId: slot.doctor.id,
      startTime,
      endTime,
      reservations,
    });

    if (conflict) {
      return `This time overlaps ${conflict.patient.name}'s appointment.`;
    }

    if (
      !isReservationRangeAvailable({
        doctorId: slot.doctor.id,
        startTime,
        endTime,
        reservations,
      })
    ) {
      return 'This time is not available for appointments.';
    }

    return undefined;
  }, [endTimeValue, reservations, slot.date, slot.doctor.id, startTimeValue]);

  const currentIndex =
    utils?.getIndex(
      stepper.current.id as
        | 'treatmentAndDentist'
        | 'basicInformation'
        | 'oralHygieneHabits',
    ) ?? 0;

  const createReservationInput = (
    values: WaitlistFormValues,
  ): WaitlistReservationInput | null => {
    const treatmentAndDentist = values.treatmentAndDentist;
    const basicInformation = values.basicInformation;

    if (!treatmentAndDentist || !basicInformation) return null;

    const startTime = getDateAtTime(slot.date, treatmentAndDentist.startTime);
    const endTime = getDateAtTime(slot.date, treatmentAndDentist.endTime);
    const treatment = treatments.find(
      (item) => item.id === treatmentAndDentist.treatmentId,
    );

    if (!treatment) return null;

    const existingPatient = patients.find(
      (patient) => patient.id === basicInformation.patientId,
    );
    const patient = existingPatient ?? {
      id: `local-patient-${createLocalReservationId()}`,
      name: basicInformation.patientName,
    };

    return {
      slot,
      treatment,
      patient,
      startTime,
      endTime,
      duration: getDurationInMinutes(startTime, endTime),
      note: treatmentAndDentist.note,
      oralHygieneHabits: values.oralHygieneHabits,
    };
  };

  const onSubmit = (values: FormFieldValues) => {
    const stepId = stepper.current.id as keyof WaitlistFormValues;
    const nextValues = {
      ...formValues,
      [stepId]: values,
    } as WaitlistFormValues;

    setFormValues?.(nextValues);

    if (!stepper.isLast) {
      if (stepId === 'treatmentAndDentist' && rangeError) {
        form.setError('endTime', { message: rangeError });
        return;
      }

      stepper.next();
      form.clearErrors();
      return;
    }

    const input = createReservationInput(nextValues);

    if (!input) {
      toast.error('Please complete the waitlist form before saving.');
      return;
    }

    if (
      !slot.doctor.isAvailable ||
      !isReservationRangeAvailable({
        doctorId: slot.doctor.id,
        startTime: input.startTime,
        endTime: input.endTime,
        reservations,
      })
    ) {
      toast.error('This time is no longer available.');
      return;
    }

    onCreateReservation(input);
    form.reset(getDefaultFormValues(slot));
    setOpen(false);
    toast.success(`${input.patient.name} - successfully registered`, {
      description: '#RSVA001 is waiting for payment',
    });
  };

  return (
    <Form {...form}>
      <DialogDrawer
        open={open}
        setOpen={setOpen}
        title="Add patient to waitlist"
        onSubmit={form.handleSubmit(onSubmit)}
        footer={
          <>
            {stepper.isFirst && (
              <SheetClose>
                <Button variant="ghost" className="w-[120px]" type="button">
                  Cancel
                </Button>
              </SheetClose>
            )}
            {!stepper.isFirst && (
              <Button
                variant="ghost"
                className="w-[120px]"
                onClick={() => {
                  stepper.prev();
                  form.clearErrors();
                }}
                type="button"
              >
                Back
              </Button>
            )}
            <Button type="submit" variant="primary" className="w-[120px]">
              {stepper.isLast ? 'Save' : 'Next'}
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-6">
          <StepperComponent
            form={form}
            currentIndex={currentIndex}
            stepper={stepper}
            stepsLength={steps?.length ?? 0}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={stepper.current.id}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              {stepper.switch({
                treatmentAndDentist: () => (
                  <TreatmentAndDentistForm
                    form={
                      form as unknown as UseFormReturn<TreatmentAndDentistFormValues>
                    }
                    slot={slot}
                    doctors={doctors}
                    treatments={treatments}
                    rangeError={rangeError}
                  />
                ),
                basicInformation: () => (
                  <BasicInformationForm
                    form={
                      form as unknown as UseFormReturn<BasicInformationFormValues>
                    }
                    patients={patients}
                    slot={slot}
                  />
                ),
                oralHygieneHabits: () => (
                  <OralHygieneHabitsForm
                    form={
                      form as unknown as UseFormReturn<OralHygieneHabitsFormValues>
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
