// WalletGate Component for Gated Access - White & Emerald Theme

import React from 'react';
import { WalletState } from '../types.js';

interface WalletGateProps {
  wallet: WalletState;
  onOpenWalletModal: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
}

export const WalletGate: React.FC<WalletGateProps> = ({
  wallet,
  onOpenWalletModal,
  title,
  description,
  children,
}) => {
  if (wallet.isConnected) {
    return <>{children}</>;
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div
        className="glass-panel"
        style={{
          padding: '48px 36px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #ffffff, #f0fdf4)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#ecfdf5',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.25rem',
            margin: '0 auto 20px auto',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.15)',
          }}
        >
          🔒
        </div>

        <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#0f172a' }}>{title}</h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 28px auto', lineHeight: '1.6' }}>
          {description}
        </p>

        <button
          className="btn-primary"
          style={{ padding: '14px 32px', fontSize: '1rem', margin: '0 auto' }}
          onClick={onOpenWalletModal}
        >
          <span>🛡️</span> Connect Midnight Wallet to Unlock
        </button>

        <div
          style={{
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid rgba(16, 185, 129, 0.15)',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '0.85rem',
            color: '#64748b',
          }}
        >
          <span>🦔 Lace Wallet Supported</span>
          <span>⚡ 1AM Connector Ready</span>
          <span>🔑 Zero-Knowledge Witness</span>
        </div>
      </div>
    </div>
  );
};

export default WalletGate;
