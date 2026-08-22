import React, { useState } from 'react';
import Modal from '../common/Modal';

export function EmployeeModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    designation: '',
    phone: '',
    ctc: '₹12,00,000'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.designation) {
      alert('Please fill out all required fields.');
      return;
    }
    onSave(formData);
    setFormData({ name: '', email: '', department: 'Engineering', designation: '', phone: '', ctc: '₹12,00,000' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Employee">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name *</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Rahul Sharma"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Work Email *</label>
          <input
            type="email"
            name="email"
            placeholder="rahul.s@dayflow.hr"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none', background: '#fff' }}
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Product">Product</option>
              <option value="Sales">Sales</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Designation *</label>
            <input
              type="text"
              name="designation"
              placeholder="e.g. Software Engineer"
              value={formData.designation}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
              required
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Phone</label>
            <input
              type="text"
              name="phone"
              placeholder="+91 98765 00000"
              value={formData.phone}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Annual CTC</label>
            <input
              type="text"
              name="ctc"
              placeholder="₹12,00,000"
              value={formData.ctc}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1.5px solid var(--border)', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <button type="button" className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Save & Send Invite
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EmployeeModal;
