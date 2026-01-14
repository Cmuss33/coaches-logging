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

  const coaches = [
    "Aidan Wong",
    "Aiden Huang",
    "Alexis Li",
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

  const sessions = [
    // Monday
    "Mondays @ William Berczy PS, Girls 3-6",
    "Mondays @ Bur Oak SS, Boys SD 3-4",
    "Mondays @ ST. MONICA, ITH - Girls",

    // Tuesday
    "Tuesdays @ SFX CES, ITH - JK/SK",
    "Tuesdays @ SFX CES, ITH - GR 1/2",
    "Tuesdays @ Cornell Village PS, Boys SD 3-4",
    "Tuesdays @ Pierre Elliott Trudeau HS, Boys SD 5-6",

    // Wednesday
    "Wednesdays @ Victoria Square PS, Boys SD 3-6",
    "Wednesdays @ Victoria Square PS, Boys SD 7-8",
    "Wednesdays @ San Lorenzo Ruiz CES, Boys SD 7-8",
    "Wednesdays @ MOUNT JOY, ITH - JK/SK",
    "Wednesdays @ MOUNT JOY, ITH - GR 1/2",

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
    "Sundays @ Stouffville District SS, ITH Girls",
    "Sundays @ Stouffville District SS, Boys Comp 3-4",
    "Sundays @ Stouffville District SS, Boys Comp 5-6",
    "Sundays @ St. Robert CHS, ITH - GR 1/2",
    "Sundays @ St. Robert CHS, Boys Comp 3-4",
    "Sundays @ St. Robert CHS, Boys Comp 5-6",
    "Sundays @ St. Robert CHS, Girls 3-6",
    
    "OTHER",
  ];

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
