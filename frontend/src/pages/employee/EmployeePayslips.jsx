import React from 'react';

export function EmployeePayslips({ onShowToast }) {
  const payslips = [
    { month: 'July 2026', gross: '₹1,20,833', deductions: '₹10,500', netPay: '₹1,10,333', status: 'Paid' },
    { month: 'June 2026', gross: '₹1,20,833', deductions: '₹10,500', netPay: '₹1,10,333', status: 'Paid' },
    { month: 'May 2026', gross: '₹1,20,833', deductions: '₹10,500', netPay: '₹1,10,333', status: 'Paid' }
  ];

  const handleDownload = (month) => {
    onShowToast(`Downloading official payslip PDF for ${month}...`, 'info');
  };

  return (
    <div className="screen active">
      <div className="card">
        <div className="card-hd">
          <div>
            <div className="card-title">Salary Slips & Tax Statements</div>
            <div className="card-sub">Download verified monthly pay receipts</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Pay Period</th>
              <th>Gross Earnings</th>
              <th>Deductions</th>
              <th>Net Credit</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((item, idx) => (
              <tr key={idx}>
                <td><strong>{item.month}</strong></td>
                <td className="mono">{item.gross}</td>
                <td className="mono" style={{ color: 'var(--danger)' }}>{item.deductions}</td>
                <td className="mono"><strong>{item.netPay}</strong></td>
                <td><span className="badge badge-success">{item.status}</span></td>
                <td style={{ textAlign: 'right' }}>
                  <button
                    className="btn btn-outline"
                    style={{ padding: '4px 10px', fontSize: '11px' }}
                    onClick={() => handleDownload(item.month)}
                  >
                    Download PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeePayslips;
