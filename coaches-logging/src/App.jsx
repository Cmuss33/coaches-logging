
import './App.css'
import Logging from './logging/Logging'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="content-container">
        <Router>
          <Routes>
            <Route path="/" element={<Logging />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
