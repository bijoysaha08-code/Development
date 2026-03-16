import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const strengths = [
    'Enterprise UX Strategy',
    'Service Blueprinting',
    'Design Systems',
    'Storytelling for Product Teams',
    'AI-Assisted Workflow Design',
  ];

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
          <button type="button" onClick={() => handleMenuClick('cv')}>Resume</button>
          <button type="button" onClick={() => handleMenuClick('contact')}>Contact</button>
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
            <button
              type="button"
              className="landing-hero-btn landing-hero-btn-secondary"
              onClick={() => handleMenuClick('contact')}
            >
              Contact
            </button>
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

      <section id="cv" className="landing-info" aria-label="Resume summary">
        <h2>Resume</h2>
        <p>
          Experience Designer focused on enterprise products, platform thinking, and end-to-end
          service journeys across healthcare, fintech, and internal tooling.
        </p>
        <div className="landing-tags" aria-label="Core strengths">
          {strengths.map((item) => (
            <span key={item} className="landing-tag">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section id="contact" className="landing-contact" aria-label="Contact details">
        <h2>Contact</h2>
        <p>Open to design leadership, consulting engagements, and collaborative product builds.</p>
        <div className="landing-contact-actions">
          <a href="mailto:bijoysaha08.code@gmail.com">bijoysaha08.code@gmail.com</a>
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href="https://github.com/bijoysaha08-code" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </section>
    </section>
  );
};

export default Portfolio;
