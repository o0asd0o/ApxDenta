import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components';
import React from 'react';
import type { ReservationRescheduleRequest } from './__types';

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  request: ReservationRescheduleRequest | null;
  onConfirm: () => void;
};

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

const RescheduleReservationDialog: React.FC<Props> = ({
  open,
  setOpen,
  request,
  onConfirm,
}) => {
  const patientName = request?.reservation.patient.name;
  const doctorName = request
    ? `Drg ${request.doctor.firstName} ${request.doctor.lastName}`
    : '';

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Reschedule Appointment</DialogTitle>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-gray-700">
            Move
            {patientName ? (
              <span className="font-semibold text-gray-900">
                {' '}
                {patientName}
              </span>
            ) : (
              ' this appointment'
            )}{' '}
            to <span className="font-semibold text-gray-900">{doctorName}</span>{' '}
            from{' '}
            <span className="font-semibold text-gray-900">
              {request ? formatTime(request.startTime) : ''}
            </span>{' '}
            to{' '}
            <span className="font-semibold text-gray-900">
              {request ? formatTime(request.endTime) : ''}
            </span>
            ? This will update the appointment time in the current calendar.
          </p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleReservationDialog;
