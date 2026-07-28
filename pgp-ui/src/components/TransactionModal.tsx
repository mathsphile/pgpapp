// Transaction Status Modal Component for PGP DApp - White & Emerald Theme

import React from 'react';
import { TransactionStatus } from '../types.js';

interface TransactionModalProps {
  isOpen: boolean;
  status: TransactionStatus;
  action: string;
  message: string;
  txHash?: string;
  onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
  isOpen,
  status,
  action,
  message,
  txHash,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '480px',
          padding: '36px',
          textAlign: 'center',
          background: '#ffffff',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        {/* Status Indicator */}
        <div style={{ marginBottom: '20px' }}>
          {status === 'Pending' && <div style={{ fontSize: '3rem' }}>⚡</div>}
          {status === 'Processing' && (
            <div style={{ fontSize: '3rem' }} className="pulse-glow">
              ⚙️
            </div>
          )}
          {status === 'Confirmed' && <div style={{ fontSize: '3rem' }}>✅</div>}
          {status === 'Failed' && <div style={{ fontSize: '3rem' }}>❌</div>}
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#0f172a' }}>{action}</h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '20px' }}>{message}</p>

        {txHash && (
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '10px',
              padding: '12px',
              marginBottom: '24px',
              fontFamily: 'monospace',
              fontSize: '0.825rem',
              color: '#059669',
              fontWeight: '700',
            }}
          >
            TxHash: {txHash}
          </div>
        )}

        {status === 'Confirmed' || status === 'Failed' ? (
          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
            onClick={onClose}
          >
            Done
          </button>
        ) : (
          <div style={{ fontSize: '0.875rem', color: '#059669', fontWeight: '600' }}>
            Processing Zero-Knowledge proof on Midnight Network...
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;
