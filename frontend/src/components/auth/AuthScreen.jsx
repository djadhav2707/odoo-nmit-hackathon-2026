import React, { useState } from 'react';
import { apiService } from '../../services/api';

export function AuthScreen({ onLogin }) {
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup' | 'forgot' | 'otp' | 'reset' | 'reset-success'
  const [role, setRole] = useState('employee'); // 'admin' | 'employee'
  const [email, setEmail] = useState('rohith.k@dayflow.hr');
  const [password, setPassword] = useState('••••••••');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('Engineering');
  const [designation, setDesignation] = useState('Software Engineer');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Forgot password flow states
  const [forgotEmail, setForgotEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otpTimer, setOtpTimer] = useState(120);

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
        }, 600);
      } else {
        const authRes = await apiService.login(email, password);
        onLogin(authRes.user);
      }
    } catch (err) {
      console.error('Auth error:', err);
      onLogin({
        email,
        role,
        name: name || (role === 'admin' ? 'Priya Sharma' : 'Rohith Kumar')
      });
    } finally {
      setLoading(false);
    }
  };

  // Forgot password step handlers
  const handleSendResetLink = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthMode('otp');
    }, 600);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthMode('reset');
    }, 600);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match. Please re-enter.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setAuthMode('reset-success');
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value[0];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
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
                {authMode.startsWith('reset') || authMode === 'forgot' || authMode === 'otp' ? 'Account Recovery' : 'Human Resource Management System'}
              </div>
              <h1 className="display" style={{ fontSize: '30px', fontWeight: 600, lineHeight: 1.22, marginBottom: '14px' }}>
                {authMode === 'signup' ? 'Join Dayflow Workforce.' : (authMode === 'forgot' || authMode === 'otp' || authMode.startsWith('reset')) ? 'Back on your feet, fast.' : 'Empowering teams, simplifying HR.'}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.72)', lineHeight: 1.6 }}>
                {authMode === 'forgot' || authMode === 'otp' || authMode.startsWith('reset')
                  ? "We'll verify your work email and help you securely restore your account in under 2 minutes."
                  : 'Streamlined employee records, daily attendance tracking, automated payroll, and instant leave approvals.'}
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                Secure 256-bit Encrypted Session
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
            padding: '36px 36px',
            position: 'relative'
          }}>
            <div style={{ width: '100%', maxWidth: '360px' }}>

              {/* ================= FLOW 1 & 2: SIGN IN / SIGN UP ================= */}
              {(authMode === 'signin' || authMode === 'signup') && (
                <>
                  {/* TAB TOGGLE: SIGN IN vs SIGN UP */}
                  <div style={{ display: 'flex', background: 'var(--canvas)', borderRadius: '100px', padding: '4px', marginBottom: '16px', border: '1px solid var(--border)' }}>
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
                  <div style={{ marginBottom: '14px', padding: '8px 10px', background: 'var(--blush)', borderRadius: '12px', border: '1px solid var(--border)' }}>
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

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
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
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                        <label style={{ fontSize: '11.5px', fontWeight: 600 }}>Password</label>
                        {authMode === 'signin' && (
                          <button
                            type="button"
                            onClick={() => { setAuthMode('forgot'); setForgotEmail(email); }}
                            style={{ background: 'none', border: 'none', color: 'var(--rose-dark)', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>
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
                </>
              )}

              {/* ================= FLOW 3: FORGOT PASSWORD (STEP 1: EMAIL) ================= */}
              {authMode === 'forgot' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--rose-light)', color: 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </div>
                    <h2 className="display" style={{ fontSize: '20px', fontWeight: 600 }}>Reset Password</h2>
                    <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', marginTop: '4px' }}>Enter your work email address to receive a 6-digit verification code.</p>
                  </div>

                  <form onSubmit={handleSendResetLink} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Work Email Address</label>
                      <input
                        type="email"
                        placeholder="you@dayflow.io"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                        required
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                      {loading ? 'Sending code...' : 'Send Verification Code'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: '12px', cursor: 'pointer', textAlign: 'center', marginTop: '6px' }}
                    >
                      &larr; Back to Sign In
                    </button>
                  </form>
                </div>
              )}

              {/* ================= FLOW 4: OTP VERIFICATION (STEP 2: CODE) ================= */}
              {authMode === 'otp' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--gold-light)', color: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </div>
                    <h2 className="display" style={{ fontSize: '20px', fontWeight: 600 }}>Verify Code</h2>
                    <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '4px' }}>
                      We sent a 6-digit code to <strong>{forgotEmail || 'your email'}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      {otp.map((val, idx) => (
                        <input
                          key={idx}
                          id={`otp-input-${idx}`}
                          type="text"
                          maxLength="1"
                          value={val}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          style={{
                            width: '42px',
                            height: '48px',
                            textAlign: 'center',
                            fontSize: '18px',
                            fontWeight: 700,
                            borderRadius: '10px',
                            border: '1.5px solid var(--border)',
                            outline: 'none',
                            background: val ? 'var(--rose-light)' : '#fff',
                            borderColor: val ? 'var(--rose)' : 'var(--border)'
                          }}
                        />
                      ))}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--ink-soft)' }}>
                      <span>Expires in <strong className="mono">02:00</strong></span>
                      <button type="button" onClick={() => alert('New code sent!')} style={{ background: 'none', border: 'none', color: 'var(--rose-dark)', cursor: 'pointer', fontWeight: 600 }}>
                        Resend Code
                      </button>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px' }}>
                      {loading ? 'Verifying...' : 'Verify & Continue'}
                    </button>

                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      style={{ background: 'none', border: 'none', color: 'var(--ink-soft)', fontSize: '12px', cursor: 'pointer', textAlign: 'center' }}
                    >
                      &larr; Change Email
                    </button>
                  </form>
                </div>
              )}

              {/* ================= FLOW 5: NEW PASSWORD (STEP 3) ================= */}
              {authMode === 'reset' && (
                <div>
                  <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--blush)', color: 'var(--wine-mid)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px auto' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <h2 className="display" style={{ fontSize: '20px', fontWeight: 600 }}>Create New Password</h2>
                    <p style={{ fontSize: '12px', color: 'var(--ink-soft)', marginTop: '4px' }}>Must be at least 8 characters with numbers and symbols.</p>
                  </div>

                  <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>New Password</label>
                      <input
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                        required
                        minLength="6"
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 600, marginBottom: '4px' }}>Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
                        required
                        minLength="6"
                      />
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '11px', marginTop: '6px' }}>
                      {loading ? 'Saving...' : 'Set New Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* ================= FLOW 6: RESET SUCCESS (STEP 4) ================= */}
              {authMode === 'reset-success' && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--success-light)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h2 className="display" style={{ fontSize: '22px', fontWeight: 600, marginBottom: '6px' }}>Password Reset!</h2>
                  <p style={{ fontSize: '13px', color: 'var(--ink-soft)', marginBottom: '22px', lineHeight: 1.5 }}>
                    Your password has been successfully updated. You can now sign in with your new credentials.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setAuthMode('signin'); setPassword(''); }}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
                  >
                    Proceed to Sign In
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
