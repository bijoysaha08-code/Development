import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  return (
    <section className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-logo" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>Bijoy.B</Link>
        <a
          href="mailto:bijoysaha08@gmail.com"
          className="header-mail-group"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: '#171D23',
            fontWeight: 400,
            fontSize: '14px',
            marginLeft: 'auto',
            marginRight: '1.5rem',
            padding: '0 1.2rem',
            borderRadius: '999px',
            transition: 'background 0.2s',
          }}
        >
          <span className="material-symbols-outlined" aria-hidden="true" style={{ fontSize: '20px', color: '#0F36FA' }}>mail</span>
          <span className="header-mail-text" style={{ display: 'inline' }}>bijoysaha08@gmail.com</span>
        </a>
        <a
          href="/portfolio/CV-UX-Designer-BijoySaha-15Years.pdf"
          download="CV-UX-Designer-BijoySaha-15Years.pdf"
          className="landing-hero-btn"
          style={{ marginRight: '72px', width: 'auto', padding: '0 2rem', fontWeight: 400, fontSize: '14px' }}
        >
          Resume
        </a>
      </header>

      <section className="main-hero-panel">
        <div className="main-hero-content">
          {/* Profile photo removed as requested */}
          <h1 style={{ color: '#171D23', textAlign: 'left', width: '100%', fontWeight: 300, fontSize: '80px', marginBottom: 0, letterSpacing: '-1%' }}>
            Specialized in
          </h1>
            <div style={{ color: '#171D23', textAlign: 'left', width: '100%', fontWeight: 600, fontSize: '80px', lineHeight: 1, marginTop: 0, letterSpacing: '-1%' }}>
              User Experience Design
          </div>
          <p className="landing-intro" style={{ textAlign: 'left', width: '100%' }}>
            I help organizations convert complexity into usable systems through narrative-driven UX,
            scalable components, and measurable interaction design.
          </p>
          <div className="landing-hero-actions" aria-label="Primary actions" style={{ justifyContent: 'flex-start' }}>
            <a
              href="mailto:bijoysaha08@gmail.com"
              className="landing-hero-btn landing-hero-btn-secondary"
              style={{ width: 'auto', padding: '0 2rem', fontWeight: 400, fontSize: '14px' }}
            >
              Contact
            </a>
          </div>
        </div>
      </section>

      <section id="projects" className="project-grid">
        {/* First row: Finance and Healthcare */}
        {projects.slice(0, 2).map((project, index) => (
          <Link key={project.slug} to={`/project/${project.slug}`} className="project-box-link">
            <article className="project-box">
              <div className="project-box-top">
                <span className="project-box-index">0{index + 1}</span>
                <span className="project-box-icon material-symbols-outlined" aria-hidden="true">
                  arrow_outward
                </span>
              </div>
              <div className="project-box-content">
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </div>
            </article>
          </Link>
        ))}
        {/* Second row: iOS App and Dashboard */}
        {projects.slice(2, 4).map((project, index) => (
          <Link key={project.slug} to={`/project/${project.slug}`} className="project-box-link">
            <article className="project-box">
              <div className="project-box-top">
                <span className="project-box-index">0{index + 3}</span>
                <span className="project-box-icon material-symbols-outlined" aria-hidden="true">
                  arrow_outward
                </span>
              </div>
              <div className="project-box-content">
                <h2>{project.title}</h2>
                <p>{project.summary}</p>
              </div>
            </article>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Portfolio;
