import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectDetail({ project }) {
  const previewPath = project.linkPath || `#/project/${project.slug}/link`;

  return (
    <section className="project-detail-page">
      <header className="project-detail-header">
        <Link to="/" className="project-detail-back" aria-label="Back to landing page">
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_left_alt
          </span>
        </Link>
        <h1>{project.title}</h1>
      </header>

      <p className="project-detail-copy">{project.detail}</p>

      {project.slug === 'healthcare' && (
        <section className="project-app-section" aria-label="Developed application preview">
          <h2 className="project-detail-subheading">Healthcare CRM</h2>
          <Link className="project-app-preview" to={`/project/${project.slug}/link`}>
            <div className="project-app-preview-top">
              <span className="project-app-chip">Patient Dashboard</span>
              <span className="project-app-chip">Vitals</span>
              <span className="project-app-chip">Reports</span>
            </div>
            <div className="project-app-preview-body">
              <div className="project-app-row" />
              <div className="project-app-grid">
                <div className="project-app-tile" />
                <div className="project-app-tile" />
                <div className="project-app-tile" />
                <div className="project-app-tile" />
              </div>
              <div className="project-app-table">
                <div className="project-app-table-row" />
                <div className="project-app-table-row" />
                <div className="project-app-table-row" />
              </div>
            </div>
            <p className="project-app-caption">Click to open the developed application</p>
          </Link>
        </section>
      )}

      <a
        className="project-detail-link-button"
        href={previewPath}
        target="_blank"
        rel="noreferrer"
      >
        Open Link
      </a>
    </section>
  );
}