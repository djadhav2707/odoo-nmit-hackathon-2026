import React from 'react';

const navItems = [
  {
    id: 'dashboard',
    label: 'Overview & Punch',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    )
  },
  {
    id: 'attendance',
    label: 'My Attendance Logs',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    )
  },
  {
    id: 'leaves',
    label: 'Time Off & Leaves',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 11l3 3L22 4"/>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    )
  },
  {
    id: 'payslips',
    label: 'Payslips & Tax',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    )
  }
];

export function EmployeeSidebar({ activeTab, setActiveTab, currentUser, onSwitchToAdmin }) {
  const isAdminUser = currentUser?.role === 'admin' || currentUser?.id === 'ADMIN001';

  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <div className="sb-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
        </div>
        <span className="sb-brand-name">Dayflow</span>
        <span className="badge badge-rose" style={{ marginLeft: 'auto', fontSize: '9.5px' }}>Employee</span>
      </div>

      <nav className="sb-nav">
        <span className="sb-section-label">My Space</span>
        {navItems.map(item => (
          <button
            key={item.id}
            className={`sb-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        {/* ONLY SHOWN IF LOGGED IN USER HAS ADMIN PRIVILEGES (ADMIN001) */}
        {isAdminUser && (
          <>
            <span className="sb-section-label">Portals</span>
            <button className="sb-item" onClick={onSwitchToAdmin}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              <span>Switch to HR Admin</span>
            </button>
          </>
        )}
      </nav>
    </aside>
  );
}

export default EmployeeSidebar;
