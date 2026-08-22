import React from 'react';
import StatCard from '../../components/admin/StatCard';

export function AdminDashboard({
  stats,
  activityFeed,
  setActiveTab,
  onOpenAddEmployee
}) {
  return (
    <div className="screen active">
      {/* STAT CARDS ROW */}
      <div className="stat-row">
        <StatCard
          label="Total Headcount"
          value={stats.totalEmployees}
          subText={stats.headcountGrowth}
          featured={true}
        />
        <StatCard
          label="Present Today"
          value={stats.presentToday}
          subText={stats.attendancePercentage}
          badgeClass="badge-success"
        />
        <StatCard
          label="Pending Leave Approvals"
          value={stats.pendingLeaves}
          subText="Requires Action"
          badgeClass="badge-rose"
        />
        <StatCard
          label={`${stats.payrollMonth} Payroll Run`}
          value={stats.payrollAmount}
          subText={stats.payrollDueDate}
          badgeClass="badge-warning"
        />
      </div>

      {/* DASHBOARD MAIN CONTENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {/* Recent Activity Feed */}
        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Live Organization Feed</div>
              <div className="card-sub">Recent workforce updates, requests and logs</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activityFeed.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '8px',
                  borderBottom: idx === activityFeed.length - 1 ? 'none' : '1px solid var(--border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: item.avatarBg,
                      color: item.avatarColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      fontWeight: 700
                    }}
                  >
                    {item.avatar}
                  </div>
                  <div>
                    <strong style={{ fontSize: '12.5px' }}>{item.user}</strong> {item.action}
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick HR Actions */}
        <div className="card">
          <div className="card-hd">
            <div>
              <div className="card-title">Quick HR Actions</div>
              <div className="card-sub">Common administrative workflows</div>
            </div>
          </div>
          <div className="qa-grid">
            <button className="qa-btn" onClick={onOpenAddEmployee}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--rose)', fontWeight: 600, fontSize: '13px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                Add Employee
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>Onboard new staff member</span>
            </button>

            <button className="qa-btn" onClick={() => setActiveTab('leave-approval')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--wine-mid)', fontWeight: 600, fontSize: '13px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                Approve Leaves
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>{stats.pendingLeaves} pending requests</span>
            </button>

            <button className="qa-btn" onClick={() => setActiveTab('payroll')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontWeight: 600, fontSize: '13px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                Run Payroll
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>Process August batch</span>
            </button>

            <button className="qa-btn" onClick={() => setActiveTab('reports')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--success)', fontWeight: 600, fontSize: '13px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                Export Report
              </div>
              <span style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>Generate HR analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
