import { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './LogView.css';

function LogView() {
  const [logs, setLogs] = useState([]);
  const [coachFilter, setCoachFilter] = useState("");
  const [sessionFilter, setSessionFilter] = useState("");
  const [dayFilter, setDayFilter] = useState("");

  // List of coaches and sessions (you can import this from a constants file)
  const coaches = ["Coach 1", "Coach 2", "Coach 3"];
  const sessions = ["Session 1", "Session 2", "Session 3"];

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
  );
}

export default LogView;
