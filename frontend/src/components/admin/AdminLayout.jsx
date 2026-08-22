import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';
import Notification from '../common/Notification';
import EmployeeModal from './EmployeeModal';

// Pages
import AdminDashboard from '../../pages/admin/AdminDashboard';
import EmployeeHub from '../../pages/admin/EmployeeHub';
import EmployeeDetails from '../../pages/admin/EmployeeDetails';
import AttendanceHub from '../../pages/admin/AttendanceHub';
import LeaveApprovals from '../../pages/admin/LeaveApprovals';
import PayrollConsole from '../../pages/admin/PayrollConsole';
import Reports from '../../pages/admin/Reports';

// Service & Data
import { apiService } from '../../services/api';

export function AdminLayout({ currentUser, onSwitchToEmployee, onLogout }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toast, setToast] = useState({ message: '', type: 'info' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Core Data States
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payroll, setPayroll] = useState([]);
  const [stats, setStats] = useState({
    totalEmployees: 248,
    headcountGrowth: "+8.4% this quarter",
    presentToday: 219,
    attendancePercentage: "88.3% Attendance",
    pendingLeaves: 4,
    payrollMonth: "August 2026",
    payrollAmount: "₹14.2L",
    payrollDueDate: "Due in 9 Days",
    feed: []
  });

  useEffect(() => {
    // Load initial mock / API data
    apiService.getEmployees().then(setEmployees);
    apiService.getAttendance().then(setAttendance);
    apiService.getLeaves().then(setLeaves);
    apiService.getPayroll().then(setPayroll);
    apiService.getDashboardStats().then(data => {
      setStats(prev => ({ ...prev, ...data }));
    });
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast({ message: '', type: 'info' });
    }, 4000);
  };

  // Leave Approvals logic
  const handleApproveLeave = (reqId, empName) => {
    setLeaves(prev => prev.map(req => req.id === reqId ? { ...req, status: 'Approved' } : req));
    setStats(prev => ({ ...prev, pendingLeaves: Math.max(0, prev.pendingLeaves - 1) }));
    showToast(`Approved leave request for ${empName}`, 'success');
  };

  const handleRejectLeave = (reqId, empName) => {
    setLeaves(prev => prev.map(req => req.id === reqId ? { ...req, status: 'Rejected' } : req));
    setStats(prev => ({ ...prev, pendingLeaves: Math.max(0, prev.pendingLeaves - 1) }));
    showToast(`Rejected leave request for ${empName}`, 'error');
  };

  // Add Employee logic
  const handleSaveEmployee = (newEmpData) => {
    apiService.addEmployee(newEmpData).then(created => {
      setEmployees(prev => [created, ...prev]);
      setStats(prev => ({ ...prev, totalEmployees: prev.totalEmployees + 1 }));
      showToast(`Employee ${created.name} onboarded successfully!`, 'success');
    });
  };

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    setActiveTab('employee-details');
  };

  const pendingLeavesCount = leaves.filter(l => l.status === 'Pending').length;

  return (
    <div className="shell">
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingLeaveCount={pendingLeavesCount}
        onSwitchToEmployee={onSwitchToEmployee}
      />

      <div className="main">
        <AdminTopbar
          activeTab={activeTab}
          currentUser={currentUser}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />

        <main className="content">
          {activeTab === 'dashboard' && (
            <AdminDashboard
              stats={{ ...stats, pendingLeaves: pendingLeavesCount }}
              activityFeed={stats.feed || []}
              setActiveTab={setActiveTab}
              onOpenAddEmployee={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'employees' && (
            <EmployeeHub
              employees={employees}
              onSelectEmployee={handleSelectEmployee}
              onOpenAddModal={() => setIsAddModalOpen(true)}
            />
          )}

          {activeTab === 'employee-details' && (
            <EmployeeDetails
              employee={selectedEmployee || employees[0]}
              onBack={() => setActiveTab('employees')}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceHub
              attendanceData={attendance}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'leave-approval' && (
            <LeaveApprovals
              leaveRequests={leaves}
              onApprove={handleApproveLeave}
              onReject={handleRejectLeave}
            />
          )}

          {activeTab === 'payroll' && (
            <PayrollConsole
              payrollData={payroll}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'reports' && (
            <Reports onShowToast={showToast} />
          )}
        </main>
      </div>

      <EmployeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEmployee}
      />

      <Notification
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'info' })}
      />
    </div>
  );
}

export default AdminLayout;
