import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = (targetId) => {
    setMenuOpen(false);
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="landing-page">
      <header className="landing-header">
        <span className="landing-logo">Bijoy Saha</span>
        <button
          type="button"
          className="landing-menu-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`landing-menu ${menuOpen ? "open" : ""}`}>
          <button type="button" onClick={() => handleMenuClick('projects')}>Projects</button>
        </nav>
      </header>

      <section className="landing-hero">
        <div>
          <p className="landing-kicker">Experience Design and Product Strategy</p>
          <h1>
            Designing clear, high-trust digital products for enterprise and service-heavy teams.
          </h1>
          <p className="landing-intro">
            I help organizations convert complexity into usable systems through narrative-driven UX,
            scalable components, and measurable interaction design.
          </p>
          <div className="landing-hero-actions" aria-label="Primary actions">
            <a
              href="/portfolio/Bijoy-Saha-CV.txt"
              download="Bijoy-Saha-CV.txt"
              className="landing-hero-btn"
            >
              Download CV
            </a>
            <a
              href="mailto:bijoysaha08.code@gmail.com"
              className="landing-hero-btn landing-hero-btn-secondary"
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="project-grid">
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            to={`/project/${project.slug}`}
            className="project-box-link"
            onClick={() => setMenuOpen(false)}
          >
            <article className="project-box">
              <span className="project-box-index">0{index + 1}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <span className="project-box-cta">View case</span>
            </article>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Portfolio;
