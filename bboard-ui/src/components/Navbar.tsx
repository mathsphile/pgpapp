// Navbar Component for PGP DApp

import React from 'react';
import { AppTab, WalletState } from '../types.js';

interface NavbarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  wallet: WalletState;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, wallet }) => {
  const tabs: { id: AppTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'giveaways', label: 'Giveaways', icon: '🎟️' },
    { id: 'verify', label: 'Winner Verification', icon: '🏆' },
    { id: 'organizer', label: 'Organizer Console', icon: '⚡' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <header className="glass-header">
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand / Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => setActiveTab('dashboard')}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1, #a855f7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '1.2rem',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.4)'
          }}>
            🛡️
          </div>
          <div>
            <h2 className="gradient-text" style={{ fontSize: '1.25rem', lineHeight: '1.2' }}>Midnight PGP</h2>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Private Giveaway Platform</p>
          </div>
        </div>

        {/* Nav Tabs */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                  border: isActive ? '1px solid rgba(99, 102, 241, 0.5)' : '1px solid transparent',
                  color: isActive ? '#fff' : 'var(--text-muted)',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Wallet Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid var(--border-glass)',
            borderRadius: '12px',
            padding: '6px 14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{wallet.network}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8' }}>{wallet.balance}</p>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
