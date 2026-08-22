import React, { useState } from 'react';

export function PayrollConsole({ payrollData, onShowToast }) {
  const [payroll, setPayroll] = useState(payrollData);

  const handleRunBatch = () => {
    setPayroll(prev => prev.map(item => ({ ...item, status: 'Processed' })));
    onShowToast('August Payroll Batch executed successfully! All salaries processed.', 'success');
  };

  const handleViewSlip = (empName) => {
    onShowToast(`Downloading August 2026 Payslip for ${empName}...`, 'info');
  };

  return (
    <div className="screen active">
      {/* PAYROLL SUMMARY CARD */}
      <div className="card" style={{ marginBottom: '20px' }}>
        <div className="card-hd">
          <div>
            <div className="card-title">August 2026 Payroll Execution</div>
            <div className="card-sub">Monthly salary batch calculations and statutory compliance processing</div>
          </div>
          <button className="btn btn-primary" onClick={handleRunBatch}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Run Payroll Batch
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '12px' }}>
          <div style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>Gross Payroll</div>
            <div className="mono display" style={{ fontSize: '20px', fontWeight: 700, marginTop: '2px' }}>₹14.2L</div>
          </div>
          <div style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>PF & ESI Deductions</div>
            <div className="mono display" style={{ fontSize: '20px', fontWeight: 700, marginTop: '2px', color: 'var(--danger)' }}>₹1.85L</div>
          </div>
          <div style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>TDS Statutory Tax</div>
            <div className="mono display" style={{ fontSize: '20px', fontWeight: 700, marginTop: '2px', color: 'var(--gold)' }}>₹1.40L</div>
          </div>
          <div style={{ background: 'var(--canvas)', padding: '12px 16px', borderRadius: '12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--ink-soft)' }}>Net Bank Disbursement</div>
            <div className="mono display" style={{ fontSize: '20px', fontWeight: 700, marginTop: '2px', color: 'var(--success)' }}>₹10.95L</div>
          </div>
        </div>
      </div>

      {/* PAYROLL TABLE */}
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">Salary Breakdown Table</div>
            <div className="card-sub">Individual CTC components and net payout</div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Basic Salary</th>
                <th>HRA</th>
                <th>Gross CTC</th>
                <th>Deductions</th>
                <th>Net Pay</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {payroll.map(item => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.employeeName}</strong>
                    <div style={{ fontSize: '10.5px', color: 'var(--ink-soft)' }}>{item.designation}</div>
                  </td>
                  <td className="mono">{item.basicSalary}</td>
                  <td className="mono">{item.hra}</td>
                  <td className="mono">{item.grossCtc}</td>
                  <td className="mono" style={{ color: 'var(--danger)' }}>{item.deductions}</td>
                  <td className="mono"><strong>{item.netPay}</strong></td>
                  <td>
                    <span className={`badge ${item.status === 'Processed' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="btn btn-outline"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                      onClick={() => handleViewSlip(item.employeeName)}
                    >
                      View Slip
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PayrollConsole;
