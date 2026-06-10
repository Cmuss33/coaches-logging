import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ToastContainer, toast } from "react-toastify";
import "./ScheduleView.css";

const localizer = momentLocalizer(moment);

const webAppUrl =
  "https://script.google.com/macros/s/AKfycbxcYrxEpPmQiz_U2Fvthkf582kdv6LazTQN0pVp9PuVmEjl53uoEGW9_Ent1zsZhDEjcA/exec";

const coaches = [
  "Aidan Wong",
  "Aiden Huang",
  "Alexis Li",
  "Ali Omar",
  "Alishba Faisal",
  "Alyssa Des Laurier",
  "Andrei Somersan",
  "Anjali Girdhar",
  "Antonio Marin",
  "Athan Pagiamitzis",
  "Brandon Butts",
  "Chloe Tang",
  "DJ Williams",
  "Dylan Kuo",
  "Hannah Ng",
  "Jaxon Mangbuat",
  "Jayden Shippey",
  "Jayden Wu",
  "Joshua Martins",
  "Joshua Sales",
  "Lauren Arce",
  "Luke Gelati",
  "Madison Durangos",
  "Mateo Chen",
  "Matthew Girdler",
  "Matthew Mallinos",
  "Mikayeel Akbari",
  "Nika Johari Majd",
  "Noah Hirji",
  "Paityn Wang",
  "Rawk Mustafa",
  "Sara Girdhar",
  "Theodore Oey",
  "Tyler Heng",
  "Xavier Bala"
];
/* =========================
   SCHEDULE BY DAY
========================= */
const scheduleByDay = {
  0: [
    "Sundays @ St. Augustine CHS, ITH - JK/SK",
    "Sundays @ St. Augustine CHS, Boys Comp 3-4",
    "Sundays @ St. Augustine CHS, Boys Comp 5-6",
    "Sundays @ St. Augustine CHS, Boys Comp 7-8",
    "Sundays @ St. Augustine CHS, Boys Comp 9-12",
    "Sundays @ Stouffville District SS, ITH Girls",
    "Sundays @ Stouffville District SS, Boys Comp 3-4",
    "Sundays @ Stouffville District SS, Boys Comp 5-6",
    "Sundays @ St. Robert CHS, ITH - GR 1/2",
    "Sundays @ St. Robert CHS, Boys Comp 3-4",
    "Sundays @ St. Robert CHS, Boys Comp 5-6",
    "Sundays @ St. Robert CHS, Girls 3-6",
    "OTHER",
  ],
  1: [
    "Mondays @ William Berczy PS, Girls 3-6",
    "Mondays @ Bur Oak SS, Boys SD 3-4",
    "Mondays @ ST. MONICA, ITH - Girls",
    "OTHER",
  ],
  2: [
    "Tuesdays @ SFX CES, ITH - JK/SK",
    "Tuesdays @ SFX CES, ITH - GR 1/2",
    "Tuesdays @ Cornell Village PS, Boys SD 3-4",
    "Tuesdays @ Pierre Elliott Trudeau HS, Boys SD 5-6",
    "OTHER",
  ],
  3: [
    "Wednesdays @ Victoria Square PS, Boys SD 3-6",
    "Wednesdays @ Victoria Square PS, Boys SD 7-8",
    "Wednesdays @ San Lorenzo Ruiz CES, Boys SD 7-8",
    "Wednesdays @ MOUNT JOY, ITH - JK/SK",
    "Wednesdays @ MOUNT JOY, ITH - GR 1/2",
    "OTHER",
  ],
  4: [
    "Thursdays @ ST. BRENDAN, ITH - JK/SK",
    "Thursdays @ ST. BRENDAN, ITH - GR 1/2",
    "Thursdays @ Markham Pan Am Centre, Girls SD 7-8",
    "OTHER",
  ],
  5: [
    "Fridays @ St. Kateri Tekakwitha CES, Boys SD 5-6",
    "Fridays @ St. Kateri Tekakwitha CES, Boys SD 7-8",
    "OTHER",
  ],
  6: [
    "Saturdays @ Pierre Elliott Trudeau HS, ITH - JK/SK",
    "Saturdays @ Pierre Elliott Trudeau HS, ITH - GR 1/2",
    "Saturdays @ Pierre Elliott Trudeau HS, ITH - Girls",
    "Saturdays @ Pierre Elliott Trudeau HS, Boys Comp 3-4",
    "Saturdays @ Pierre Elliott Trudeau HS, Boys Comp 5-6",
    "Saturdays @ Pierre Elliott Trudeau HS, Girls 3-6",
    "Saturdays @ Pierre Elliott Trudeau HS, Girls Comp 7-8",
    "Saturdays @ Pierre Elliott Trudeau HS, Girls Comp 9-12",
    "Saturdays @ St. Katharine Drexel CHS, Boys Comp 7-8",
    "Saturdays @ St. Katharine Drexel CHS, Boys Comp 9-12",
    "OTHER",
  ],
};

