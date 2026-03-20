import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import ReportsTable from './ReportsTable';

const patient = {
  name: 'Aarav Mehta',
  summary: '42 years old · Follow-up for respiratory recovery · Assigned to Dr. Iqbal',
  branch: 'Kolkata South',
  careStage: 'Observation',
};

const reports = [
  {
    name: 'CBC Panel',
    result: 'Normal',
    date: '18 Mar 2026',
    priority: 'Routine',
    status: 'Reviewed',
  },
  {
    name: 'Chest X-Ray',
    result: 'Improving infiltrates',
    date: '17 Mar 2026',
    priority: 'High',
    status: 'Shared with pulmonology',
  },
  {
    name: 'CRP',
    result: '6 mg/L',
    date: '16 Mar 2026',
    priority: 'Routine',
    status: 'Trend improving',
  },
];

const appointments = [
  {
    title: 'Pulmonology follow-up',
    time: '20 Mar · 10:30 AM',
    owner: 'Dr. Iqbal',
  },
  {
    title: 'Nutrition review',
    time: '22 Mar · 1:00 PM',
    owner: 'R. Sen',
  },
  {
    title: 'Discharge planning call',
    time: '23 Mar · 4:30 PM',
    owner: 'Care coordination',
  },
];

const overviewQuickStats = [
  {
    name: 'Critical Alerts',
    value: '3',
  },
  {
    name: 'Pending Approvals',
    value: '7',
  },
  {
    name: 'ICU Patients',
    value: '12',
    alertText: '3 Review Pending',
    alertTone: 'danger',
  },
  {
    name: 'IPD Patients',
    value: '21',
    alertText: '7 Review Pending',
    alertTone: 'warning',
  },
  {
    name: 'OPD Patients',
    value: '30',
    alertText: '21 Pending',
    alertTone: 'warning',
  },
];

const overviewRightPanels = [
  {
    label: 'Today focus',
    value: 'Discharge readiness',
    note: 'Coordinate final imaging check and family instructions.',
  },
  {
    label: 'Alerts',
    value: '2 reminders',
    note: 'Medication audit due at 2 PM and call-back at 4:30 PM.',
  },
];

const navItems = [
  { icon: 'home', label: 'Home' },
  { icon: 'calendar_month', label: 'Appointments' },
  { icon: 'person', label: 'Patients' },
  { icon: 'lab_research', label: 'Reports' },
];

const branchOptions = [
  'All Branches',
  'Brooklyn Heights',
  'Williamsburg',
  'Long Island City',
  'Astoria',
  'Flushing',
];

const PATIENT_ROWS_PER_LOAD = 10;
const hospitalBranches = branchOptions.slice(1);
const patientFirstNames = ['Ethan', 'Olivia', 'Noah', 'Ava', 'Liam', 'Charlotte', 'Mason', 'Sophia', 'James', 'Harper', 'Benjamin', 'Amelia'];
const patientLastNames = ['Brooks', 'Carter', 'Bennett', 'Mitchell', 'Foster', 'Reed', 'Turner', 'Hayes', 'Collins', 'Evans', 'Scott', 'Cooper', 'Ward'];
const messageSourceTabs = ['RMO', 'Nurse', 'Lab', 'Patient Home'];

