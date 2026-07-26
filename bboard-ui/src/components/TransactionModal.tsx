// Transaction Status Modal Component for PGP DApp

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

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, status, action, message, txHash, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '24px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '480px', padding: '32px', textAlign: 'center', background: '#0f172a' }}>
        
        {/* Status Indicator */}
        <div style={{ marginBottom: '20px' }}>
          {status === 'Pending' && <div style={{ fontSize: '3rem' }}>⚡</div>}
          {status === 'Processing' && <div style={{ fontSize: '3rem' }} className="pulse-glow">⚙️</div>}
          {status === 'Confirmed' && <div style={{ fontSize: '3rem' }}>✅</div>}
          {status === 'Failed' && <div style={{ fontSize: '3rem' }}>❌</div>}
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>{action}</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>{message}</p>

        {txHash && (
          <div style={{ background: 'rgba(15, 23, 42, 0.8)', border: '1px solid var(--border-glass)', borderRadius: '8px', padding: '12px', marginBottom: '24px', fontFamily: 'monospace', fontSize: '0.8rem', color: '#38bdf8' }}>
            TxHash: {txHash}
          </div>
        )}

        {status === 'Confirmed' || status === 'Failed' ? (
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
            Done
          </button>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Processing Zero-Knowledge proof on Midnight Network...
          </div>
        )}

      </div>
    </div>
  );
};
