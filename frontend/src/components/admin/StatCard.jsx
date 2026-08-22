import React from 'react';

export function StatCard({ label, value, subText, badgeClass, featured = false }) {
  return (
    <div className={`stat-card ${featured ? 'featured' : ''}`}>
      <div style={{ fontSize: '12px', opacity: featured ? 0.8 : 1, color: featured ? '#fff' : 'var(--ink-soft)' }}>
        {label}
      </div>
      <div className="display" style={{ fontSize: '32px', fontWeight: 700, margin: '4px 0' }}>
        {value}
      </div>
      {subText && (
        <span className={`badge ${badgeClass || 'badge-success'}`}>
          {subText}
        </span>
      )}
    </div>
  );
}

export default StatCard;
