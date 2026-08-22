import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';
import Notification from '../common/Notification';

import EmployeeDashboard from '../../pages/employee/EmployeeDashboard';
import EmployeeAttendance from '../../pages/employee/EmployeeAttendance';
import EmployeeLeaves from '../../pages/employee/EmployeeLeaves';
import EmployeePayslips from '../../pages/employee/EmployeePayslips';

export function EmployeeLayout({ currentUser, onSwitchToAdmin, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState({ message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'info' }), 4000);
  };

  return (
    <div className="shell">
      <EmployeeSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSwitchToAdmin={onSwitchToAdmin}
      />

      <div className="main">
        <EmployeeTopbar
          activeTab={activeTab}
          currentUser={currentUser}
          onLogout={onLogout}
        />

        <main className="content">
          {activeTab === 'dashboard' && (
            <EmployeeDashboard currentUser={currentUser} onShowToast={showToast} />
          )}

          {activeTab === 'attendance' && (
            <EmployeeAttendance currentUser={currentUser} />
          )}

          {activeTab === 'leaves' && (
            <EmployeeLeaves currentUser={currentUser} onShowToast={showToast} />
          )}

          {activeTab === 'payslips' && (
            <EmployeePayslips currentUser={currentUser} onShowToast={showToast} />
          )}
        </main>
      </div>

      <Notification
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </div>
  );
}

export default EmployeeLayout;
