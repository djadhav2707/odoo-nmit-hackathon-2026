import React, { useState } from 'react';

export function EmployeeLeaves({ onShowToast }) {
  const [myLeaves, setMyLeaves] = useState([
    { id: 'REQ-101', leaveType: 'Annual Leave', startDate: '25 Aug 2026', endDate: '26 Aug 2026', days: 2, status: 'Pending', reason: 'Attending family function' }
  ]);

  const [form, setForm] = useState({
    leaveType: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate || !form.reason) {
      alert('Please fill out all leave details.');
      return;
    }
    const newReq = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      leaveType: form.leaveType,
      startDate: form.startDate,
      endDate: form.endDate,
      days: 1,
      reason: form.reason,
      status: 'Pending'
    };
    setMyLeaves(prev => [newReq, ...prev]);
    onShowToast('Leave request submitted to HR Admin for approval!', 'success');
    setForm({ leaveType: 'Annual Leave', startDate: '', endDate: '', reason: '' });
  };

  return (
    <div className="screen active">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '16px' }}>
        {/* APPLY FOR LEAVE FORM */}
        <div className="card">
          <div className="card-hd">
            <div className="card-title">Apply for Time Off</div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Leave Category</label>
              <select
                value={form.leaveType}
                onChange={(e) => setForm(prev => ({ ...prev, leaveType: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', background: '#fff' }}
              >
                <option value="Annual Leave">Annual Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Start Date</label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm(prev => ({ ...prev, startDate: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>End Date</label>
                <input
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm(prev => ({ ...prev, endDate: e.target.value }))}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Reason</label>
              <textarea
                placeholder="Brief reason for time off request..."
                value={form.reason}
                onChange={(e) => setForm(prev => ({ ...prev, reason: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', minHeight: '80px', fontFamily: 'inherit' }}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', marginTop: '6px' }}>
              Submit Leave Application
            </button>
          </form>
        </div>

        {/* MY LEAVE REQUESTS HISTORY */}
        <div className="card">
          <div className="card-hd">
            <div className="card-title">My Leave History</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {myLeaves.map(req => (
              <div key={req.id} style={{ border: '1px solid var(--border)', padding: '14px', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '13px' }}>{req.leaveType}</strong>
                  <span className={`badge ${req.status === 'Pending' ? 'badge-warning' : req.status === 'Approved' ? 'badge-success' : 'badge-danger'}`}>
                    {req.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--ink-soft)' }} className="mono">
                  {req.startDate} to {req.endDate}
                </div>
                <p style={{ fontSize: '12px', marginTop: '4px', fontStyle: 'italic' }}>"{req.reason}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeaves;
