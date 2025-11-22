import Calendar from '@/components/calendar/calendar';
import { generateRandomEvents, getInitialDate, mockEvents } from '@/components/calendar/mocks';
import type { TimeSlot } from '@/components/calendar/types';
import React, { useState } from 'react';

const CalendarIndex: React.FC = () => {
  const [events] = useState<TimeSlot[]>(mockEvents);
  const [useRandomEvents] = useState(false);
  const [randomEventsCount] = useState(23);

  const displayedEvents = useRandomEvents 
    ? generateRandomEvents(randomEventsCount)
    : events;

    console.log(displayedEvents)
  return (
    <div className="app">
      <div >
        <h1 style={{fontSize:'1.25rem'}}>Календарь расписания</h1>
      </div>

      <Calendar 
        events={displayedEvents}
        startHour={0}
        endHour={24}
        initialDate={getInitialDate()}
      />
    </div>
  );
};

export default CalendarIndex;