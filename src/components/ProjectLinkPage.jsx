import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ProjectLinkPage({ project }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  const navItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'calendar_month', label: 'Appointments' },
    { icon: 'person', label: 'Patients' },
    { icon: 'lab_research', label: 'Reports' },
    { icon: 'settings', label: 'Settings' },
  ];

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
                <button key={item.label} type="button" className="project-link-nav-item">
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {item.icon}
                  </span>
                  {sidebarExpanded && <span>{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          <button type="button" className="project-link-nav-item project-link-logout">
            <span className="material-symbols-outlined" aria-hidden="true">
              logout
            </span>
            {sidebarExpanded && <span>Logout</span>}
          </button>
        </aside>

        <div className="project-link-main" aria-label="Main dashboard area" />
      </section>
    </section>
  );
}