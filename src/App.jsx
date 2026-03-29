import React from 'react';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ProjectDetail from './components/ProjectDetail';
import ProjectLinkPage from './components/ProjectLinkPage';

const projects = [
  {
    slug: 'finance',
    title: 'Finance',
    category: 'Fintech Platform',
    period: '2023',
    role: 'Lead Product Designer',
    summary: 'Fintech tools and analytics workflows for cross-functional risk and growth teams.',
    detail:
      'Designed a modular reporting experience for a multi-market fintech platform. The work reduced handoff friction between product, risk, and operations teams by introducing reusable dashboard patterns and clearer decision checkpoints.',
    capabilities: ['Design systems', 'Workflow mapping', 'Decision support'],
    outcomes: [
      'Unified risk and growth reporting across regional teams.',
      'Reduced decision latency by clarifying ownership at each checkpoint.',
      'Created reusable dashboard patterns for new product launches.',
    ],
    link: 'https://example.com/finance',
    linkLabel: 'Open Case Study',
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    category: 'Care Management CRM',
    period: '2024',
    role: 'UX Strategy Lead',
    summary: 'Service design and care experience systems for patient, clinician, and operations workflows.',
    detail:
      'Led the UX direction for a healthcare CRM concept focused on care continuity, fast triage, and transparent reporting. The prototype demonstrates information hierarchy, status communication, and scalable component behavior for complex dashboards.',
    capabilities: ['Patient operations', 'Triage UX', 'Service design'],
    outcomes: [
      'Structured the dashboard for clinicians, coordinators, and support staff.',
      'Improved visibility of vitals, reports, and care progression in one view.',
      'Established a scalable UI pattern for future healthcare workflow modules.',
    ],
    link: 'https://example.com/healthcare',
    linkLabel: 'Launch Prototype',
  },
  {
    slug: 'ios-app',
    title: 'iOS App',
    category: 'Mobile Product Concept',
    period: '2022',
    role: 'Product Designer',
    summary: 'Mobile-first product experiments with a focus on concise flows and gesture-native interactions.',
    detail:
      'Built and tested mobile interaction patterns for high-frequency user tasks. The concept explores onboarding compression, contextual navigation, and accessibility-aware UI states in constrained viewports.',
    capabilities: ['Mobile UX', 'Onboarding', 'Accessibility'],
    outcomes: [
      'Compressed setup flows for faster first-session completion.',
      'Explored gesture-led navigation patterns for frequent tasks.',
      'Balanced compact layouts with accessibility-aware tap targets.',
    ],
    link: 'https://example.com/ios-app',
    linkLabel: 'Open Concept',
  },
  {
    slug: 'dashboard',
    title: 'Dashboard',
    category: 'Enterprise Analytics',
    period: '2021',
    role: 'Experience Designer',
    summary: 'Data products and visual reporting designed for clarity, actionability, and trust.',
    detail:
      'Created a dashboard framework that balances executive-level summaries with drill-down depth for specialist users. Emphasis was placed on visual rhythm, status semantics, and reducing cognitive load in dense interfaces.',
    capabilities: ['Data visualization', 'Information hierarchy', 'Interaction design'],
    outcomes: [
      'Balanced top-level summaries with drill-down detail for specialists.',
      'Improved status semantics for high-density enterprise reporting.',
      'Lowered cognitive load through stronger visual rhythm and grouping.',
    ],
    link: 'https://example.com/dashboard',
    linkLabel: 'Open Overview',
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </HashRouter>
  );
}