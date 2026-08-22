import { initialEmployees } from '../data/mockEmployees';
import { initialAttendance } from '../data/mockAttendance';
import { initialLeaves } from '../data/mockLeaves';
import { initialPayroll } from '../data/mockPayroll';
import { initialDashboardStats, initialActivityFeed } from '../data/mockDashboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiService = {
  // Dashboard
  async getDashboardStats() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`);
      return res.json();
    }
    return Promise.resolve({ ...initialDashboardStats, feed: initialActivityFeed });
  },

  // Employees
  async getEmployees() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/employees`);
      return res.json();
    }
    return Promise.resolve([...initialEmployees]);
  },

  async addEmployee(employeeData) {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      return res.json();
    }
    const newEmp = {
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...employeeData,
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      initials: employeeData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    return Promise.resolve(newEmp);
  },

  // Attendance
  async getAttendance() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/attendance`);
      return res.json();
    }
    return Promise.resolve([...initialAttendance]);
  },

  // Leaves
  async getLeaves() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/leaves`);
      return res.json();
    }
    return Promise.resolve([...initialLeaves]);
  },

  async updateLeaveStatus(requestId, status) {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/leaves/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return res.json();
    }
    return Promise.resolve({ success: true, requestId, status });
  },

  // Payroll
  async getPayroll() {
    if (API_BASE_URL) {
      const res = await fetch(`${API_BASE_URL}/api/admin/payroll`);
      return res.json();
    }
    return Promise.resolve([...initialPayroll]);
  }
};
