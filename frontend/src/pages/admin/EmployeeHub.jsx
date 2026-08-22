import React, { useState, useMemo, useRef, useEffect } from 'react';
import StatusBadge from '../../components/admin/StatusBadge';

// Highlights matching text in a string
function Highlight({ text, query }) {
  if (!query || !text) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark style={{ background: 'rgba(164,40,80,0.18)', color: 'var(--wine-dark)', borderRadius: '2px', padding: '0 1px' }}>
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

const DEPARTMENTS = ['All', 'Engineering', 'Design', 'Human Resources', 'Quality Assurance', 'Finance', 'Marketing'];

export function EmployeeHub({ employees, onSelectEmployee, onOpenAddModal }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const searchRef = useRef(null);

  // Auto-focus search input when component mounts
  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const filteredEmployees = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return employees.filter(emp => {
      const matchesSearch = !q ||
        (emp.name?.toLowerCase().includes(q)) ||
        (emp.designation?.toLowerCase().includes(q)) ||
        (emp.role?.toLowerCase().includes(q)) ||
        (emp.id?.toLowerCase().includes(q)) ||
        (emp.email?.toLowerCase().includes(q)) ||
        (emp.department?.toLowerCase().includes(q));
      const matchesDept = selectedDept === 'All' || emp.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [employees, searchTerm, selectedDept]);

  const hasFilters = searchTerm.trim() !== '' || selectedDept !== 'All';

  const clearAll = () => {
    setSearchTerm('');
    setSelectedDept('All');
    searchRef.current?.focus();
  };

  return (
    <div className="screen active">

      {/* ── SEARCH AND FILTER BAR ── */}
      <div className="filter-bar">
        <div style={{ display: 'flex', gap: '10px', flex: 1, flexWrap: 'wrap', alignItems: 'center' }}>

          {/* Search Input */}
          <div
            className="search-input-wrap"
            style={{ flex: '1', minWidth: '220px', maxWidth: '380px' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" style={{ flexShrink: 0, opacity: 0.5 }}>
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              ref={searchRef}
              type="text"
              placeholder="Search name, role, ID, email…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
            />
            {searchTerm && (
              <button
                onClick={() => { setSearchTerm(''); searchRef.current?.focus(); }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px',
                  color: 'var(--ink-soft)', display: 'flex', alignItems: 'center', flexShrink: 0
                }}
                title="Clear search"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6 6 18M6 6l12 12"/>
                </svg>
              </button>
            )}
          </div>

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{
              padding: '8px 16px', borderRadius: '100px', border: '1.5px solid var(--border)',
              background: 'var(--surface)', fontSize: '12.5px', color: 'var(--ink)',
              outline: 'none', cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif",
              boxShadow: selectedDept !== 'All' ? '0 0 0 2px rgba(164,40,80,0.2)' : 'none',
              borderColor: selectedDept !== 'All' ? 'var(--rose)' : 'var(--border)'
            }}
          >
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Departments' : d}</option>
            ))}
          </select>

          {/* Clear All filters pill */}
          {hasFilters && (
            <button
              onClick={clearAll}
              style={{
                padding: '6px 14px', borderRadius: '100px', border: '1.5px solid var(--rose)',
                background: 'rgba(164,40,80,0.06)', fontSize: '12px', color: 'var(--rose)',
                cursor: 'pointer', fontFamily: "'Inter', system-ui, sans-serif", whiteSpace: 'nowrap'
              }}
            >
              Clear filters
            </button>
          )}
        </div>

        <button className="btn btn-primary" onClick={onOpenAddModal}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add Employee
        </button>
      </div>

      {/* ── RESULT COUNT BAR ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '4px 0 10px', fontSize: '12px', color: 'var(--ink-soft)'
      }}>
        {employees.length === 0 ? (
          <span>Loading employees…</span>
        ) : (
          <>
            <span>
              Showing <strong style={{ color: 'var(--ink)' }}>{filteredEmployees.length}</strong>
              {' '}of{' '}
              <strong style={{ color: 'var(--ink)' }}>{employees.length}</strong> employees
            </span>
            {hasFilters && filteredEmployees.length !== employees.length && (
              <span style={{
                background: 'rgba(164,40,80,0.1)', color: 'var(--rose)',
                fontSize: '11px', padding: '2px 8px', borderRadius: '100px', fontWeight: 600
              }}>
                Filtered
              </span>
            )}
          </>
        )}
      </div>

      {/* ── EMPLOYEE CARDS GRID ── */}
      {employees.length === 0 ? (
        /* Loading skeleton */
        <div className="emp-grid">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="emp-card" style={{ animation: 'pulse 1.4s ease-in-out infinite' }}>
              <div style={{ height: '18px', background: 'var(--border)', borderRadius: '6px', marginBottom: '8px' }}/>
              <div style={{ height: '12px', background: 'var(--border)', borderRadius: '6px', width: '60%', marginBottom: '6px' }}/>
              <div style={{ height: '12px', background: 'var(--border)', borderRadius: '6px', width: '40%' }}/>
            </div>
          ))}
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 20px' }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--ink-faint)" strokeWidth="1.5" style={{ marginBottom: '12px' }}>
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <p style={{ color: 'var(--ink-soft)', fontSize: '14px', marginBottom: '8px', fontWeight: 600 }}>No employees found</p>
          <p style={{ color: 'var(--ink-faint)', fontSize: '12.5px' }}>
            No results for {searchTerm && <strong>"{searchTerm}"</strong>}
            {selectedDept !== 'All' && <> in <strong>{selectedDept}</strong></>}.
          </p>
          <button onClick={clearAll} className="btn btn-outline" style={{ marginTop: '16px' }}>
            Clear filters
          </button>
        </div>
      ) : (
        <div className="emp-grid">
          {filteredEmployees.map(emp => (
            <div key={emp.id} className="emp-card">
              <div className="emp-card-top">
                <div className="emp-avatar-md">{emp.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '1.3' }}>
                    <Highlight text={emp.name} query={searchTerm.trim()} />
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--ink-soft)', marginTop: '1px' }}>
                    <Highlight text={emp.designation || emp.role} query={searchTerm.trim()} />
                  </div>
                  <div style={{ fontSize: '10.5px', color: 'var(--ink-faint)', marginTop: '2px' }} className="mono">
                    <Highlight text={emp.id} query={searchTerm.trim()} />
                  </div>
                </div>
                <StatusBadge status={emp.status || 'Active'} />
              </div>

              <div style={{
                fontSize: '12px', color: 'var(--ink-soft)',
                borderTop: '1px solid var(--border)', paddingTop: '10px',
                display: 'flex', flexDirection: 'column', gap: '4px'
              }}>
                <div><strong>Dept:</strong>{' '}
                  <Highlight text={emp.department} query={searchTerm.trim()} />
                </div>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  <strong>Email:</strong>{' '}
                  <Highlight text={emp.email} query={searchTerm.trim()} />
                </div>
                <div><strong>CTC:</strong> <span className="mono">{emp.ctc || emp.salary}</span></div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  className="btn btn-outline"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => onSelectEmployee(emp)}
                >
                  View Details
                </button>
                <button
                  className="btn btn-outline"
                  style={{ padding: '8px 12px' }}
                  title="Edit Employee"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeHub;
