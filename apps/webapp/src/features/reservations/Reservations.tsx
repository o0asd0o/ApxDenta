import {
  List,
  ListItem,
  Root,
  TabContent,
} from '@/components/tabs/NavigationTabs';
import { useQueryState } from 'nuqs';
import React, { useMemo, useState } from 'react';
import {
  CalendarHeader,
  DayView,
  type ViewMode,
  WeekView,
  mockDoctors,
  mockReservations,
} from './components';

const Reservations: React.FC = () => {
  const [activeTab, setActiveTab] = useQueryState('tab', {
    defaultValue: 'calendar',
  });
  const [viewMode, setViewMode] = useState<ViewMode>('Day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctorId, setSelectedDoctorId] = useState('all');

  // Filter doctors based on selection
  const filteredDoctors = useMemo(() => {
    if (selectedDoctorId === 'all') return mockDoctors;
    return mockDoctors.filter((d) => d.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // Filter reservations based on selected doctor
  const filteredReservations = useMemo(() => {
    if (selectedDoctorId === 'all') return mockReservations;
    return mockReservations.filter((r) => r.doctor.id === selectedDoctorId);
  }, [selectedDoctorId]);

  // Get week start date for week view
  const weekStartDate = useMemo(() => {
    const date = new Date(selectedDate);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    date.setDate(diff);
    return date;
  }, [selectedDate]);

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
            onDateChange={setSelectedDate}
            onViewModeChange={setViewMode}
            onDoctorChange={setSelectedDoctorId}
          />

          {/* Calendar view */}
          <div className="flex-1 min-h-0 overflow-hidden">
            {viewMode === 'Day' ? (
              <DayView
                date={selectedDate}
                doctors={filteredDoctors}
                reservations={filteredReservations}
              />
            ) : (
              <WeekView
                startDate={weekStartDate}
                doctors={filteredDoctors}
                reservations={filteredReservations}
              />
            )}
          </div>
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
