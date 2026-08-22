import React, { useState } from 'react';

export function AuthScreen({ onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [role, setRole] = useState('admin'); // 'admin' | 'employee'
  const [email, setEmail] = useState('priya.s@dayflow.hr');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      email,
      role,
      name: role === 'admin' ? 'Priya Sharma' : 'Rohith Kumar'
    });
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
          minHeight: '560px'
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
              <h1 className="display" style={{ fontSize: '32px', fontWeight: 600, lineHeight: 1.22, marginBottom: '14px' }}>
                Empowering teams, simplifying HR workflows.
              </h1>
              <p style={{ fontSize: '13.5px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65 }}>
                Streamlined employee records, daily attendance tracking, automated payroll, and instant leave approvals.
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Role-Based Portal Access (Admin / Employee)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Automated August Payroll Calculation
              </div>
            </div>
          </div>

          {/* RIGHT FORM PANEL */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 44px',
            position: 'relative'
          }}>
            <div style={{ width: '100%', maxWidth: '340px' }}>
              {/* TAB TOGGLE: SIGN IN vs SIGN UP */}
              <div style={{ display: 'flex', background: 'var(--canvas)', borderRadius: '100px', padding: '4px', marginBottom: '24px', border: '1px solid var(--border)' }}>
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
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
                  onClick={() => setAuthMode('signup')}
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
                  Sign Up
                </button>
              </div>

              {/* DEMO ROLE SWITCHER */}
              <div style={{ marginBottom: '18px', padding: '10px 12px', background: 'var(--blush)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--wine-mid)', display: 'block', marginBottom: '6px' }}>
                  Select Portal Role Demo:
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => { setRole('admin'); setEmail('priya.s@dayflow.hr'); }}
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
                    onClick={() => { setRole('employee'); setEmail('rohith.k@dayflow.hr'); }}
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

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {authMode === 'signup' && (
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rohith Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                      required
                    />
                  </div>
                )}

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Work Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '6px', padding: '11px' }}>
                  {authMode === 'signin' ? `Enter Dayflow (${role === 'admin' ? 'Admin Portal' : 'Employee Portal'})` : 'Create Account & Join'}
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
