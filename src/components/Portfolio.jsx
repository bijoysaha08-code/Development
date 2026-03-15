import React, { useState } from "react";

const Portfolio = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <section className="landing-page">
      <header className="landing-header">
        <a href="#" className="landing-logo">Bijoy Saha</a>
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
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#cv" onClick={() => setMenuOpen(false)}>Resume</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      <section className="landing-hero">
        <h1>Portfolio Landing Page</h1>
        <p>Select an area to explore my work.</p>
      </section>

      <section id="projects" className="project-grid">
        <article className="project-box">
          <h2>Finance</h2>
          <p>Fintech tools and analytics workflows.</p>
        </article>

        <article className="project-box">
          <h2>Healthcare</h2>
          <p>Open the existing healthcare interface.</p>
        </article>

        <article className="project-box">
          <h2>IOS app</h2>
          <p>Mobile-first product experiments.</p>
        </article>

        <article className="project-box">
          <h2>Dashboard</h2>
          <p>Data products and visual reporting.</p>
        </article>
      </section>
    </section>
  );
};

export default Portfolio;
