
import './App.css'
import Logging from './logging/Logging'
import LogView from './logView/LogView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="content-container">
        <Router>
          <Routes>
            <Route path="/" element={<Logging />} />
            <Route path="/view" element={<LogView />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
