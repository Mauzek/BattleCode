// App.tsx
import Calendar from '@/components/calendar/calendar';
import { generateRandomEvents, getInitialDate, mockEvents } from '@/components/calendar/mocks';
import type { TimeSlot } from '@/components/calendar/types';
import React, { useState } from 'react';

const CalendarIndex: React.FC = () => {
  const [events] = useState<TimeSlot[]>(mockEvents);
  const [useRandomEvents, setUseRandomEvents] = useState(false);
  const [randomEventsCount, setRandomEventsCount] = useState(20);

  const displayedEvents = useRandomEvents 
    ? generateRandomEvents(randomEventsCount)
    : events;

  return (
    <div className="app">
      <div >
        <h1 style={{fontSize:'1.25rem'}}>Календарь расписания</h1>
        <div className="controls">
          <label>
            <input
              type="checkbox"
              checked={useRandomEvents}
              onChange={(e) => setUseRandomEvents(e.target.checked)}
            />
            Использовать случайные события
          </label>
          
          {useRandomEvents && (
            <div className="random-controls">
              <label>
                Количество событий:
                <input
                  type="number"
                  value={randomEventsCount}
                  onChange={(e) => setRandomEventsCount(Number(e.target.value))}
                  min="1"
                  max="50"
                />
              </label>
            </div>
          )}
        </div>
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