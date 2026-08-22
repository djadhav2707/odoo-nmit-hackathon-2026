import React, { useState } from 'react';
import AdminLayout from './components/admin/AdminLayout';
import EmployeeLayout from './components/employee/EmployeeLayout';
import AuthScreen from './components/auth/AuthScreen';
import './admin.css';

function App() {
  const [viewMode, setViewMode] = useState('auth'); // Starts at Login screen: 'auth' | 'admin' | 'employee'
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setViewMode(user.role === 'admin' ? 'admin' : 'employee');
  };

  if (viewMode === 'auth') {
    return <AuthScreen onLogin={handleLogin} />;
  }

  if (viewMode === 'employee') {
    return (
      <EmployeeLayout
        currentUser={currentUser}
        onSwitchToAdmin={() => setViewMode('admin')}
        onLogout={() => setViewMode('auth')}
      />
    );
  }

  return (
    <AdminLayout
      currentUser={currentUser}
      onSwitchToEmployee={() => setViewMode('employee')}
      onLogout={() => setViewMode('auth')}
    />
  );
}

export default App;
