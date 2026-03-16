import React from "react";
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  return (
    <section className="landing-page">
      <header className="landing-header">
        <span className="landing-logo">Bijoy Saha</span>
      </header>

      <section className="landing-hero">
        <div>
          <p className="landing-kicker">Experience Design and Product Strategy</p>
          <h1>
            Specialized in System Design, Strategy, Storytelling, Enterprise Solutions, Design Systems{" "}
            <span className="hero-gradient-text">— leveraging Gen AI and modern UX design tools.</span>
          </h1>
          <p className="landing-intro">
            I help organizations convert complexity into usable systems through narrative-driven UX,
            scalable components, and measurable interaction design.
          </p>
          <div className="landing-hero-actions" aria-label="Primary actions">
            <a
              href="/portfolio/CV-UX-Designer-BijoySaha-15Years.pdf"
              download="CV-UX-Designer-BijoySaha-15Years.pdf"
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
