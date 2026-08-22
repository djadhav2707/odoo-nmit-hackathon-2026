import React from 'react';

export function StatusBadge({ status }) {
  const getPillClass = (st) => {
    switch (st?.toLowerCase()) {
      // Attendance statuses
      case 'present':   return 'pill-present';
      case 'late':      return 'pill-late';
      case 'absent':    return 'pill-absent';
      case 'leave':     return 'pill-leave';
      case 'pending':   return 'pill-pending';
      // Employee statuses
      case 'active':    return 'pill-present';
      case 'inactive':  return 'pill-absent';
      case 'on leave':  return 'pill-leave';
      // Payroll statuses
      case 'processed': return 'pill-present';
      // Leave request statuses
      case 'approved':  return 'pill-present';
      case 'rejected':  return 'pill-absent';
      default:          return 'pill-present';
    }
  };

  return (
    <span className={`status-pill ${getPillClass(status)}`}>
      {status}
    </span>
  );
}

export default StatusBadge;
