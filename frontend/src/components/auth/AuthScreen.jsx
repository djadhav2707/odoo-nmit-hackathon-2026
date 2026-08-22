import React, { useState } from 'react';
import { apiService } from '../../services/api';

export function AuthScreen({ onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [role, setRole] = useState('employee'); // 'admin' | 'employee'
  const [email, setEmail] = useState('rohith.k@dayflow.hr');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [designation, setDesignation] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (authMode === 'signin') {
      if (selectedRole === 'admin') {
        setEmail('priya.s@dayflow.hr');
      } else {
        setEmail('rohith.k@dayflow.hr');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMode === 'signup') {
        const newEmpData = {
          name: name.trim() || 'New Employee',
          email: email.trim(),
          role: role === 'admin' ? 'ADMIN' : 'EMPLOYEE',
          department: department,
          designation: designation || (role === 'admin' ? 'HR Administrator' : 'Software Engineer'),
          phone: '+91 98' + Math.floor(10000000 + Math.random() * 90000000),
          status: 'Active',
          joinDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          salary: '₹12,00,000',
          ctc: '₹15,00,000',
          location: 'Bangalore HQ'
        };

        const created = await apiService.addEmployee(newEmpData);
        setSuccessMessage(`Account created for ${created.name}! Redirecting...`);
        
        setTimeout(() => {
          onLogin({
            id: created.id,
            email: created.email || email,
            role: role,
            name: created.name || name,
            department: created.department,
            designation: created.designation
          });
        }, 700);
      } else {
        const authRes = await apiService.login(email, password);
        onLogin(authRes.user);
      }
    } catch (err) {
      console.error('Auth error:', err);
      // Fallback
      onLogin({
        email,
        role,
        name: name || (role === 'admin' ? 'Priya Sharma' : 'Rohith Kumar')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      color: 'var(--ink)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '36px 20px',
      background: 'radial-gradient(circle at 15% 20%, rgba(201,51,104,0.10), transparent 45%), radial-gradient(circle at 85% 80%, rgba(198,161,91,0.10), transparent 45%), var(--canvas)'
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: '920px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.9fr 1.1fr',
          background: 'var(--surface)',
          borderRadius: '28px',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          minHeight: '580px'
        }}>
          {/* LEFT BRAND PANEL */}
          <div style={{
            position: 'relative',
            background: 'linear-gradient(160deg, var(--wine-dark) 0%, var(--wine) 55%, var(--wine-mid) 100%)',
            color: '#fff',
            padding: '44px 38px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 2 }}>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '10px',
                background: 'rgba(255,255,255,0.14)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="display" style={{ fontWeight: 600, fontSize: '19px' }}>Dayflow</span>
            </div>

            <div style={{ position: 'relative', zIndex: 2, paddingTop: '8px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', fontWeight: 600, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                Human Resource Management System
              </div>
              <h1 className="display" style={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.22, marginBottom: '14px' }}>
                {authMode === 'signup' ? 'Join Dayflow Workforce.' : 'Empowering teams, simplifying HR.'}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                Streamlined employee records, daily attendance tracking, automated payroll, and instant leave approvals.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Real-time MongoDB &amp; Local Persistence
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Role-Based Portal Access (Admin &amp; Employee)
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 38px',
            position: 'relative'
          }}>
            <div style={{ width: '100%', maxWidth: '360px' }}>
              {/* TAB TOGGLE: SIGN IN vs SIGN UP */}
              <div style={{ display: 'flex', background: 'var(--canvas)', borderRadius: '100px', padding: '4px', marginBottom: '18px', border: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signin'); setSuccessMessage(''); }}
                  style={{
                    flex: 1,
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: authMode === 'signin' ? 'var(--surface)' : 'transparent',
                    color: authMode === 'signin' ? 'var(--rose)' : 'var(--ink-soft)',
                    boxShadow: authMode === 'signin' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); setSuccessMessage(''); }}
                  style={{
                    flex: 1,
                    border: 'none',
                    borderRadius: '100px',
                    padding: '8px 0',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: authMode === 'signup' ? 'var(--surface)' : 'transparent',
                    color: authMode === 'signup' ? 'var(--rose)' : 'var(--ink-soft)',
                    boxShadow: authMode === 'signup' ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  Sign Up (New Employee)
                </button>
              </div>

              {/* DEMO ROLE SWITCHER */}
              <div style={{ marginBottom: '16px', padding: '8px 10px', background: 'var(--blush)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <label style={{ fontSize: '10.5px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--wine-mid)', display: 'block', marginBottom: '5px' }}>
                  {authMode === 'signup' ? 'Register As Role:' : 'Quick Demo Role:'}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('admin')}
                    style={{
                      flex: 1,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 0',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: role === 'admin' ? 'var(--wine)' : '#fff',
                      color: role === 'admin' ? '#fff' : 'var(--ink)'
                    }}
                  >
                    HR Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleSelect('employee')}
                    style={{
                      flex: 1,
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 0',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      background: role === 'employee' ? 'var(--rose)' : '#fff',
                      color: role === 'employee' ? '#fff' : 'var(--ink)'
                    }}
                  >
                    Employee
                  </button>
                </div>
              </div>

              {successMessage && (
                <div style={{ padding: '8px 12px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '8px', fontSize: '12px', fontWeight: 600, marginBottom: '12px', textAlign: 'center' }}>
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {authMode === 'signup' && (
                  <>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '3px' }}>Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Pooja Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', fontSize: '13px' }}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '3px' }}>Department</label>
                        <select
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          style={{ width: '100%', padding: '9px 8px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', fontSize: '12px', background: '#fff' }}
                        >
                          <option value="Engineering">Engineering</option>
                          <option value="Design">Design</option>
                          <option value="Human Resources">HR</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finance">Finance</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '3px' }}>Designation</label>
                        <input
                          type="text"
                          placeholder="e.g. Frontend Dev"
                          value={designation}
                          onChange={(e) => setDesignation(e.target.value)}
                          style={{ width: '100%', padding: '9px 10px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', fontSize: '12px' }}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '3px' }}>Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', fontSize: '13px' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '3px' }}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', fontSize: '13px' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '11px', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : (authMode === 'signin' ? `Sign In to ${role === 'admin' ? 'Admin Portal' : 'Employee Portal'}` : 'Register & Add to Employees')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
