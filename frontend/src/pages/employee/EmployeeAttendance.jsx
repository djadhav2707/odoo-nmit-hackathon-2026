import React from 'react';
import StatusBadge from '../../components/admin/StatusBadge';

export function EmployeeAttendance() {
  const myAttendanceLogs = [
    { date: '22 Aug 2026', checkIn: '09:02 AM', checkOut: '06:15 PM', hours: '9.2 hrs', status: 'Present' },
    { date: '21 Aug 2026', checkIn: '08:58 AM', checkOut: '06:00 PM', hours: '9.0 hrs', status: 'Present' },
    { date: '20 Aug 2026', checkIn: '09:15 AM', checkOut: '06:30 PM', hours: '9.25 hrs', status: 'Late' },
    { date: '19 Aug 2026', checkIn: '09:00 AM', checkOut: '06:05 PM', hours: '9.1 hrs', status: 'Present' },
    { date: '18 Aug 2026', checkIn: '09:05 AM', checkOut: '06:10 PM', hours: '9.1 hrs', status: 'Present' }
  ];

  return (
    <div className="screen active">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">My Attendance & Punch History</div>
            <div className="card-sub">Monthly shift logs and check-in records</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Effective Hours</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {myAttendanceLogs.map((log, idx) => (
              <tr key={idx}>
                <td className="mono">{log.date}</td>
                <td className="mono">{log.checkIn}</td>
                <td className="mono">{log.checkOut}</td>
                <td className="mono">{log.hours}</td>
                <td><StatusBadge status={log.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeAttendance;
