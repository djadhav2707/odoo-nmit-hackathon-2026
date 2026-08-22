import React from 'react';

export function LeaveApprovals({ leaveRequests, onApprove, onReject }) {
  const pendingRequests = leaveRequests.filter(req => req.status === 'Pending');

  return (
    <div className="screen active">
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-hd">
          <div>
            <div className="card-title">Pending Leave Requests</div>
            <div className="card-sub">Review time-off requests requiring manager authorization</div>
          </div>
          <span className="badge badge-rose">{pendingRequests.length} Pending Approval</span>
        </div>

        {pendingRequests.length === 0 ? (
          <div style={{ padding: '30px', textAlign: 'center', color: 'var(--ink-soft)' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 12px', display: 'block', color: 'var(--success)' }}>
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <p style={{ fontWeight: 600 }}>All caught up!</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>There are no pending leave applications awaiting approval.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {pendingRequests.map(req => (
              <div
                key={req.id}
                style={{
                  border: '1.5px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                  background: 'var(--surface)'
                }}
              >
                <div style={{ flex: 1, minWidth: '240px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <strong style={{ fontSize: '14px' }}>{req.employeeName}</strong>
                    <span className="mono" style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>{req.empId}</span>
                    <span className="badge badge-warning">{req.leaveType}</span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink-soft)', margin: '4px 0' }}>
                    <strong>Duration:</strong> {req.startDate} to {req.endDate} ({req.days} {req.days === 1 ? 'day' : 'days'})
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--ink)' }}>
                    <em>"{req.reason}"</em>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    className="btn btn-success"
                    onClick={() => onApprove(req.id, req.employeeName)}
                  >
                    Approve Request
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onReject(req.id, req.employeeName)}
                  >
                    Reject Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ALL LEAVE HISTORY */}
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">Processed Leave History</div>
            <div className="card-sub">Recently approved or rejected leave applications</div>
          </div>
        </div>

        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Employee</th>
              <th>Leave Type</th>
              <th>Dates</th>
              <th>Days</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.filter(req => req.status !== 'Pending').map(req => (
              <tr key={req.id}>
                <td className="mono">{req.id}</td>
                <td><strong>{req.employeeName}</strong></td>
                <td>{req.leaveType}</td>
                <td className="mono">{req.startDate} - {req.endDate}</td>
                <td className="mono">{req.days}</td>
                <td>
                  <span className={`badge ${req.status === 'Approved' ? 'badge-success' : 'badge-danger'}`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeaveApprovals;
