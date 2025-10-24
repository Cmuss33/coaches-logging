import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDateEvents, setSelectedDateEvents] = useState([]);
  const webAppUrl = "https://script.google.com/macros/s/AKfycbxcYrxEpPmQiz_U2Fvthkf582kdv6LazTQN0pVp9PuVmEjl53uoEGW9_Ent1zsZhDEjcA/exec";

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch(webAppUrl);
        const data = await res.json();
const eventsData = data.map(log => ({
  title: `${log.coach} -${log.session.split('@')[1] || log.session}`,
  start: new Date(log.day),
  end: new Date(log.day),
  resourceId: log.coach,
  hours: log.hours,
}));
        setEvents(eventsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, []);

  const handleSelectEvent = (event) => {
    console.log('Event selected:', event);
    setSelectedEvent(event);
  };

  const eventPropGetter = (event) => {
    return {
      style: {
        backgroundColor: '#176ebaff',
        fontSize: '12px' // Adjust the font size as needed
      },
    };
  };

return (
  <div className="calendar-view-container">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '110%', marginTop: '75px', color: 'black', padding: '10px'}}
        eventPropGetter={eventPropGetter}
        tooltipAccessor={(event) => `${event.title} - ${event.hours} hours`}
        date={date}
        onNavigate={(newDate) => setDate(newDate)}
        views={['month', 'week', 'agenda']}
        defaultView='month'
        onSelectEvent={handleSelectEvent}
      />
      {selectedEvent && (
        <div className="popup">
          <h2>{selectedEvent.title}</h2>
          <p>Hours: {selectedEvent.hours}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
      {selectedDateEvents.length > 0 && (
        <div className="popup">
          <h2>Events on {moment(selectedDateEvents[0].start).format('MMMM D, YYYY')}</h2>
          <ul>
            {selectedDateEvents.map((event, index) => (
              <li key={index}>{event.title} - {event.hours} hours</li>
            ))}
          </ul>
          <button onClick={() => setSelectedDateEvents([])}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
