import React from 'react';

export function EmployeeTopbar({ activeTab, currentUser, onLogout }) {
  const userName = currentUser?.name || 'Rohith Kumar';
  const userInitials = (userName || 'RK').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const userRole = currentUser?.designation || (currentUser?.role === 'admin' ? 'HR Administrator' : 'Senior Software Engineer');

  const pageTitles = {
    dashboard: { title: 'Employee Portal', sub: `Welcome back, ${userName}! Overview of your workspace` },
    attendance: { title: 'Attendance & Punch Clock', sub: 'Log daily check-ins and inspect working hours' },
    leaves: { title: 'Leave Requests & Balances', sub: 'Apply for time off and track approval status' },
    payslips: { title: 'My Monthly Payslips', sub: 'View salary breakdowns and download tax receipts' }
  };

  const info = pageTitles[activeTab] || pageTitles.dashboard;

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1>{info.title}</h1>
        <p>{info.sub}</p>
      </div>
      <div className="topbar-right">
        <div className="tb-avatar" title="Sign Out" onClick={onLogout} style={{ cursor: 'pointer' }}>
          <div className="av-circle">{userInitials}</div>
          <div>
            <div className="av-name">{userName}</div>
            <div className="av-role">{userRole}</div>
          </div>
          <span style={{ fontSize: '11px', color: 'var(--rose)', marginLeft: '6px', fontWeight: 600 }}>Logout</span>
        </div>
      </div>
    </header>
  );
}

export default EmployeeTopbar;
