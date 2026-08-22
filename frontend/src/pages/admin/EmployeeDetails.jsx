import React, { useState } from 'react';

export function EmployeeDetails({ employee, onBack, onShowToast }) {
  const [activeTab, setActiveTab] = useState('personal');

  if (!employee) return null;

  return (
    <div className="screen active">
      <div style={{ marginBottom: '16px' }}>
        <button
          className="btn btn-outline"
          onClick={onBack}
          style={{ gap: '4px' }}
        >
          ← Back to Employee Hub
        </button>
      </div>

      {/* HEADER PROFILE CARD */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold) 0%, var(--rose) 100%)',
                color: '#fff',
                fontSize: '22px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {employee.initials || 'EM'}
            </div>
            <div>
              <h2 className="display" style={{ fontSize: '20px', fontWeight: 700 }}>{employee.name}</h2>
              <div style={{ fontSize: '13px', color: 'var(--ink-soft)' }}>{employee.designation} — {employee.department}</div>
              <div style={{ fontSize: '11px', color: 'var(--ink-faint)', marginTop: '2px' }} className="mono">
                ID: {employee.id} | Joined: {employee.joinDate}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              className="btn btn-outline"
              onClick={() => onShowToast(`Password reset link sent to ${employee.email}`, 'info')}
            >
              Reset Password
            </button>
            <button
              className="btn btn-danger"
              onClick={() => onShowToast(`Deactivation request created for ${employee.name}`, 'error')}
            >
              Deactivate
            </button>
          </div>
        </div>
      </div>

      {/* TABS HEADER */}
      <div className="tab-row">
        <button
          className={`tab-nav-btn ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Info
        </button>
        <button
          className={`tab-nav-btn ${activeTab === 'employment' ? 'active' : ''}`}
          onClick={() => setActiveTab('employment')}
        >
          Employment
        </button>
        <button
          className={`tab-nav-btn ${activeTab === 'salary' ? 'active' : ''}`}
          onClick={() => setActiveTab('salary')}
        >
          Salary Package
        </button>
        <button
          className={`tab-nav-btn ${activeTab === 'leaves' ? 'active' : ''}`}
          onClick={() => setActiveTab('leaves')}
        >
          Leave Records
        </button>
      </div>

      {/* TAB CONTENTS */}
      <div className="card">
        {activeTab === 'personal' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Work Email</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{employee.email}</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Phone Number</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{employee.phone || '+91 98765 43210'}</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Work Location</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{employee.location || 'Bangalore HQ'}</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Emergency Contact</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>+91 91234 56789 (Spouse)</div>
            </div>
          </div>
        )}

        {activeTab === 'employment' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Reporting Manager</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{employee.manager || 'Priya Sharma'}</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Employment Type</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>Full-Time Permanent</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Probation Status</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px', color: 'var(--success)' }}>Completed</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Join Date</label>
              <div style={{ fontSize: '14px', fontWeight: 600, marginTop: '4px' }}>{employee.joinDate}</div>
            </div>
          </div>
        )}

        {activeTab === 'salary' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Annual CTC</label>
              <div className="display mono" style={{ fontSize: '20px', fontWeight: 700, color: 'var(--wine-dark)', marginTop: '4px' }}>
                {employee.ctc || employee.salary}
              </div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Monthly Basic</label>
              <div className="mono" style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>₹65,000</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>HRA Allowance</label>
              <div className="mono" style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>₹26,000</div>
            </div>
            <div>
              <label style={{ fontSize: '11px', color: 'var(--ink-faint)', textTransform: 'uppercase', fontWeight: 700 }}>Special Allowance</label>
              <div className="mono" style={{ fontSize: '16px', fontWeight: 600, marginTop: '4px' }}>₹15,000</div>
            </div>
          </div>
        )}

        {activeTab === 'leaves' && (
          <div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Total Allocated</th>
                  <th>Used</th>
                  <th>Available</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Annual Paid Leave</td>
                  <td>18 Days</td>
                  <td>4 Days</td>
                  <td><strong style={{ color: 'var(--success)' }}>14 Days</strong></td>
                </tr>
                <tr>
                  <td>Casual Leave</td>
                  <td>12 Days</td>
                  <td>2 Days</td>
                  <td><strong style={{ color: 'var(--success)' }}>10 Days</strong></td>
                </tr>
                <tr>
                  <td>Sick Leave</td>
                  <td>10 Days</td>
                  <td>1 Day</td>
                  <td><strong style={{ color: 'var(--success)' }}>9 Days</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeDetails;
