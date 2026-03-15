import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectLinkPage({ project }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState('Home');

  const navItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'calendar_month', label: 'Appointments' },
    { icon: 'person', label: 'Patients' },
    { icon: 'lab_research', label: 'Reports' },
    { icon: 'settings', label: 'Settings' },
  ];

  const pageCopy = {
    Home: 'This is the Home dashboard area. Use this section for quick patient overview, alerts, and shortcuts.',
    Appointments:
      'This is the Appointments area. Use this section for schedules, doctor availability, and booking updates.',
    Patients:
      'This is the Patients area. Use this section for profile details, history, and treatment records.',
    Reports: 'This is the Reports area. Use this section for test results, summaries, and analytics.',
    Settings: 'This is the Settings area. Use this section for account preferences and system configurations.',
    Logout: 'This is the Logout placeholder area. You can connect this action to a real sign-out workflow.',
  };

  return (
    <section className="project-link-page">
      <header className="project-link-topbar">
        <Link
          to={`/project/${project.slug}`}
          className="project-link-back-button"
          aria-label={`Back to ${project.title} details`}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_left_alt
          </span>
          <span className="project-link-title">Back</span>
        </Link>
      </header>

      <section className="project-link-dashboard" aria-label="Healthcare dashboard preview">
        <aside
          className={`project-link-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
          aria-label="Dashboard navigation"
        >
          <div className="project-link-sidebar-top">
            <div className="project-link-logo" aria-label="AH logo">
              AH
            </div>

            <button
              type="button"
              className="project-link-toggle"
              aria-label={sidebarExpanded ? 'Collapse navigation' : 'Expand navigation'}
              onClick={() => setSidebarExpanded((value) => !value)}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                {sidebarExpanded ? 'close' : 'menu'}
              </span>
            </button>

            <nav className="project-link-nav" aria-label="Primary">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`project-link-nav-item ${activePage === item.label ? 'active' : ''}`}
                  aria-current={activePage === item.label ? 'page' : undefined}
                  onClick={() => setActivePage(item.label)}
                >
                  <span className="project-link-icon-box" aria-hidden="true">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {item.icon}
                    </span>
                  </span>
                  {sidebarExpanded && <span className="project-link-nav-label">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className={`project-link-nav-item project-link-logout ${activePage === 'Logout' ? 'active' : ''}`}
            aria-current={activePage === 'Logout' ? 'page' : undefined}
            onClick={() => setActivePage('Logout')}
          >
            <span className="project-link-icon-box" aria-hidden="true">
              <span className="material-symbols-outlined" aria-hidden="true">
                logout
              </span>
            </span>
            {sidebarExpanded && <span className="project-link-nav-label">Logout</span>}
          </button>
        </aside>

        <div className="project-link-main" aria-label="Main dashboard area">
          <div className="project-link-main-content">
            <h2>{activePage}</h2>
            <p>{pageCopy[activePage]}</p>
          </div>
        </div>
      </section>
    </section>
  );
}