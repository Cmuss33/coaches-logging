import { useState } from 'react'
import './App.css'

function App() {
  const [coachName, setCoachName] = useState("");
  const [session, setSession] = useState("");
  const [hours, setHours] = useState("");


  const handleLog = () => {
    // call backend

    setCoachName("");
    setSession("");
    setHours("");
  }

  return (
    <>
      <div className='page-container'>
        <div className='title-container'>
          <span>Logging Hours</span>
        </div>
        <div className='coach-box'>
          <div className='input-row1'>
            <p className='input-header'>Coach Name</p>
            <select value={coachName} onChange={(e) => setCoachName(e.target.value)} className='picker'>
              <option value="">Select Coach</option>
              <option value="Coach 1">Coach 1</option>
              <option value="Coach 2">Coach 2</option>
              <option value="Coach 3">Coach 3</option>
            </select>
          </div>

          <div className='input-row2'>
            <p className='input-header'>Session</p>
            <select value={session} onChange={(e) => setSession(e.target.value)} className='picker'>
              <option value="">Select Session</option>
              <option value="Session 1">Session 1</option>
              <option value="Session 2">Session 2</option>
              <option value="Session 3">Session 3</option>
            </select>
          </div>

          <div className='input-row2'>
            <p className='input-header'>Number of Hours</p>
            <input type='text' placeholder='Number of Hours' value={hours} onChange={(e) => setHours(e.target.value)} className='picker'></input>
          </div>

          <div className='button-container'>
            <button className='set-button' onClick={handleLog}>Log Hours</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
