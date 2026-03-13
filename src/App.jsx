import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Vitals from './components/Vitals';
import ReportsTable from './components/ReportsTable';

const patient = {
  name: 'Michael Johnson',
  age: 45,
  id: 'P12345',
};

const vitalsData = [
  { label: 'Heart Rate', value: '78', unit: 'bpm' },
  { label: 'Blood Pressure', value: '120/80', unit: 'mmHg' },
  { label: 'Temperature', value: '98.6', unit: '°F' },
  { label: 'Oxygen Saturation', value: '98%', unit: '' },
];

const reportsData = [
  { date: '2024-01-15', type: 'Blood Test', status: 'Complete' },
  { date: '2024-01-10', type: 'X-Ray', status: 'Pending' },
  { date: '2024-01-05', type: 'ECG', status: 'Complete' },
];

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar isExpanded={sidebarExpanded} toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />
      <div className="main-content">
        <Header patient={patient} onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />
        <div className="container">
          <div className="card">
            <h2>Vitals</h2>
            <Vitals vitals={vitalsData} />
          </div>
          <div className="card">
            <h2>Recent Reports</h2>
            <ReportsTable reports={reportsData} />
          </div>
        </div>
      </div>
    </div>
  );
}