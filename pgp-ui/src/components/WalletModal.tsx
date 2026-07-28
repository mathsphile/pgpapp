// Wallet Connection Modal Component for PGP DApp - Real Provider & Custom Address Input

import React, { useState } from 'react';
import { WalletState } from '../types.js';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  connectWallet: (type: 'lace' | '1am' | 'seed' | 'custom', customAddress?: string) => void;
  disconnectWallet: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  connectWallet,
  disconnectWallet,
}) => {
  const [customAddr, setCustomAddr] = useState<string>('');
  const [activeMode, setActiveMode] = useState<'select' | 'custom'>('select');

  if (!isOpen) return null;

  const handleConnectCustom = () => {
    if (!customAddr || customAddr.trim().length < 10) {
      alert('Please enter a valid Midnight wallet address (e.g., mn_addr_preprod... or 0x...)');
      return;
    }
    connectWallet('custom', customAddr.trim());
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '540px',
          padding: '36px',
          background: '#ffffff',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close X */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            right: '20px',
            top: '20px',
            background: 'none',
            border: 'none',
            fontSize: '1.25rem',
            cursor: 'pointer',
            color: '#64748b',
          }}
        >
          ✕
        </button>

        {!wallet.isConnected ? (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: '800',
                }}
              >
                🛡️
              </div>
              <div>
                <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>Connect Midnight Wallet</h3>
                <p style={{ fontSize: '0.825rem', color: '#64748b' }}>
                  Connect your Midnight Preprod Remote provider or address
                </p>
              </div>
            </div>

            {wallet.error && (
              <div
                style={{
                  background: '#fef2f2',
                  border: '1px solid #fca5a5',
                  color: '#991b1b',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  margin: '16px 0 8px 0',
                  lineHeight: '1.4',
                }}
              >
                ⚠️ {wallet.error}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px', margin: '16px 0 20px 0' }}>
              <button
                className={activeMode === 'select' ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem', justifyContent: 'center' }}
                onClick={() => setActiveMode('select')}
              >
                ⚡ Browser Extension
              </button>
              <button
                className={activeMode === 'custom' ? 'btn-primary' : 'btn-secondary'}
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem', justifyContent: 'center' }}
                onClick={() => setActiveMode('custom')}
              >
                📝 Enter Custom Address
              </button>
            </div>

            {activeMode === 'select' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Option 1: Lace Wallet Extension */}
                <div
                  onClick={() => connectWallet('lace')}
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                  className="wallet-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🦔</span>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>Lace Wallet Extension</h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {wallet.isLaceInstalled ? 'Detected in browser' : 'Midnight Preprod Chrome Extension'}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`badge-status ${wallet.isLaceInstalled ? 'badge-open' : 'badge-pending'}`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {wallet.isLaceInstalled ? 'Detected' : 'Install Lace'}
                  </span>
                </div>

                {/* Option 2: 1AM Wallet */}
                <div
                  onClick={() => connectWallet('1am')}
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                  className="wallet-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '1.8rem' }}>⚡</span>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>1AM Wallet Connector</h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Connect to Midnight Preprod remote wallet node
                      </p>
                    </div>
                  </div>
                  <span className="badge-status badge-open" style={{ fontSize: '0.7rem' }}>
                    1AM Connector
                  </span>
                </div>

                {/* Option 3: Seed / Private State Wallet */}
                <div
                  onClick={() => connectWallet('seed')}
                  style={{
                    background: '#f0fdf4',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                  className="wallet-option"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontSize: '1.8rem' }}>🔑</span>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#0f172a' }}>Seed Phrase Import</h4>
                      <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Local private state witness key store</p>
                    </div>
                  </div>
                  <span className="badge-status badge-open" style={{ fontSize: '0.7rem' }}>
                    Headless
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: '#475569', fontSize: '0.875rem' }}>
                  Enter your real Midnight Network Bech32 wallet address (`mn_addr_preprod...` or `0x...`):
                </p>
                <div>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748b',
                      fontWeight: '700',
                      display: 'block',
                      marginBottom: '4px',
                    }}
                  >
                    MIDNIGHT WALLET ADDRESS
                  </span>
                  <input
                    className="input-glass"
                    placeholder="mn_addr_preprod1..."
                    value={customAddr}
                    onChange={(e) => setCustomAddr(e.target.value)}
                    style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}
                  />
                </div>
                <button
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
                  onClick={handleConnectCustom}
                >
                  ⚡ Connect Custom Midnight Address
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#ecfdf5',
                  color: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  margin: '0 auto 12px auto',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                ✅
              </div>
              <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>Wallet Connected</h3>
              <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: '600' }}>
                Connected via {wallet.walletType?.toUpperCase()} Provider
              </p>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid rgba(16, 185, 129, 0.2)',
                borderRadius: '14px',
                padding: '20px',
                marginBottom: '24px',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>
                  ACCOUNT ADDRESS
                </span>
                <p
                  style={{
                    fontFamily: 'monospace',
                    color: '#0f172a',
                    fontWeight: '700',
                    wordBreak: 'break-all',
                    marginTop: '2px',
                  }}
                >
                  {wallet.address}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>
                    NETWORK
                  </span>
                  <span style={{ color: '#047857', fontWeight: '700' }}>{wallet.network}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>
                    BALANCE
                  </span>
                  <span style={{ color: '#059669', fontWeight: '800' }}>{wallet.balance}</span>
                </div>
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{
                width: '100%',
                justifyContent: 'center',
                borderColor: '#dc2626',
                color: '#dc2626',
                background: '#fef2f2',
                padding: '12px',
              }}
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletModal;
