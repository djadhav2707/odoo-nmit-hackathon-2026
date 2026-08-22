import React from 'react';

export function Notification({ message, type = 'info', onClose }) {
  if (!message) return null;

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            marginLeft: 'auto',
            fontWeight: 'bold',
            fontSize: '14px'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Notification;
