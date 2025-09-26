import { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Header from '../header/Header'
import "react-toastify/dist/ReactToastify.css";
import './Logging.css'

function Logging() {
  const today = new Date().toISOString().split("T")[0];

  const [coachName, setCoachName] = useState("");
  const [session, setSession] = useState("");
  const [hours, setHours] = useState("");
  const [day, setDay] = useState(today);
  const [loading, setLoading] = useState(false);

  const coaches = ["Coach 1", "Coach 2", "Coach 3"];
  const sessions = ["Session 1", "Session 2", "Session 3"];

  const handleLog = async () => {
  if (!coachName || !session || !hours) {
    toast.error("Please fill all fields");
    return;
  }

  setLoading(true);

  const formData = new FormData();
  formData.append("coach", coachName);
  formData.append("session", session);
  formData.append("hours", hours);
  formData.append("day", day);

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxcYrxEpPmQiz_U2Fvthkf582kdv6LazTQN0pVp9PuVmEjl53uoEGW9_Ent1zsZhDEjcA/exec",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.text(); // Apps Script returns plain text
    console.log(data);

    toast.success("Hours logged successfully!");
    setCoachName("");
    setSession("");
    setHours("");
  } catch (err) {
    console.error(err);
    toast.error("Failed to log hours");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Header />
      <div className='page-container'>
        <ToastContainer 
          position="top-center"
          autoClose={3000}  // 3 seconds
          newestOnTop={true}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='title-container'>
          <span>Logging Hours</span>
        </div>
        <div className='coach-box'>
          <div className='input-row1'>
            <p className='input-header'>Coach Name</p>
            <select value={coachName} onChange={(e) => setCoachName(e.target.value)} className='picker'>
              <option value="">Select Coach</option>
              {coaches.map((coach) => (
                <option key={coach} value={coach}>
                  {coach}
                </option>
              ))}
            </select>
          </div>

          <div className='input-row2'>
            <p className='input-header'>Session</p>
            <select value={session} onChange={(e) => setSession(e.target.value)} className='picker'>
              <option value="">Select Session</option>
              {sessions.map((session) => (
                <option key={session} value={session}>
                  {session}
                </option>
              ))}
            </select>
          </div>

          <div className='input-row2'>
            <p className='input-header'>Day Worked</p>
            <input type='date' value={day} onChange={(e) => setDay(e.target.value)} className='picker' />
          </div>

          <div className='input-row2'>
            <p className='input-header'>Number of Hours</p>
            <input type='text' placeholder='Number of Hours' value={hours} onChange={(e) => setHours(e.target.value)} className='picker'></input>
          </div>

          <div className='button-container'>
            <button className='set-button' onClick={handleLog} disabled={loading}>
              {loading ? 'Loading...' : 'Log Hours'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Logging
