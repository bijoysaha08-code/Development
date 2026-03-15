import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Vitals from './components/Vitals';
import ReportsTable from './components/ReportsTable';
import Portfolio from './components/Portfolio';

const patient = {
  name: 'Michael Johnson',
  age: 54,
  gender: 'Male',
  id: '230145',
  admitted: '01/18/2026 (18:32:52)',
  icuTime: '4 Days',
  bed: '#8F9890090 ICU',
};

const vitalsData = [
  { title: 'Blood Pressure', value: '220 / 120', badge: 'Rising', note: 'Above post-tPA target. Review IV antihypertensive.' },
  { title: 'Heart Rate', value: '112 bpm', badge: 'Irregular', note: 'Persistent tachycardia for 3 hrs.' },
  { title: 'SpO2', value: '91%', badge: 'Ventilator', note: 'Below target despite oxygen.' },
  { title: 'Temperature', value: '38.4°C', badge: 'Normal', note: 'Persistent fever → evaluate infection.' },
  { title: 'Urine Output', value: '400 ml', badge: 'Declining', note: 'May indicate dehydration or AKI.' },
];

const reportsData = [
  { name: 'CT', result: 'Acute Stroke', date: '12/02/2026', priority: 'Very High', status: 'Completed' },
  { name: 'Echo', result: 'Normal', date: '12/02/2026', priority: 'Very High', status: 'Completed' },
  { name: 'Fasting Blood Glucose', result: '215', date: '12/02/2026', priority: 'Very High', status: 'Completed' },
  { name: 'Thyroid-Stimulating Hormone (TSH)', result: '34', date: '12/02/2026', priority: 'Very High', status: 'Completed' },
  { name: 'Renal Function Test', result: '9.65', date: '12/02/2026', priority: 'Very High', status: 'Completed' },
  { name: 'Latest chest X-ray', result: '-', date: '14/02/2026', priority: 'Very High', status: 'In Progress' },
];

const TABS = ['Reports', 'Assessment', 'Prescription'];

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('Assessment');

  return (
    <Router>
      <div className="app-layout">
        <Sidebar isExpanded={sidebarExpanded} toggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />
        <div className="main-content">
          <nav style={{ marginBottom: '1rem' }}>
            <Link to="/portfolio" className="button">Portfolio</Link>
          </nav>
          <Routes>
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/healthcare-crm" element={
              <>
                <Header patient={patient} onToggleSidebar={() => setSidebarExpanded(!sidebarExpanded)} />

                <div className="alert">
                  Need urgent review as patient having higher BP
                </div>

                <div className="section-title">Vitals</div>
                <Vitals data={vitalsData} />

                <div className="tabs">
                  {TABS.map((tab) => (
                    <button
                      key={tab}
                      className={`tab${activeTab === tab ? ' active' : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="table-container">
                  {activeTab === 'Assessment' && <ReportsTable reports={reportsData} />}
                  {activeTab === 'Reports' && <p>No reports available.</p>}
                  {activeTab === 'Prescription' && <p>No prescriptions available.</p>}
                </div>

                <div className="footer-actions">
                  <button className="button cancel">Cancel</button>
                  <button className="button submit">Submit</button>
                </div>
              </>
            } />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}