
import './App.css'
import Logging from './logging/Logging'
import LogView from './logView/LogView';
import CalendarView from './calendar/CalendarView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './header/Header';

function App() {
  return (
    <>
      <div className="content-container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Logging />} />
            <Route path="/view" element={<LogView />} />
            <Route path="/calendar" element={<CalendarView />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
