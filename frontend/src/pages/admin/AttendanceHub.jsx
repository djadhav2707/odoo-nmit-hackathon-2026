import React, { useState } from 'react';
import StatusBadge from '../../components/admin/StatusBadge';

export function AttendanceHub({ attendanceData, onShowToast }) {
  const [attendance, setAttendance] = useState(attendanceData);
  const [filterStatus, setFilterStatus] = useState('All');

  const handleOverride = (id) => {
    setAttendance(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'Present' ? 'Late' : item.status === 'Late' ? 'Present' : 'Present';
        onShowToast(`Updated status for ${item.employeeName} to ${nextStatus}`, 'success');
        return { ...item, status: nextStatus, checkIn: item.checkIn === '-' ? '09:00 AM' : item.checkIn };
      }
      return item;
    }));
  };

  const handleExportCSV = () => {
    onShowToast('Exporting Attendance Report (CSV)...', 'info');
  };

  const filteredData = attendance.filter(item => filterStatus === 'All' || item.status === filterStatus);

  return (
    <div className="screen active">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">Daily Workforce Attendance Logs</div>
            <div className="card-sub">Real-time attendance tracking and manual administrative overrides</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                border: '1.5px solid var(--border)',
                background: '#fff',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present</option>
              <option value="Late">Late</option>
              <option value="Absent">Absent</option>
              <option value="Leave">Leave</option>
            </select>
            <button className="btn btn-outline" onClick={handleExportCSV}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Export CSV
            </button>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Employee</th>
                <th>ID</th>
                <th>Department</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Working Hours</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map(item => (
                <tr key={item.id}>
                  <td className="mono">{item.date}</td>
                  <td><strong>{item.employeeName}</strong></td>
                  <td className="mono">{item.empId}</td>
                  <td>{item.department}</td>
                  <td className="mono">{item.checkIn}</td>
                  <td className="mono">{item.checkOut}</td>
                  <td className="mono">{item.workingHours}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => handleOverride(item.id)}
                    >
                      Override
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceHub;
