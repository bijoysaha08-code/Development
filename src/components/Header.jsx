import React from 'react';

export default function Header({ patient, onToggleSidebar }) {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="hamburger-btn" onClick={onToggleSidebar}>
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="heading-box">
          <button className="icon-button" onClick={() => window.history.back()}>
            <span className="material-icons">arrow_back</span>
          </button>
          <h1>{patient.name}</h1>
        </div>
      </div>
      <div>
        <button className="button">Contact patient Home</button>
        <button className="button">Consult Another Doctor</button>
      </div>
    </div>
  );
}