const ipdMessageSeedByRow = {
  0: {
    RMO: [
      {
        author: 'RMO',
        text: 'Blood pressure trended low overnight. Monitoring every 2 hours.',
        time: '09:10 AM',
      },
    ],
    Nurse: [],
    Lab: [],
    'Patient Home': [],
  },
  2: {
    RMO: [
      {
        author: 'RMO',
        text: 'Symptoms improved after morning round. Continue same protocol.',
        time: '08:40 AM',
      },
    ],
    Nurse: [
      {
        author: 'Nurse',
        text: 'Patient tolerated breakfast and oral meds without nausea.',
        time: '09:20 AM',
      },
    ],
    Lab: [],
    'Patient Home': [],
  },
  4: {
    RMO: [],
    Nurse: [
      {
        author: 'Nurse',
        text: 'Temperature spike recorded at 100.8F. Rechecked after sponge care.',
        time: '10:05 AM',
      },
    ],
    Lab: [
      {
        author: 'Lab',
        text: 'CBC repeat sample collected. Result expected by 1:30 PM.',
        time: '10:15 AM',
      },
    ],
    'Patient Home': [
      {
        author: 'Patient Home',
        text: 'Family asked if evening visit can be extended by 15 minutes.',
        time: '10:28 AM',
      },
    ],
  },
  7: {
    RMO: [
      {
        author: 'RMO',
        text: 'Observe oxygen saturation trend post-physiotherapy session.',
        time: '11:05 AM',
      },
    ],
    Nurse: [],
    Lab: [],
    'Patient Home': [],
  },
  9: {
    RMO: [],
    Nurse: [
      {
        author: 'Nurse',
        text: 'Pain score dropped from 6 to 3 after medication.',
        time: '11:22 AM',
      },
    ],
    Lab: [
      {
        author: 'Lab',
        text: 'Urine culture report uploaded and flagged for review.',
        time: '11:31 AM',
      },
    ],
    'Patient Home': [],
  },
};

const getMessageCount = (threads = {}) => (
  Object.values(threads).filter((items) => Array.isArray(items) && items.length > 0).length
);

const buildDepartmentPatients = ({ count, startId, bedPrefix, statuses, diagnoses }) => (
  Array.from({ length: count }, (_, index) => ({
    id: `PT-${startId + index}`,
    name: `${patientFirstNames[index % patientFirstNames.length]} ${patientLastNames[index % patientLastNames.length]}`,
    ...(bedPrefix ? { bedNumber: `${bedPrefix}-${String(index + 1).padStart(2, '0')}` } : {}),
    status: statuses[index % statuses.length],
    diagnosisFor: diagnoses[index % diagnoses.length],
    brunch: hospitalBranches[index % hospitalBranches.length],
  }))
);

const patientsByDepartment = {
  ICU: buildDepartmentPatients({
    count: 6,
    startId: 1001,
    bedPrefix: 'ICU',
    statuses: ['Critical', 'Stable', 'Improving', 'Ventilated', 'Observation'],
    diagnoses: [
      'Acute respiratory distress',
      'Post-surgery monitoring',
      'Cardiac arrest recovery',
      'Severe pneumonia',
      'Stroke observation',
      'Sepsis management',
    ],
  }),
  IPD: buildDepartmentPatients({
    count: 18,
    startId: 2101,
    bedPrefix: 'IPD',
    statuses: ['Observation', 'Recovering', 'Stable', 'Deteriorated'],
    diagnoses: [
      'Fever and dehydration',
      'Viral pneumonia',
      'Gastroenteritis',
      'Kidney stone management',
      'Chest pain evaluation',
      'Diabetes stabilization',
      'COPD exacerbation',
      'Fracture rehab',
      'Post-op orthopedic care',
      'Migraine workup',
    ],
  }).map((row, index) => {
    const messageThreads = ipdMessageSeedByRow[index];

    if (!messageThreads) {
      return row;
    }

    return {
      ...row,
      messageThreads,
      messageCount: getMessageCount(messageThreads),
    };
  }),
  OPD: buildDepartmentPatients({
    count: 36,
    startId: 3201,
    statuses: ['Waiting', 'Completed', 'In Consultation'],
    diagnoses: [
      'Consultation',
      'Review',
    ],
  }),
};

