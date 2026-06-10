import React from 'react';
import './Modal.css';

const Modal = ({ date, events, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Events on {date.toLocaleDateString()}</h2>
        <ul>
          {events
            .sort((a, b) => a.title.localeCompare(b.title))
            .map((event, index) => (
            <li key={index}>{event.title} <br />{event.hours} hours</li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
