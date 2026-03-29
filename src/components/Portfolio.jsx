import React from 'react';
import { Link } from 'react-router-dom';

const Portfolio = ({ projects }) => {
  return (
    <section className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-logo">Bijoy.B</Link>
        <a
          href="mailto:bijoysaha08@gmail.com"
          className="header-mail-group header-mail-group-custom"
        >
          <span className="material-symbols-outlined header-mail-icon" aria-hidden="true">mail</span>
          <span className="header-mail-text header-mail-text-inline">Let's Connect</span>
        </a>
        <a
          href="/portfolio/CV-UX-Designer-BijoySaha-15Years.pdf"
          download="CV-UX-Designer-BijoySaha-15Years.pdf"
          className="landing-hero-btn landing-hero-btn-custom"
        >
          Resume
        </a>
      </header>

      <section className="main-hero-panel">
        <div className="main-hero-content">
          {/* Profile photo removed as requested */}
          <h1 className="main-hero-title">Specialized in</h1>
          <div className="main-hero-subtitle">User Experience Design</div>
          <p className="landing-intro landing-intro-custom">
            I help organizations convert complexity into usable systems through narrative-driven UX,
            scalable components, and measurable interaction design.
          </p>
          <div className="landing-hero-actions landing-hero-actions-custom" aria-label="Primary actions">
            <a
              href="mailto:bijoysaha08@gmail.com"
              className="landing-hero-btn landing-hero-btn-custom"
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
            <article className={`project-box ${index === 0 ? 'finance-box' : 'healthcare-box'}`}>
              <h2 className="custom-heading">{index === 0 ? 'Finance' : 'Healthcare'}</h2>
              <p className="custom-desc">
                {index === 0
                  ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate arcu hendrerit tortor auctor, et egestas augue accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
                  : 'Nam tempus interdum enim, eu rhoncus magna tincidunt nec. Mauris sed nunc vitae magna molestie posuere et sit amet dui.'}
              </p>
            </article>
          </Link>
        ))}
        {/* Second row: iOS App and Dashboard */}
        {projects.slice(2, 4).map((project, index) => (
          <Link key={project.slug} to={`/project/${project.slug}`} className="project-box-link">
            <article className={`project-box ${index === 0 ? 'iosapp-box' : 'dashboard-box'}`}>
              <h2 className="custom-heading">{index === 0 ? 'IOS App' : 'Dashboard'}</h2>
              <p className="custom-desc">
                {index === 0
                  ? 'Nullam venenatis diam et faucibus tincidunt. Proin dolor massa, tristique a erat at, sodales mollis lectus. Nulla facilisi.'
                  : 'Curabitur vitae turpis feugiat neque suscipit sollicitudin id vitae augue.'}
              </p>
            </article>
          </Link>
        ))}
      </section>
    </section>
  );
};

export default Portfolio;