export default function ProjectLinkPage({ project }) {
  const navigate = useNavigate();
  const branchMenuRef = useRef(null);
  const patientLoadTriggerRef = useRef(null);
  const messageThreadScrollRef = useRef(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const [selectedBranch, setSelectedBranch] = useState(branchOptions[0]);
  const [isBranchMenuOpen, setIsBranchMenuOpen] = useState(false);
  const [activePatientTab, setActivePatientTab] = useState('ICU');
  const [patientSort, setPatientSort] = useState({ key: 'name', direction: 'asc' });
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [visiblePatientRows, setVisiblePatientRows] = useState(PATIENT_ROWS_PER_LOAD);
  const [openMessageRowId, setOpenMessageRowId] = useState(null);
  const [activeMessageSourceTab, setActiveMessageSourceTab] = useState('RMO');
  const [messageReplyText, setMessageReplyText] = useState('');
  const [patientMessageThreads, setPatientMessageThreads] = useState(() => {
    const seededRows = patientsByDepartment.IPD.filter((row) => row.messageThreads);

    return seededRows.reduce((accumulator, row) => {
      accumulator[row.id] = row.messageThreads;
      return accumulator;
    }, {});
  });

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (branchMenuRef.current && !branchMenuRef.current.contains(event.target)) {
        setIsBranchMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    setVisiblePatientRows(PATIENT_ROWS_PER_LOAD);
  }, [activePatientTab, patientSearchQuery]);

  const handleLogoutClick = () => {
    setActivePage('Logout');
  };

  const activePatients = patientsByDepartment[activePatientTab] || [];
  const activeMessageRow = activePatients.find((row) => row.id === openMessageRowId) || null;
  const activeMessageThreads = activeMessageRow
    ? (patientMessageThreads[activeMessageRow.id] || activeMessageRow.messageThreads || {})
    : {};
  const activeThreadMessages = activeMessageThreads[activeMessageSourceTab] || [];

  useEffect(() => {
    if (!openMessageRowId || !messageThreadScrollRef.current) {
      return;
    }

    const container = messageThreadScrollRef.current;
    container.scrollTop = container.scrollHeight;
  }, [openMessageRowId, activeMessageSourceTab, activeThreadMessages.length]);

  const showBedColumn = activePatientTab === 'ICU' || activePatientTab === 'IPD';
  const showStatusColumn = activePatientTab !== 'OPD';
  const showMessageColumn = activePatientTab !== 'OPD';
  const diagnosisColumnLabel = activePatientTab === 'OPD' ? 'Reason' : 'Diagnosis for';
  const filteredPatients = activePatients.filter((row) => {
    const normalizedQuery = patientSearchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return true;
    }

    return [
      row.id,
      row.name,
      row.bedNumber,
      row.status,
      row.diagnosisFor,
      row.brunch,
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(normalizedQuery));
  });
  const patientColumns = [
    { key: 'sl', label: 'SL', sortable: false },
    { key: 'id', label: 'Patient ID', sortable: true },
    { key: 'name', label: 'Patient Name', sortable: true },
    ...(showBedColumn ? [{ key: 'bedNumber', label: 'Bed Number', sortable: true }] : []),
    ...(showStatusColumn ? [{ key: 'status', label: 'Status', sortable: true }] : []),
    { key: 'diagnosisFor', label: diagnosisColumnLabel, sortable: true },
    { key: 'brunch', label: 'Brunch', sortable: true },
    ...(showMessageColumn ? [{ key: 'message', label: '', sortable: false }] : []),
  ];
  const sortedPatients = [...filteredPatients].sort((leftRow, rightRow) => {
    const { key, direction } = patientSort;

    if (!key || !leftRow[key] || !rightRow[key]) {
      return 0;
    }

    const leftValue = String(leftRow[key]).toLowerCase();
    const rightValue = String(rightRow[key]).toLowerCase();

    if (leftValue < rightValue) {
      return direction === 'asc' ? -1 : 1;
    }

    if (leftValue > rightValue) {
      return direction === 'asc' ? 1 : -1;
    }

    return 0;
  });
  const visiblePatients = sortedPatients.slice(0, visiblePatientRows);
  const canLoadMorePatients = visiblePatientRows < sortedPatients.length;

  useEffect(() => {
    const loadTrigger = patientLoadTriggerRef.current;

    if (!loadTrigger || !canLoadMorePatients) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisiblePatientRows((currentCount) => Math.min(currentCount + PATIENT_ROWS_PER_LOAD, sortedPatients.length));
          }
        });
      },
      {
        root: null,
        rootMargin: '120px 0px',
        threshold: 0.1,
      }
    );

    observer.observe(loadTrigger);

    return () => {
      observer.disconnect();
    };
  }, [canLoadMorePatients, sortedPatients.length]);

  const handlePatientSort = (key) => {
    setPatientSort((currentSort) => {
      if (currentSort.key === key) {
        return {
          key,
          direction: currentSort.direction === 'asc' ? 'desc' : 'asc',
        };
      }

      return {
        key,
        direction: 'asc',
      };
    });
  };

  const openMessagePopup = (row) => {
    const rowThreads = patientMessageThreads[row.id] || row.messageThreads || {};
    const firstTabWithMessages = messageSourceTabs.find((tab) => (rowThreads[tab] || []).length > 0) || messageSourceTabs[0];

    setOpenMessageRowId(row.id);
    setActiveMessageSourceTab(firstTabWithMessages);
    setMessageReplyText('');
  };

  const closeMessagePopup = () => {
    setOpenMessageRowId(null);
    setActiveMessageSourceTab('RMO');
    setMessageReplyText('');
  };

  const handleSendReply = () => {
    if (!activeMessageRow || !messageReplyText.trim()) {
      return;
    }

    setPatientMessageThreads((currentThreads) => {
      const rowThreads = currentThreads[activeMessageRow.id] || activeMessageRow.messageThreads || {};
      const nextMessages = [
        ...(rowThreads[activeMessageSourceTab] || []),
        {
          author: 'Doctor',
          text: messageReplyText.trim(),
          time: 'Now',
        },
      ];

      return {
        ...currentThreads,
        [activeMessageRow.id]: {
          ...rowThreads,
          [activeMessageSourceTab]: nextMessages,
        },
      };
    });

    setMessageReplyText('');
  };

  const handleReplyInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendReply();
    }
  };

  const getPatientStatusTone = (status) => {
    const normalizedStatus = String(status || '').toLowerCase();

    if (normalizedStatus === 'ventilated') {
      return 'ventilated';
    }

    if (normalizedStatus === 'critical') {
      return 'critical';
    }

    if (normalizedStatus.includes('observation')) {
      return 'observation';
    }

    if (normalizedStatus === 'improving') {
      return 'improving';
    }

    if (normalizedStatus === 'stable') {
      return 'stable';
    }

    return 'default';
  };

  const renderMainContent = () => {
    if (activePage === 'Home') {
      return (
        <>
          <Header
            patient={patient}
            onBack={() => navigate(`/project/${project.slug}`)}
            primaryActionLabel="Message family"
            secondaryActionLabel="Escalate case"
          />

          <div className="dashboard-overview-grid dashboard-overview-grid-home">
            <div className="dashboard-overview-left">
              <div className="dashboard-overview-left-top">
                {overviewQuickStats.map((item) => (
                  <article key={item.name} className="dashboard-layout-box dashboard-layout-box-compact dashboard-stat-box">
                    <strong className="dashboard-stat-value">{item.value}</strong>
                    <p className="dashboard-stat-name">{item.name}</p>
                    {item.alertText && (
                      <span className={`dashboard-stat-alert dashboard-stat-alert-${item.alertTone}`}>
                        {item.alertText}
                      </span>
                    )}
                  </article>
                ))}
              </div>

              <article className="dashboard-layout-box dashboard-layout-box-wide">
                <h2 className="dashboard-patients-heading">Patients</h2>
                <div className="patients-toolbar-row">
                  <div className="patients-tab-bar">
                    {['ICU', 'IPD', 'OPD'].map((tab, index) => (
                      <React.Fragment key={tab}>
                        <button
                          className={`patients-tab${activePatientTab === tab ? ' patients-tab-active' : ''}`}
                          onClick={() => setActivePatientTab(tab)}
                        >
                          {tab}
                        </button>
                        {index < 2 && <span className="patients-tab-divider" />}
                      </React.Fragment>
                    ))}
                  </div>
                  <div className="patients-search">
                    <input
                      className="patients-search-input"
                      type="text"
                      placeholder="Search"
                      value={patientSearchQuery}
                      onChange={(event) => setPatientSearchQuery(event.target.value)}
                    />
                    <span className="material-symbols-outlined patients-search-icon" aria-hidden="true">search</span>
                  </div>
                </div>

                <div className="patients-table-meta">
                  <span className="material-symbols-outlined patients-table-meta-icon" aria-hidden="true">filter_list</span>
                  <span className="patients-table-meta-text">{activePatients.length} patients</span>
                </div>

                <div className="patients-table-shell">
                  <table className="patients-table">
                    <thead>
                      <tr>
                        {patientColumns.map((column) => (
                          <th key={column.key}>
                            {column.sortable ? (
                              <button
                                className="patients-header-sort"
                                type="button"
                                onClick={() => handlePatientSort(column.key)}
                              >
                                <span>{column.label}</span>
                                <span className="material-symbols-outlined patients-sort-icon" aria-hidden="true">unfold_more</span>
                              </button>
                            ) : (
                              column.label
                            )}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visiblePatients.map((row, index) => {
                        const rowMessageCount = getMessageCount(patientMessageThreads[row.id] || row.messageThreads || {});
                        const forceUnreadIcon = (activePatientTab === 'ICU' || activePatientTab === 'IPD') && index === 0;
                        const hasMessages = rowMessageCount > 0 || forceUnreadIcon;

                        return (
                        <tr key={row.id}>
                          <td>{index + 1}</td>
                          <td>{row.id}</td>
                          <td>{row.name}</td>
                          {showBedColumn && <td>{row.bedNumber}</td>}
                          {showStatusColumn && (
                            <td>
                              <span className={`patients-status-chip patients-status-chip-${getPatientStatusTone(row.status)}`}>
                                {row.status}
                              </span>
                            </td>
                          )}
                          <td>{row.diagnosisFor}</td>
                          <td>{row.brunch}</td>
                          {showMessageColumn && (
                            <td className="patients-message-cell">
                              <div className="patients-row-actions">
                                <button
                                  className="patients-message-icon-button"
                                  type="button"
                                  onClick={() => openMessagePopup(row)}
                                  aria-label={`Open messages for ${row.name}`}
                                >
                                  <span
                                    className={`${hasMessages ? 'material-icons' : 'material-symbols-outlined'} patients-message-icon${hasMessages ? ' patients-message-icon-filled' : ''}`}
                                    aria-hidden="true"
                                  >
                                    {hasMessages ? 'mark_chat_unread' : 'chat_bubble'}
                                  </span>
                                </button>
                                <span className="material-symbols-outlined patients-more-icon" aria-hidden="true">more_vert</span>
                              </div>
                            </td>
                          )}
                        </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {canLoadMorePatients && (
                  <div className="patients-load-sentinel" ref={patientLoadTriggerRef} aria-hidden="true" />
                )}

                {showMessageColumn && activeMessageRow && createPortal(
                  <div className="patients-message-popup-overlay" role="presentation" onClick={closeMessagePopup}>
                    <div
                      className="patients-message-popup"
                      role="dialog"
                      aria-modal="true"
                      aria-label={`Messages for ${activeMessageRow.name}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <div className="patients-message-popup-head">
                        <div>
                          <strong>Notes and Messages</strong>
                          <p>{activeMessageRow.name} · {activeMessageRow.id}</p>
                        </div>
                        <button className="patients-message-popup-close" type="button" onClick={closeMessagePopup}>
                          <span className="material-symbols-outlined" aria-hidden="true">close</span>
                        </button>
                      </div>

                      <div className="patients-message-popup-tabs" role="tablist" aria-label="Message source">
                        {messageSourceTabs.map((source) => {
                          const sourceCount = (activeMessageThreads[source] || []).length;

                          return (
                            <button
                              key={source}
                              type="button"
                              role="tab"
                              aria-selected={activeMessageSourceTab === source}
                              className={`patients-message-popup-tab${activeMessageSourceTab === source ? ' patients-message-popup-tab-active' : ''}`}
                              onClick={() => setActiveMessageSourceTab(source)}
                            >
                              <span>{source}</span>
                              {sourceCount > 0 && <span className="patients-message-popup-tab-count">{sourceCount}</span>}
                            </button>
                          );
                        })}
                      </div>

                      <div className="patients-message-popup-thread" ref={messageThreadScrollRef}>
                        {activeThreadMessages.length ? (
                          activeThreadMessages.map((item, index) => (
                            <div key={`${item.author}-${item.time}-${index}`} className="patients-thread-item">
                              <div className="patients-thread-item-meta">
                                <strong>{item.author}</strong>
                                <span>{item.time}</span>
                              </div>
                              <p>{item.text}</p>
                            </div>
                          ))
                        ) : (
                          <p className="patients-thread-empty">No messages in this tab.</p>
                        )}
                      </div>

                      <div className="patients-message-popup-reply">
                        <input
                          type="text"
                          value={messageReplyText}
                          onChange={(event) => setMessageReplyText(event.target.value)}
                          onKeyDown={handleReplyInputKeyDown}
                          placeholder={`Reply to ${activeMessageSourceTab}`}
                        />
                        <button type="button" onClick={handleSendReply}>Reply</button>
                      </div>
                    </div>
                  </div>,
                  document.body
                )}
              </article>
            </div>

            <div className="dashboard-overview-right">
              {overviewRightPanels.map((item) => (
                <article key={item.label} className="dashboard-layout-box dashboard-layout-box-side">
                  <span className="dashboard-overview-label">{item.label}</span>
                  <strong>{item.value}</strong>
                  <p>{item.note}</p>
                </article>
              ))}
            </div>
          </div>
        </>
      );
    }

    if (activePage === 'Appointments') {
      return (
        <section className="dashboard-section dashboard-section-surface">
          <div className="dashboard-section-heading">
            <h2>Upcoming appointments</h2>
            <p>Coordinated schedule for the next recovery milestones.</p>
          </div>
          <div className="dashboard-stack">
            {appointments.map((appointment) => (
              <article key={appointment.title} className="dashboard-list-card">
                <strong>{appointment.title}</strong>
                <p>{appointment.time}</p>
                <span>{appointment.owner}</span>
              </article>
            ))}
          </div>
        </section>
      );
    }

    if (activePage === 'Patients') {
      return (
        <section className="dashboard-content-grid dashboard-content-grid-single">
          <article className="dashboard-section dashboard-section-surface">
            <div className="dashboard-section-heading">
              <h2>Patient profile</h2>
              <p>Operational summary for support staff and clinicians.</p>
            </div>
            <dl className="dashboard-definition-list">
              <div>
                <dt>Primary diagnosis</dt>
                <dd>Post-infection respiratory monitoring</dd>
              </div>
              <div>
                <dt>Insurance</dt>
                <dd>Verified · Corporate plan</dd>
              </div>
              <div>
                <dt>Risk level</dt>
                <dd>Moderate</dd>
              </div>
              <div>
                <dt>Preferred contact</dt>
                <dd>Family coordinator and SMS reminders</dd>
              </div>
            </dl>
          </article>
        </section>
      );
    }

    if (activePage === 'Reports') {
      return (
        <section className="dashboard-section dashboard-section-surface">
          <div className="dashboard-section-heading">
            <h2>Clinical reports</h2>
            <p>Review-ready history prepared for physician and admin workflows.</p>
          </div>
          <ReportsTable reports={reports} />
        </section>
      );
    }

    if (activePage === 'Settings') {
      return (
        <div className="dashboard-overview-grid">
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Notifications</span>
            <strong>Urgent only</strong>
            <p>Critical patient alerts are enabled for assigned staff.</p>
          </article>
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Data sharing</span>
            <strong>Restricted</strong>
            <p>External report downloads require supervisor approval.</p>
          </article>
          <article className="dashboard-overview-card">
            <span className="dashboard-overview-label">Theme</span>
            <strong>Clinical light</strong>
            <p>High-contrast interface tuned for desktop review stations.</p>
          </article>
        </div>
      );
    }

    return (
      <section className="dashboard-section dashboard-section-surface dashboard-empty-state">
        <h2>Signed out preview</h2>
        <p>This state can be connected to a real authentication flow when the concept moves beyond portfolio preview.</p>
      </section>
    );
  };

  return (
    <section className="project-link-page">
      <section className="project-link-dashboard" aria-label="Healthcare dashboard preview">
        <aside
          className={`project-link-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}
          aria-label="Dashboard navigation"
        >
          <div className="project-link-sidebar-top">
            <div className="project-link-logo" aria-label="AH logo">
              AH
            </div>

            <button
              type="button"
              className="project-link-toggle"
              aria-label={sidebarExpanded ? 'Collapse navigation' : 'Expand navigation'}
              onClick={() => setSidebarExpanded((value) => !value)}
            >
              <span className="material-symbols-outlined project-link-toggle-icon" aria-hidden="true">
                {sidebarExpanded ? 'close' : 'dehaze'}
              </span>
            </button>

            <nav className="project-link-nav" aria-label="Primary">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className={`project-link-nav-item ${activePage === item.label ? 'active' : ''}`}
                  aria-current={activePage === item.label ? 'page' : undefined}
                  onClick={() => setActivePage(item.label)}
                >
                  <span className="project-link-icon-box" aria-hidden="true">
                    <span className="material-symbols-outlined" aria-hidden="true">
                      {item.icon}
                    </span>
                  </span>
                  {sidebarExpanded && <span className="project-link-nav-label">{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>

          <button
            type="button"
            className={`project-link-nav-item project-link-logout ${activePage === 'Logout' ? 'active' : ''}`}
            aria-current={activePage === 'Logout' ? 'page' : undefined}
            onClick={handleLogoutClick}
          >
            <span className="project-link-icon-box" aria-hidden="true">
              <span className="material-symbols-outlined" aria-hidden="true">
                logout
              </span>
            </span>
            {sidebarExpanded && <span className="project-link-nav-label">Logout</span>}
          </button>
        </aside>

        <div className="project-link-main" aria-label="Main dashboard area">
          <div className="project-link-body">
            <div className="project-link-toprow">
              <div className="project-link-branch-control" ref={branchMenuRef}>
                <button
                  type="button"
                  className="project-link-branch-dropdown"
                  aria-haspopup="listbox"
                  aria-expanded={isBranchMenuOpen}
                  onClick={() => setIsBranchMenuOpen((value) => !value)}
                >
                  <span className="project-link-branch-text">{selectedBranch}</span>
                  <span className="material-symbols-outlined" aria-hidden="true">
                    {isBranchMenuOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
                  </span>
                </button>

                {isBranchMenuOpen && (
                  <ul className="project-link-branch-menu" role="listbox" aria-label="Select branch">
                    {branchOptions.map((branch) => (
                      <li key={branch}>
                        <button
                          type="button"
                          className={`project-link-branch-option ${selectedBranch === branch ? 'selected' : ''}`}
                          role="option"
                          aria-selected={selectedBranch === branch}
                          onClick={() => {
                            setSelectedBranch(branch);
                            setIsBranchMenuOpen(false);
                          }}
                        >
                          {branch}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="project-link-search" role="search">
                <span className="project-link-search-label">Search patients, reports, or care notes</span>
                <span className="material-symbols-outlined" aria-hidden="true">search</span>
              </div>

              <div className="project-link-header-icons">
                <span className="material-symbols-outlined" aria-label="Notifications">notifications</span>
                <span className="material-symbols-outlined" aria-label="Profile">account_circle</span>
              </div>
            </div>

            <div className="project-link-main-content">{renderMainContent()}</div>
          </div>
        </div>
      </section>
    </section>
  );
}