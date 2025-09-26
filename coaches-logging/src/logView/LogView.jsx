import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Header from '../header/Header'
import "react-toastify/dist/ReactToastify.css";
import './LogView.css';

function LogView() {
  const [logs, setLogs] = useState([]);
  const [coachFilter, setCoachFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");

  // List of coaches and sessions (you can import this from a constants file)
  const coaches = [
    "Aiden Huang",
    "Alexis Li",
    "Alishba Faisal",
    "Alyssa Des Laurier",
    "Andrei Somersan",
    "Antonio Marin",
    "Athan Pagiamitzis",
    "Brandon Butts",
    "Chloe Tang",
    "DJ Williams",
    "Dylan Kuo",
    "Hannah Ng",
    "Jayden Shippey",
    "Joshua Martins",
    "Lauren Arce",
    "Luke Gelati",
    "Madison Durangos",
    "Mateo Chen",
    "Matthew Girdler",
    "Matthew Mallinos",
    "Mikayeel Akbari",
    "Nicki Bagherhisal",
    "Nika Johari Majd",
    "Noah Hirji",
    "Rawk Mustafa",
    "Sara Girdhar",
    "Tyler Heng", 
    "Xavier Bala"
  ]; 

  const sessions = [
    // Monday
    "Mondays @ ST. MONICA, ITH - Girls",
    "Mondays @ William Berczy PS, Girls 3-6",
    "Mondays @ Bur Oak SS, Boys SD 3-4",

    // Tuesday
    "Tuesdays @ SFX CES, ITH - JK/SK",
    "Tuesdays @ SFX CES, ITH - GR 1/2",
    "Tuesdays @ Cornell Village PS, Boys SD 3-4",
    "Tuesdays @ Pierre Elliott Trudeau HS, Boys SD 5-6",

    // Wednesday
    "Wednesdays @ MOUNT JOY, ITH - JK/SK",
    "Wednesdays @ MOUNT JOY, ITH - GR 1/2",
    "Wednesdays @ Victoria Square PS, Boys SD 3-4",
    "Wednesdays @ Victoria Square PS, Boys SD 5-6",
    "Wednesdays @ Victoria Square PS, Boys SD 7-8",
    "Wednesdays @ San Lorenzo Ruiz CES, Boys SD 7-8",

    // Thursday
    "Thursdays @ ST. BRENDAN, ITH - JK/SK",
    "Thursdays @ ST. BRENDAN, ITH - GR 1/2",
    "Thursdays @ Markham Pan Am Centre, Girls SD 7-8",

    // Friday
    "Fridays @ St. Kateri Tekakwitha CES, Boys SD 5-6",
    "Fridays @ St. Kateri Tekakwitha CES, Boys SD 7-8",

    // Saturday
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

    // Sunday
    "Sundays @ St. Augustine CHS, ITH - JK/SK",
    "Sundays @ St. Augustine CHS, Boys Comp 3-4",
    "Sundays @ St. Augustine CHS, Boys Comp 5-6",
    "Sundays @ St. Augustine CHS, Boys Comp 7-8",
    "Sundays @ St. Augustine CHS, Boys Comp 9-12",
    "Sundays @ St. Robert CHS, ITH - GR 1/2",
    "Sundays @ St. Robert CHS, Boys Comp 3-4",
    "Sundays @ St. Robert CHS, Boys Comp 5-6",
    "Sundays @ Stouffville District SS, Boys Comp 3-4",
    "Sundays @ Stouffville District SS, Boys Comp 5-6"
  ];
  


  const webAppUrl = "https://script.google.com/macros/s/AKfycbxcYrxEpPmQiz_U2Fvthkf582kdv6LazTQN0pVp9PuVmEjl53uoEGW9_Ent1zsZhDEjcA/exec";

  // Fetch logs on mount
  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch(webAppUrl);
      const data = await res.json();
      setLogs(data);
      console.log(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch logs");
    }
  };

  // Filter logs based on selected filters
  const filteredLogs = logs.filter(log => {
    return (
      (coachFilter === "" || log.coach === coachFilter) &&
      (sessionFilter === "" || log.session === sessionFilter) &&
      (dayFilter === "" || log.day === dayFilter)
    );
  });

  return (
    <>
        <Header />
        <div className="page-container">
        <ToastContainer 
            position="top-center"
            autoClose={3000} 
            newestOnTop={true}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />

        <div className="title-container">
            <span>View Logged Hours</span>
        </div>

        <div className="filters">
            <select value={coachFilter} onChange={e => setCoachFilter(e.target.value)} className="filter-picker1">
            <option value="">All Coaches</option>
            {coaches.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="filter-picker2">
            <option value="">All Sessions</option>
            {sessions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <input 
            type="date" 
            value={dayFilter} 
            onChange={e => setDayFilter(e.target.value)} 
            className="filter-picker2"
            />
        </div>

        <table className="log-table">
            <thead>
            <tr>
                <th className='filter-header'>Coach</th>
                <th className='filter-header'>Session</th>
                <th className='filter-header'>Hours</th>
                <th className='filter-header'>Day</th>
                <th className='filter-header'>Timestamp</th>
            </tr>
            </thead>
            <tbody>
            {filteredLogs.length === 0 ? (
                <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>No logs found</td>
                </tr>
            ) : (
                filteredLogs.map((log, idx) => (
                <tr key={idx}>
                    <td className='filter-header'>{log.coach}</td>
                    <td className='filter-header'>{log.session}</td>
                    <td className='filter-header'>{log.hours}</td>
                    <td className='filter-header'>{log.day.slice(0, 10)}</td>
                    <td className='filter-header'>{log.timestamp.slice(0, 10)}</td>
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    </>
  );
}

export default LogView;