/* =========================
   SINGLE SOURCE OF TRUTH
   (COACHES + HOURS TOGETHER)
========================= */
const sessionDefaults = {
  "Sundays @ St. Augustine CHS, ITH - JK/SK": {
    coaches: ["Andrei Somersan"],
    hours: 1
  },
  "Sundays @ St. Augustine CHS, Boys Comp 3-4": {
    coaches: ["Andrei Somersan"],
    hours: 2
  },
  "Sundays @ St. Augustine CHS, Boys Comp 5-6": {
    coaches: ["Andrei Somersan"],
    hours: 2
  },
  "Sundays @ St. Augustine CHS, Boys Comp 7-8": {
    coaches: [
      "Andrei Somersan",
      "Matthew Girdler",
      "Mikayeel Akbari",
      "Noah Hirji",
      "Joshua Martins",
      "Theodore Oey"
    ],
    hours: 2
  },
  "Sundays @ St. Augustine CHS, Boys Comp 9-12": {
    coaches: [
      "Noah Hirji",
      "Brandon Butts",
      "Matthew Girdler",
      "Joshua Martins",
      "Antonio Marin"
    ],
    hours: 2
  },
  "Sundays @ Stouffville District SS, ITH Girls": {
    coaches: [
      "Brandon Butts",
    ],
    hours: 1
  },
  "Sundays @ Stouffville District SS, Boys Comp 3-4": {
    coaches: [
      "Brandon Butts",
      "Mikayeel Akbari"
    ],
    hours: 2
  },
  "Sundays @ Stouffville District SS, Boys Comp 5-6": {
    coaches: [
      "Brandon Butts",
      "Mikayeel Akbari"
    ],
    hours: 2
  },
  "Sundays @ St. Robert CHS, ITH - GR 1/2": {
    coaches: [
      "Jayden Shippey",
      "Xavier Bala"
    ],
    hours: 1
  },
  "Sundays @ St. Robert CHS, Boys Comp 3-4": {
    coaches: ["Jayden Shippey"],
    hours: 2
  },
  "Sundays @ St. Robert CHS, Boys Comp 5-6": {
    coaches: ["Jayden Shippey"],
    hours: 2
  },
  "Sundays @ St. Robert CHS, Girls 3-6": {
    coaches: ["Jayden Shippey", "Nika Johari Majd"],
    hours: 1.5
  },
  "Mondays @ William Berczy PS, Girls 3-6": {
    coaches: [
      "Alyssa Des Laurier",
      "Madison Durangos",
      "Chloe Tang",
      "Paityn Wang"
    ],
    hours: 1.5
  },
  "Mondays @ Bur Oak SS, Boys SD 3-4": {
    coaches: [
      "Rawk Mustafa",
      "Matthew Girdler"
    ],
    hours: 1.5
  },
  "Mondays @ ST. MONICA, ITH - Girls": {
    coaches: [
      "Jayden Shippey",
      "Lauren Arce"
    ],
    hours: 1
  },
  "Tuesdays @ SFX CES, ITH - JK/SK": {
    coaches: ["Jayden Shippey", "Dylan Kuo"],
    hours: 0.5
  },
  "Tuesdays @ SFX CES, ITH - GR 1/2": {
    coaches: ["Jayden Shippey", "Dylan Kuo"],
    hours: 1
  },
  "Tuesdays @ Cornell Village PS, Boys SD 3-4": {
    coaches: [
      "Alishba Faisal",
      "Matthew Mallinos",
    ],
    hours: 1.5
  },
  "Tuesdays @ Pierre Elliott Trudeau HS, Boys SD 5-6": {
    coaches: [
      "Xavier Bala",
      "Luke Gelati"
    ],
    hours: 1.5
  },
  "Wednesdays @ Victoria Square PS, Boys SD 3-6": {
    coaches: [
      "Jayden Shippey",
      "Xavier Bala",
      "Luke Gelati",
      "Rawk Mustafa",
      "Aiden Huang",
    ],
    hours: 1.5
  },
  "Wednesdays @ Victoria Square PS, Boys SD 7-8": {
    coaches: [
      "Jayden Shippey",
      "Luke Gelati"
    ],
    hours: 1.5
  },
  "Wednesdays @ San Lorenzo Ruiz CES, Boys SD 7-8": {
    coaches: ["Aidan Wong"],
    hours: 1.5
  },
  "Wednesdays @ MOUNT JOY, ITH - JK/SK": {
    coaches: ["Lauren Arce"],
    hours: 0.5
  },
  "Wednesdays @ MOUNT JOY, ITH - GR 1/2": {
    coaches: [
      "Lauren Arce",
      "Paityn Wang",
      "Matthew Mallinos"
    ],
    hours: 1
  },
  "Thursdays @ ST. BRENDAN, ITH - JK/SK": {
    coaches: ["Lauren Arce"],
    hours: 0.5
  },
  "Thursdays @ ST. BRENDAN, ITH - GR 1/2": {
    coaches: [
      "Lauren Arce",
      "Jaxon Mangbuat"
    ],
    hours: 1
  },
  "Thursdays @ Markham Pan Am Centre, Girls SD 7-8": {
    coaches: ["Paityn Wang"],
    hours: 1.5
  },
  "Fridays @ St. Kateri Tekakwitha CES, Boys SD 5-6": {
    coaches: [
      "Brandon Butts",
      "Aidan Wong",
      "Mateo Chen"
    ],
    hours: 1.5
  },
  "Fridays @ St. Kateri Tekakwitha CES, Boys SD 7-8": {
    coaches: [
      "Brandon Butts",
    ],
    hours: 1.5
  },
  "Saturdays @ Pierre Elliott Trudeau HS, ITH - Girls": {
    coaches: [],
    hours: 1
  },
  "Saturdays @ Pierre Elliott Trudeau HS, ITH - JK/SK": {
    coaches: ["Jayden Shippey"],
    hours: 1
  },
  "Saturdays @ Pierre Elliott Trudeau HS, ITH - GR 1/2": {
    coaches: [
      "Aidan Wong",
      "Mikayeel Akbari",
      "Xavier Bala",
      "Jaxon Mangbuat"
    ],
    hours: 1
  },
  "Saturdays @ Pierre Elliott Trudeau HS, Boys Comp 3-4": {
    coaches: [
      "Jayden Shippey",
      "Aidan Wong",
      "Mikayeel Akbari",
      "Xavier Bala",
      "Dylan Kuo",
    ],
    hours: 2
  },
  "Saturdays @ Pierre Elliott Trudeau HS, Boys Comp 5-6": {
    coaches: [
      "Jayden Shippey",
      "Aidan Wong",
      "Mikayeel Akbari",
      "Xavier Bala",
      "Dylan Kuo",
    ],
    hours: 2
  },
  "Saturdays @ Pierre Elliott Trudeau HS, Girls 3-6": {
    coaches: [
      "Jayden Shippey",
      "Alishba Faisal",
      "Lauren Arce",
      "Alexis Li"
    ],
    hours: 1.5
  },
  "Saturdays @ Pierre Elliott Trudeau HS, Girls Comp 7-8": {
    coaches: ["Alishba Faisal", "Hannah Ng",],
    hours: 2
  },
  "Saturdays @ Pierre Elliott Trudeau HS, Girls Comp 9-12": {
    coaches: ["Alishba Faisal", "Hannah Ng",],
    hours: 2
  },
  "Saturdays @ St. Katharine Drexel CHS, Boys Comp 7-8": {
    coaches: [
      "Noah Hirji",
      "Brandon Butts",
      "Andrei Somersan",
      "Athan Pagiamitzis"
    ],
    hours: 2
  },
  "Saturdays @ St. Katharine Drexel CHS, Boys Comp 9-12": {
    coaches: [
      "Noah Hirji",
      "Brandon Butts",
      "Andrei Somersan",
      "Athan Pagiamitzis"
    ],
    hours: 2
  }
};

