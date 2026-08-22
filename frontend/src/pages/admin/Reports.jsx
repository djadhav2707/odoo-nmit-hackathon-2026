import React from 'react';

export function Reports({ onShowToast }) {
  const reportsList = [
    {
      id: 'rpt-1',
      title: 'Workforce Attendance & Punch Report',
      description: 'Comprehensive log of daily check-ins, check-outs, overtime, and tardiness metrics.',
      format: 'PDF / CSV',
      lastGenerated: 'Today, 09:30 AM'
    },
    {
      id: 'rpt-2',
      title: 'Payroll & Tax Statutory Compliance Report',
      description: 'Detailed monthly breakdown of PF, ESI, TDS deductions and Form 16 statutory compliance.',
      format: 'EXCEL / PDF',
      lastGenerated: '15 Aug 2026'
    },
    {
      id: 'rpt-3',
      title: 'Headcount Growth & Departmental Distribution',
      description: 'Quarterly organizational metrics, new hires, attrition rates, and demographic breakdown.',
      format: 'PDF',
      lastGenerated: '01 Aug 2026'
    },
    {
      id: 'rpt-4',
      title: 'Leave Balance & Leave Encashment Summary',
      description: 'Annual view of employee leave consumption, pending balances, and year-end encashment.',
      format: 'EXCEL',
      lastGenerated: '10 Aug 2026'
    }
  ];

  const handleDownloadReport = (title) => {
    onShowToast(`Preparing ${title}... Export link ready for download.`, 'info');
  };

  return (
    <div className="screen active">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {reportsList.map(rpt => (
          <div key={rpt.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="card-title" style={{ fontSize: '15px', color: 'var(--wine-dark)' }}>{rpt.title}</div>
              <p style={{ fontSize: '12.5px', color: 'var(--ink-soft)', margin: '8px 0 14px 0', lineHeight: '1.4' }}>
                {rpt.description}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ fontSize: '11px', color: 'var(--ink-faint)' }}>
                Format: <span className="mono">{rpt.format}</span> | Generated: {rpt.lastGenerated}
              </div>
              <button
                className="btn btn-outline"
                style={{ padding: '6px 12px', fontSize: '11.5px' }}
                onClick={() => handleDownloadReport(rpt.title)}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Report
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reports;
