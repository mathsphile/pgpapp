// Navbar Component for PGP DApp - White & Emerald Theme with Wallet Connection Toggle

import React from 'react';
import { AppTab, WalletState } from '../types.js';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  wallet: WalletState;
  toggleWalletConnection: () => void;
  onOpenWalletModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  wallet,
  toggleWalletConnection,
  onOpenWalletModal,
}) => {
  const tabs: { id: AppTab; label: string; icon: string }[] = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'giveaways', label: 'Giveaways', icon: '🎟️' },
    { id: 'verify', label: 'Winner Verification', icon: '🏆' },
    { id: 'organizer', label: 'Organizer Console', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="glass-header">
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Brand / Logo */}
        <div
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
          onClick={() => setActiveTab('home')}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '1.25rem',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.35)',
              color: '#fff',
            }}
          >
            🛡️
          </div>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '1.3rem', lineHeight: '1.2', fontWeight: '800' }}>
              Midnight PGP
            </h2>
            <p style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>Private Giveaway Platform</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '4px 0' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? '#ecfdf5' : 'transparent',
                  border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid transparent',
                  color: isActive ? '#047857' : '#64748b',
                  borderRadius: '12px',
                  padding: '8px 14px',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? '700' : '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 2px 8px rgba(16, 185, 129, 0.12)' : 'none',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Wallet Connection Toggle Switch & Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Toggle Switch */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8fafc',
              padding: '4px 8px',
              borderRadius: '20px',
              border: '1px solid rgba(16, 185, 129, 0.2)',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: wallet.isConnected ? '#059669' : '#64748b' }}>
              {wallet.isConnected ? 'Connected' : 'Disconnected'}
            </span>
            <button
              onClick={toggleWalletConnection}
              title={wallet.isConnected ? 'Click to Disconnect' : 'Click to Connect Wallet'}
              style={{
                width: '44px',
                height: '24px',
                borderRadius: '12px',
                background: wallet.isConnected ? '#10b981' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  position: 'absolute',
                  top: '3px',
                  left: wallet.isConnected ? '23px' : '3px',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                }}
              />
            </button>
          </div>

          {/* Connection Details Button */}
          {wallet.isConnected ? (
            <button
              onClick={onOpenWalletModal}
              style={{
                background: '#ffffff',
                border: '1px solid var(--border-glass-strong)',
                borderRadius: '12px',
                padding: '6px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.1)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  boxShadow: '0 0 8px #10b981',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: '600' }}>
                  {wallet.address?.substring(0, 10)}... ({wallet.walletType?.toUpperCase()})
                </p>
                <p style={{ fontSize: '0.85rem', fontWeight: '800', color: '#059669' }}>{wallet.balance}</p>
              </div>
            </button>
          ) : (
            <button
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.875rem' }}
              onClick={onOpenWalletModal}
            >
              <span className="pulse-glow">⚡</span> Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