/* =========================
   HELPERS
========================= */
const getSessionDefaults = (session) => {
  const data = sessionDefaults[session];

  if (!data) {
    return [{ coach: "", hours: "", session }];
  }

  return data.coaches.map((coach) => ({
    coach,
    hours: data.hours,
    session,
  }));
};

/* =========================
   COMPONENT
========================= */
const ScheduleView = () => {
  const [logs, setLogs] = useState([]);
  const [date, setDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(null);
  const [daySessions, setDaySessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionLogs, setSessionLogs] = useState([]);

  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchLogs = async () => {
    const res = await fetch(webAppUrl);
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const generateCalendarEvents = () => {
    const start = moment(date).startOf("month");
    const end = moment(date).endOf("month");
    const events = [];

    let d = start.clone();
    while (d.isSameOrBefore(end)) {
      const dayOfWeek = d.day();
      const sessions = scheduleByDay[dayOfWeek] || [];

      sessions.forEach((session) => {
        events.push({
          title: session,
          start: d.toDate(),
          end: d.toDate(),
        });
      });

      d.add(1, "day");
    }

    return events;
  };

  const calendarEvents = generateCalendarEvents();

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = slotInfo.start;
    const day = moment(clickedDate).day();

    setSelectedDate(clickedDate);
    setDaySessions(scheduleByDay[day] || []);
    setIsDayModalOpen(true);
  };

  const handleSessionClick = (session) => {
    const logsForSession = logs.filter(
      (log) =>
        log.session === session &&
        moment(log.day).isSame(selectedDate, "day")
    );

    setSelectedSession(session);

    if (logsForSession.length) {
      setSessionLogs(logsForSession);
    } else {
      setSessionLogs(getSessionDefaults(session));
    }

    setIsSessionModalOpen(true);
  };

  const handleEditLog = (index, field, value) => {
    const updated = [...sessionLogs];
    updated[index][field] = value;
    setSessionLogs(updated);
  };

  const addEmptyLog = () => {
    setSessionLogs([
      ...sessionLogs,
      { coach: "", hours: "", session: selectedSession },
    ]);
  };

  const removeLog = (index) => {
    setSessionLogs(sessionLogs.filter((_, i) => i !== index));
  };

  const handleSubmitAll = async () => {
    setIsSubmitting(true);
    for (const log of sessionLogs) {
      if (!log.coach || !log.hours) continue;

      const formData = new FormData();
      formData.append("coach", log.coach);
      formData.append("session", selectedSession);
      formData.append("hours", log.hours);
      formData.append(
        "day",
        moment(selectedDate).format("YYYY-MM-DD")
      );

      try {
        const res = await fetch(
          webAppUrl,
          {
            method: "POST",
            body: formData
          }
        );

        const data = await res.text(); // Apps Script returns plain text
        console.log(data);

        toast.success(`${log.coach} ${selectedSession} hours logged successfully!`, {
        });
      } catch (err) {
        console.error(err);
        toast.error(`ERROR: ${log.coach} ${selectedSession}`, {
          autoClose:false,
        });
      }
    }

    setIsSubmitting(false);
    setIsSessionModalOpen(false);
    fetchLogs();
  };

  const eventStyleGetter = (event) => {
    const isLogged = logs.some(
      (log) =>
        log.session === event.title &&
        moment(log.day).isSame(event.start, "day")
    );

    return {
      style: {
        backgroundColor: isLogged ? "#28a745" : "#3174ad", // green or default blue
        color: "white",
        borderRadius: "6px",
        border: "none",
        display: "block",
        fontSize: "11px",
      },
    };
  };

  return (
    <div style={{ height: "100vh", marginTop: "75px", padding: "10px" }}>
      <ToastContainer 
          position="top-center"
          autoClose={3000}  // 3 seconds
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        selectable
        date={date}
        onNavigate={(d) => setDate(d)}
        views={["month", "week", "agenda"]}
        defaultView="month"
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
        eventPropGetter={eventStyleGetter}
        showAllEvents
        style={{ height: "90%", marginTop: "20px", color: "black" }}
      />

      {/* DAY MODAL */}
      {isDayModalOpen && (
        <div className="modal-overlay" onClick={() => setIsDayModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">
              Sessions on {selectedDate?.toDateString()}
            </h2>

            <div className="sessions-list">
              {daySessions.map((session, idx) => (
                <div
                  key={idx}
                  className="session-card"
                  onClick={() => handleSessionClick(session)}
                >
                  {session}
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn ghost" onClick={() => setIsDayModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SESSION MODAL */}
      {isSessionModalOpen && (
        <div className="modal-overlay" onClick={() => setIsSessionModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{selectedSession}</h2>

            <div className="logs-container">
              {sessionLogs.map((log, idx) => (
                <div key={idx} className="log-row">
                  <select
                    className="input"
                    value={log.coach}
                    onChange={(e) => handleEditLog(idx, "coach", e.target.value)}
                  >
                    <option value="">Select Coach</option>
                    {coaches.map((coach) => (
                      <option key={coach} value={coach}>
                        {coach}
                      </option>
                    ))}
                  </select>
                  <input
                    className="input small"
                    type="number"
                    value={log.hours}
                    onChange={(e) =>
                      handleEditLog(idx, "hours", e.target.value)
                    }
                  />
                  <button
                    className="btn danger"
                    onClick={() => removeLog(idx)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button className="btn secondary" onClick={addEmptyLog}>
              + Add Coach
            </button>

            <div className="modal-actions">
              <button
                className="btn primary"
                onClick={handleSubmitAll}
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="spinner" /> : "Log All"}
              </button>
              <button
                className="btn ghost"
                onClick={() => setIsSessionModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleView;