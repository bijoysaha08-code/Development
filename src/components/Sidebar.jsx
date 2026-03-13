import React from 'react';

export default function Sidebar({ isExpanded, toggleSidebar }) {
  const menuItems = [
    { icon: 'home', label: 'Home' },
    { icon: 'people', label: 'Patients' },
    { icon: 'calendar_today', label: 'Calendar' },
    { icon: 'settings', label: 'Settings' },
  ];

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <span className="material-icons">
          {isExpanded ? 'close' : 'menu'}
        </span>
      </button>

      {isExpanded && (
        <nav className="menu">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="menu-item">
              <span className="material-icons">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
