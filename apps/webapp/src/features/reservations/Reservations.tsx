import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { useDeferredDisclosure } from '@/hooks/use-deferred-disclosure';
import { useQueryState } from 'nuqs';
import React, { useMemo, useState } from 'react';
import { CreateWaitlistReservation } from './add/CreateWaitlistReservation';
import { CreateWaitlistProvider } from './add/context/CreateWaitlistProvider';
import CalendarHeader from './components/CalendarHeader';
import DayView from './components/DayView';
import RescheduleReservationDialog from './components/RescheduleReservationDialog';
import ReservationFilterDialog from './components/ReservationFilterDialog';
import WeekView from './components/WeekView';
import {
  createLocalReservationId,
  getMockPatientOptions,
  getMockTreatmentOptions,
} from './components/__helpers';
import type {
  ReservationAddSlot,
  ReservationRescheduleRequest,
  WaitlistReservationInput,
} from './components/__types';
import { mockDoctors, mockReservations } from './components/mockData';
import {
  type ReservationFilterType,
  hasReservationFilters,
  reservationMatchesFilters,
} from './components/reservationFilters';
import type { Reservation, ViewMode } from './components/types';

const Reservations: React.FC = () => {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: 'calendar',
  });
  const [viewMode, setViewMode] = useState<ViewMode>('Day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctorId, setSelectedDoctorId] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<ReservationFilterType>({});
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);
  const waitlist = useDeferredDisclosure<ReservationAddSlot>();
  const [rescheduleRequest, setRescheduleRequest] =
    useState<ReservationRescheduleRequest | null>(null);

  const hasActiveFilters = hasReservationFilters(filters);

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const matchesDoctor =
        selectedDoctorId === 'all' ||
        reservation.doctor.id === selectedDoctorId;

      return matchesDoctor && reservationMatchesFilters(reservation, filters);
    });
  }, [selectedDoctorId, filters, reservations]);

  const filteredDoctors = useMemo(() => {
    const visibleDoctors =
      selectedDoctorId === 'all'
        ? mockDoctors
        : mockDoctors.filter((doctor) => doctor.id === selectedDoctorId);
    const appointmentCounts = new Map<string, number>();

    for (const reservation of filteredReservations) {
      appointmentCounts.set(
        reservation.doctor.id,
        (appointmentCounts.get(reservation.doctor.id) ?? 0) + 1,
      );
    }

    return visibleDoctors.map((doctor) => ({
      ...doctor,
      todayAppointments: appointmentCounts.get(doctor.id) ?? 0,
    }));
  }, [selectedDoctorId, filteredReservations]);

  // Get week start date for week view
  const weekStartDate = useMemo(() => {
    const date = new Date(selectedDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    date.setDate(diff);
    return date;
  }, [selectedDate]);

  const showNoFilterResults =
    hasActiveFilters && filteredReservations.length === 0;

  const patientOptions = useMemo(
    () => getMockPatientOptions(reservations),
    [reservations],
  );
  const treatmentOptions = useMemo(
    () => getMockTreatmentOptions(reservations),
    [reservations],
  );

  const handleCreateReservation = (input: WaitlistReservationInput) => {
    setReservations((currentReservations) => [
      ...currentReservations,
      {
        id: createLocalReservationId(),
        startTime: input.startTime,
        endTime: input.endTime,
        duration: input.duration,
        status: 'PENDING',
        note: input.note,
        doctor: input.slot.doctor,
        patient: input.patient,
        treatment: input.treatment,
      },
    ]);
  };

  const handleConfirmReschedule = () => {
    if (!rescheduleRequest) return;

    setReservations((currentReservations) =>
      currentReservations.map((reservation) => {
        if (reservation.id !== rescheduleRequest.reservation.id) {
          return reservation;
        }

        return {
          ...reservation,
          doctor: rescheduleRequest.doctor,
          startTime: rescheduleRequest.startTime,
          endTime: rescheduleRequest.endTime,
          duration: rescheduleRequest.duration,
        };
      }),
    );
    setRescheduleRequest(null);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <Root defaultValue={activeTab ?? 'calendar'} onChangeTab={setActiveTab}>
        <List>
          <ListItem value="calendar">Calendar</ListItem>
          <ListItem value="log">Log History</ListItem>
        </List>
        <TabContent
          value="calendar"
          className="py-5 gap-5 flex flex-col flex-1 min-h-0 overflow-hidden"
        >
          {/* Calendar header */}
          <CalendarHeader
            date={selectedDate}
            viewMode={viewMode}
            totalAppointments={filteredReservations.length}
            doctors={mockDoctors}
            selectedDoctorId={selectedDoctorId}
            hasFilters={hasActiveFilters}
            onDateChange={setSelectedDate}
            onViewModeChange={setViewMode}
            onDoctorChange={setSelectedDoctorId}
            onFilterClick={() => setFilterOpen(true)}
          />

          {/* Calendar view */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {showNoFilterResults ? (
              <div className="flex h-full items-center justify-center rounded-lg border bg-white text-sm font-medium text-gray-500">
                No matching reservations found. Adjust or reset filters to see
                appointments.
              </div>
            ) : viewMode === 'Day' ? (
              <DayView
                date={selectedDate}
                doctors={filteredDoctors}
                reservations={filteredReservations}
                validationReservations={reservations}
                onAddSlot={waitlist.show}
                onRequestReschedule={setRescheduleRequest}
              />
            ) : (
              <WeekView
                startDate={weekStartDate}
                doctors={filteredDoctors}
                reservations={filteredReservations}
                validationReservations={reservations}
                onAddSlot={waitlist.show}
              />
            )}
          </div>

          <ReservationFilterDialog
            open={filterOpen}
            setOpen={setFilterOpen}
            defaultFilters={filters}
            reservations={reservations}
            applyFilters={setFilters}
          />

          {waitlist.value && (
            <CreateWaitlistProvider
              key={`${waitlist.value.doctor.id}-${waitlist.value.startTime.toISOString()}`}
            >
              <CreateWaitlistReservation
                open={waitlist.open}
                setOpen={waitlist.setOpen}
                slot={waitlist.value}
                doctors={mockDoctors}
                patients={patientOptions}
                treatments={treatmentOptions}
                reservations={reservations}
                onCreateReservation={handleCreateReservation}
              />
            </CreateWaitlistProvider>
          )}

          <RescheduleReservationDialog
            open={!!rescheduleRequest}
            setOpen={(open) => {
              if (!open) setRescheduleRequest(null);
            }}
            request={rescheduleRequest}
            onConfirm={handleConfirmReschedule}
          />
        </TabContent>
        <TabContent value="log" className="py-5 gap-5 flex flex-col flex-1">
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Log History coming soon...
          </div>
        </TabContent>
      </Root>
    </div>
  );
};

export default Reservations;
