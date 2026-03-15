import React from "react";
import { Link } from "react-router-dom";

const Portfolio = () => {
  return (
    <section className="landing-page">
      <header className="landing-header">
        <Link to="/" className="landing-logo">Bijoy Saha</Link>
        <nav className="landing-menu">
          <a href="#projects">Projects</a>
          <a href="#cv">Resume</a>
          <a href="#contact">Contact</a>
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
          <a href="#" aria-disabled="true">Coming Soon</a>
        </article>

        <article className="project-box project-box-active">
          <h2>Healthcare</h2>
          <p>Open the existing healthcare interface.</p>
          <Link to="/healthcare-crm">Open Healthcare</Link>
        </article>

        <article className="project-box">
          <h2>IOS app</h2>
          <p>Mobile-first product experiments.</p>
          <a href="#" aria-disabled="true">Coming Soon</a>
        </article>

        <article className="project-box">
          <h2>Dashboard</h2>
          <p>Data products and visual reporting.</p>
          <a href="#" aria-disabled="true">Coming Soon</a>
        </article>
      </section>

      <section id="cv" className="landing-info">
        <h3>CV</h3>
        <p>Add your CV link or downloadable resume here.</p>
      </section>

      <section id="contact" className="landing-info">
        <h3>Contact</h3>
        <p>Add your email, LinkedIn, and other contact links here.</p>
      </section>
    </section>
  );
};

export default Portfolio;
