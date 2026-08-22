import React, { useState } from 'react';

export function EmployeeDashboard({ currentUser, onShowToast }) {
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState('09:02 AM');
  const employeeName = currentUser?.name || 'Rohith Kumar';

  const handleToggleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false);
      onShowToast('Checked out successfully at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), 'info');
    } else {
      setIsCheckedIn(true);
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setCheckInTime(nowStr);
      onShowToast('Checked in successfully at ' + nowStr, 'success');
    }
  };

  return (
    <div className="screen active">
      {/* PERSONALIZED GREETING BANNER */}
      <div style={{ marginBottom: '16px' }}>
        <h1 className="display" style={{ fontSize: '24px', fontWeight: 600, color: 'var(--wine-dark)' }}>
          Good Morning, {employeeName} 👋
        </h1>
        <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '2px' }}>
          {currentUser?.designation || 'Software Engineer'} &bull; {currentUser?.department || 'Engineering'} &bull; Here is your daily workplace overview.
        </p>
      </div>

      {/* PUNCH CLOCK & QUICK STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '20px' }}>
        {/* PUNCH CARD */}
        <div className="card" style={{
          background: 'linear-gradient(135deg, var(--wine-dark) 0%, var(--wine) 100%)',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--gold)' }}>
              Daily Attendance Punch Clock
            </div>
            <h2 className="display" style={{ fontSize: '24px', fontWeight: 600, margin: '6px 0 2px 0' }}>
              {isCheckedIn ? 'Currently Checked In' : 'Checked Out'}
            </h2>
            <p style={{ fontSize: '12.5px', opacity: 0.8 }}>
              {isCheckedIn ? `Punched in today at ${checkInTime}` : 'Punch in to start tracking your working shift.'}
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginTop: '20px' }}>
            <div>
              <div style={{ fontSize: '11px', opacity: 0.7 }}>Effective Working Hours</div>
              <div className="mono display" style={{ fontSize: '28px', fontWeight: 700, color: '#fff' }}>
                {isCheckedIn ? '5.4 hrs' : '0.0 hrs'}
              </div>
            </div>

            <button
              onClick={handleToggleCheckIn}
              style={{
                marginLeft: 'auto',
                border: 'none',
                borderRadius: '100px',
                padding: '12px 24px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                background: isCheckedIn ? 'var(--danger-light)' : 'linear-gradient(120deg, var(--rose) 0%, var(--gold) 100%)',
                color: isCheckedIn ? 'var(--danger)' : '#fff',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              {isCheckedIn ? 'Punch Out' : 'Punch In Now'}
            </button>
          </div>
        </div>

        {/* LEAVE BALANCE QUICK SUMMARY */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div className="card-hd">
            <div className="card-title">Leave Balances</div>
            <span className="badge badge-success">Active Year</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>Annual Paid Leave</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--success)' }}>14 Days Remaining</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              <span style={{ fontSize: '13px' }}>Casual Leave</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--success)' }}>10 Days Remaining</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px' }}>Sick Leave</span>
              <span className="mono" style={{ fontWeight: 700, color: 'var(--success)' }}>9 Days Remaining</span>
            </div>
          </div>
        </div>
      </div>

      {/* ANNOUNCEMENTS & TEAM UPDATES */}
      <div className="card">
        <div className="card-hd">
          <div className="card-title">Company Announcements</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--canvas)', border: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <strong style={{ fontSize: '13px', color: 'var(--wine-dark)' }}>🎉 Q3 Hackathon & Dayflow Portal Rollout</strong>
              <span style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>August 2026</span>
            </div>
            <p style={{ fontSize: '12px', color: 'var(--ink-soft)' }}>
              Welcome to the upgraded Dayflow portal! Explore new attendance punch tracking, instant leave applications, and automated payslip generation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
