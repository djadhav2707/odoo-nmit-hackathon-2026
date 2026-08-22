import React from 'react';

const pageTitles = {
  dashboard: { title: 'Admin Dashboard', sub: 'Organization metrics, workforce statistics & approvals' },
  employees: { title: 'Employee Hub', sub: 'Manage organization staff, profiles, roles and onboarding' },
  'employee-details': { title: 'Employee Profile & Details', sub: 'Comprehensive employment history and salary package' },
  attendance: { title: 'Attendance Hub', sub: 'Real-time workforce check-ins, logs & manual overrides' },
  'leave-approval': { title: 'Leave Approvals', sub: 'Review, approve or reject pending leave applications' },
  payroll: { title: 'Payroll Console', sub: 'Monthly salary processing, statutory compliance & payslips' },
  reports: { title: 'Analytics & Reports', sub: 'Generate workforce, tax, and attendance compliance reports' }
};

export function AdminTopbar({ activeTab, setActiveTab }) {
  const info = pageTitles[activeTab] || pageTitles.dashboard;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{info.title}</h1>
        <p>{info.sub}</p>
      </div>
      <div className="topbar-right">
        <div className="tb-icon" title="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <div className="tb-icon" title="Notifications" onClick={() => setActiveTab('leave-approval')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/>
          </svg>
        </div>
        <div className="tb-avatar">
          <div className="av-circle">PS</div>
          <div>
            <div className="av-name">Priya Sharma</div>
            <div className="av-role">HR Administrator</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;
