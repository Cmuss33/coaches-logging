import { Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <>
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="header-btn">Log Hours</Link>
          <Link to="/view" className="header-btn">View Logs</Link>
        </div>
      </div>
    </>
  )
}

export default Header
