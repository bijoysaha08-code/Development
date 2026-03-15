import React from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import ProjectLinkPage from './components/ProjectLinkPage';

const projects = [
  {
    slug: 'finance',
    title: 'Finance',
    summary: 'Fintech tools and analytics workflows.',
    detail:
      'Placeholder sub text for the Finance page. Add the project overview, business context, key decisions, and measurable outcomes here.',
    link: 'https://example.com/finance',
    linkPath: '/project/healthcare/financelink',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    summary: 'Service design and care experience systems.',
    detail:
      'Placeholder sub text for the Healthcare page. Add the problem space, user journey improvements, and enterprise UX decisions here.',
    link: 'https://example.com/healthcare',
    linkPath: '/project/healthcare/healthcarelink',
  },
  {
    slug: 'ios-app',
    title: 'IOS app',
    summary: 'Mobile-first product experiments.',
    detail:
      'Placeholder sub text for the IOS app page. Add the product vision, mobile interactions, and implementation highlights here.',
    link: 'https://example.com/ios-app',
    linkPath: '/project/healthcare/iosapplink',
  },
  {
    slug: 'dashboard',
    title: 'Dashboard',
    summary: 'Data products and visual reporting.',
    detail:
      'Placeholder sub text for the Dashboard page. Add the reporting framework, visualization strategy, and insights delivered here.',
    link: 'https://example.com/dashboard',
    linkPath: '/project/healthcare/dashboardlink',
  },
];

function ProjectDetailRoute() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.slug === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectDetail project={project} />;
}

function ProjectLinkRoute() {
  const { projectId } = useParams();
  const project = projects.find((entry) => entry.slug === projectId);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return <ProjectLinkPage project={project} />;
}

export default function App() {
  return (
    <HashRouter>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Portfolio projects={projects} />} />
          <Route path="/project/:projectId" element={<ProjectDetailRoute />} />
          <Route path="/project/:projectId/link" element={<ProjectLinkRoute />} />
          <Route path="/project/healthcare/financelink" element={<ProjectLinkPage project={projects[0]} />} />
          <Route path="/project/healthcare/healthcarelink" element={<ProjectLinkPage project={projects[1]} />} />
          <Route path="/project/healthcare/iosapplink" element={<ProjectLinkPage project={projects[2]} />} />
          <Route path="/project/healthcare/dashboardlink" element={<ProjectLinkPage project={projects[3]} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}