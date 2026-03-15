import React from 'react';

export default function Header({ patient, onToggleSidebar }) {
  return (
    <div className="header">
      <div className="column column1">
        <button className="icon-button" onClick={() => window.history.back()}>
          <span className="material-icons">arrow_back</span>
        </button>
        <div className="patient-name">{patient.name}</div>
      </div>

      <div className="column column2">
        <div className="patient-info">
          Age: {patient.age}<br />
          Gender: {patient.gender}<br />
          Patient ID: {patient.id}
        </div>
      </div>

      <div className="column column3">
        <div className="patient-info">
          Admitted: {patient.admitted}<br />
          Time since ICU admission: {patient.icuTime}<br />
          Bed Number: {patient.bed}
        </div>
      </div>

      <div className="column column4 actions">
        <button className="black-btn">Contact patient Home</button>
        <button className="black-btn">Consult Another Doctor</button>
      </div>
    </div>
  );
}