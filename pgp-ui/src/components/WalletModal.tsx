// Wallet Connection Modal Component for PGP DApp - Real Detection & Installation Guidance

import React from 'react';
import { WalletState } from '../types.js';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  wallet: WalletState;
  connectWallet: (type: 'lace' | '1am' | 'seed') => void;
  disconnectWallet: () => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  wallet,
  connectWallet,
  disconnectWallet,
}) => {
  if (!isOpen) return null;

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
          maxWidth: '520px',
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
                <p style={{ fontSize: '0.825rem', color: '#64748b' }}>Select your Midnight Preprod Remote provider</p>
              </div>
            </div>

            {wallet.error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '12px 16px', borderRadius: '10px', fontSize: '0.85rem', margin: '16px 0 8px 0', lineHeight: '1.4' }}>
                ⚠️ {wallet.error}
              </div>
            )}

            <p style={{ color: '#475569', fontSize: '0.9rem', margin: '16px 0 24px 0', lineHeight: '1.5' }}>
              Connect your wallet to generate client-side zk-SNARK witnesses, submit private giveaway entries, and prove winning tickets.
            </p>

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
                <span className={`badge-status ${wallet.isLaceInstalled ? 'badge-open' : 'badge-pending'}`} style={{ fontSize: '0.7rem' }}>
                  {wallet.isLaceInstalled ? 'Detected' : 'Install Lace'}
                </span>
              </div>

              {!wallet.isLaceInstalled && (
                <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Don't have Lace Wallet for Midnight?</span>
                  <a
                    href="https://www.lace.io/"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#059669', fontWeight: '700', textDecoration: 'none' }}
                  >
                    Install Extension ↗
                  </a>
                </div>
              )}

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
                    <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Testnet connector with auto tNIGHT faucet</p>
                  </div>
                </div>
                <span className="badge-status badge-open" style={{ fontSize: '0.7rem' }}>Faucet Ready</span>
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
                    <p style={{ fontSize: '0.78rem', color: '#64748b' }}>Local private state LevelDB key store</p>
                  </div>
                </div>
                <span className="badge-status badge-open" style={{ fontSize: '0.7rem' }}>Headless</span>
              </div>

            </div>
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
                Connected via {wallet.walletType?.toUpperCase()} Wallet
              </p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '20px', marginBottom: '24px', fontSize: '0.875rem' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>ACCOUNT ADDRESS</span>
                <p style={{ fontFamily: 'monospace', color: '#0f172a', fontWeight: '700', wordBreak: 'break-all', marginTop: '2px' }}>
                  {wallet.address}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>NETWORK</span>
                  <span style={{ color: '#047857', fontWeight: '700' }}>{wallet.network}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#64748b', fontSize: '0.78rem', fontWeight: '600', display: 'block' }}>BALANCE</span>
                  <span style={{ color: '#059669', fontWeight: '800' }}>{wallet.balance}</span>
                </div>
              </div>
            </div>

            <button
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'center', borderColor: '#dc2626', color: '#dc2626', background: '#fef2f2', padding: '12px' }}
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
