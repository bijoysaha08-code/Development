import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectLinkPage({ project }) {
  return (
    <section className="project-link-page">
      <header className="project-link-topbar">
        <Link
          to={`/project/${project.slug}`}
          className="project-detail-back"
          aria-label={`Back to ${project.title} details`}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            arrow_left_alt
          </span>
        </Link>
        <h1 className="project-link-title">{project.title} Link Page</h1>
      </header>

      <p className="project-detail-copy">
        This is dummy text for the Open Link destination page. You can replace this with real content,
        case studies, external URLs, or a downloadable document.
      </p>
    </section>
  );
}