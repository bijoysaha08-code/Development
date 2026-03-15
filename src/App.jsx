import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Portfolio from './components/Portfolio';

const patient = {
  name: 'Michael Johnson',
};

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/healthcare-crm" element={
              <>
                <div className="portfolio-strip">
                  <Link to="/" className="portfolio-strip-logo">Bijoy Saha</Link>
                  <nav className="portfolio-strip-links">
                    <Link to="/portfolio#projects">Projects</Link>
                    <Link to="/portfolio#cv">Resume</Link>
                    <Link to="/portfolio#contact">Contact</Link>
                  </nav>
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