import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarView.css';
import Modal from './Modal'; // Assuming we'll create a Modal component

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        onDrillDown={(date) => {
          const eventsOnDate = events.filter(event => moment(event.start).isSame(date, 'day'));
          setSelectedDate(date);
          setIsModalOpen(true);
        }}
      />
      {isModalOpen && (
        <Modal
          date={selectedDate}
          events={events.filter(event => moment(event.start).isSame(selectedDate, 'day'))}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {selectedEvent && (
        <div className="popup">
          <h2>{selectedEvent.title}</h2>
          <p>Hours: {selectedEvent.hours}</p>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
