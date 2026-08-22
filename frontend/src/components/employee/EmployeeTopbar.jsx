import React from 'react';

const pageTitles = {
  dashboard: { title: 'Employee Portal', sub: 'Welcome back, Rohith! Overview of your workspace' },
  attendance: { title: 'Attendance & Punch Clock', sub: 'Log daily check-ins and inspect working hours' },
  leaves: { title: 'Leave Requests & Balances', sub: 'Apply for time off and track approval status' },
  payslips: { title: 'My Monthly Payslips', sub: 'View salary breakdowns and download tax receipts' }
};

export function EmployeeTopbar({ activeTab, onLogout }) {
  const info = pageTitles[activeTab] || pageTitles.dashboard;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{info.title}</h1>
        <p>{info.sub}</p>
      </div>
      <div className="topbar-right">
        <div className="tb-avatar" title="Sign Out" onClick={onLogout}>
          <div className="av-circle">RK</div>
          <div>
            <div className="av-name">Rohith Kumar</div>
            <div className="av-role">Senior Frontend Engineer</div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--rose)', marginLeft: '4px' }}>Logout</span>
        </div>
      </div>
    </header>
  );
}

export default EmployeeTopbar;
