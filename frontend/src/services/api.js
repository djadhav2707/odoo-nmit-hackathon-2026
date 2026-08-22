import { initialEmployees } from '../data/mockEmployees';
import { initialAttendance } from '../data/mockAttendance';
import { initialLeaves } from '../data/mockLeaves';
import { initialPayroll } from '../data/mockPayroll';
import { initialDashboardStats, initialActivityFeed } from '../data/mockDashboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const apiService = {
  // Authentication
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback:', e);
    }
    const isAdmin = email.toLowerCase().includes('admin') || email.toLowerCase().includes('priya');
    return {
      message: 'Login successful',
      user: {
        name: isAdmin ? 'Priya Sharma' : 'Rohith Kumar',
        email,
        role: isAdmin ? 'admin' : 'employee',
        department: isAdmin ? 'HR' : 'Engineering'
      }
    };
  },

  // Dashboard
  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/dashboard`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for dashboard stats:', e);
    }
    return { ...initialDashboardStats, totalEmployees: initialEmployees.length, feed: initialActivityFeed };
  },

  // Employees
  async getEmployees() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/employees`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
      }
    } catch (e) {
      console.warn('API fetch fallback for employees:', e);
    }
    return [...initialEmployees];
  },

  async addEmployee(employeeData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
      if (res.ok) {
        const data = await res.json();
        const created = data.employee || data;
        initialEmployees.unshift(created);
        return created;
      }
    } catch (e) {
      console.warn('API fetch fallback for addEmployee:', e);
    }

    const newEmp = {
      id: `EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      ...employeeData,
      status: 'Active',
      joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      initials: (employeeData.name || 'NE').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    };
    initialEmployees.unshift(newEmp);
    return newEmp;
  },

  // Attendance
  async getAttendance() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/attendance`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for attendance:', e);
    }
    return [...initialAttendance];
  },

  async checkIn(employeeId) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/attendance/check-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for checkIn:', e);
    }
    return { message: 'Checked in' };
  },

  async checkOut(employeeId) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/attendance/check-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for checkOut:', e);
    }
    return { message: 'Checked out' };
  },

  // Leaves
  async getLeaves() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/leaves`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for leaves:', e);
    }
    return [...initialLeaves];
  },

  async submitLeave(leaveData) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/leaves`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leaveData)
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for submitLeave:', e);
    }
    return { message: 'Leave submitted' };
  },

  async updateLeaveStatus(requestId, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/leaves/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for updateLeaveStatus:', e);
    }
    return { success: true, requestId, status };
  },

  // Payroll
  async getPayroll() {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/payroll`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API fetch fallback for payroll:', e);
    }
    return [...initialPayroll];
  }
};
