// Dashboard Component for PGP DApp - White & Emerald Theme

import React from 'react';
import { GiveawayItem, ActivityItem, AppTab } from '../types.js';

interface DashboardProps {
  giveaway: GiveawayItem;
  activities: ActivityItem[];
  indexerConnected: boolean;
  setActiveTab: (tab: AppTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ giveaway, activities, indexerConnected, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ padding: '36px', background: 'linear-gradient(135deg, #ffffff, #f0fdf4)', border: '1px solid rgba(16, 185, 129, 0.25)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        
        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 10 }}>
          <span className="badge-status badge-open" style={{ marginBottom: '16px' }}>
            ● Zero-Knowledge Private Protocol
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', lineHeight: '1.2', color: '#0f172a' }}>
            Verify Winners Without Exposing <span className="gradient-text">Participant Lists</span>
          </h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '24px', lineHeight: '1.6' }}>
            Midnight Private Giveaway Platform leverages zk-SNARKs and Compact smart contracts to let organizers host verifiable giveaways while guaranteeing total participant privacy.
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={() => setActiveTab('giveaways')}>
              <span>🎟️</span> Enter Active Giveaway
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('verify')}>
              <span>🏆</span> Verify Winning Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Metric Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>Active Giveaways</span>
            <span>🔒 ZK Shielded</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#0f172a' }}>{indexerConnected ? '1' : '0'}</p>
          <p style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '600', marginTop: '4px' }}>
            {indexerConnected ? `● ${giveaway.state.replace(/_/g, ' ')}` : 'Not connected'}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>Total Private Entries</span>
            <span>👥 Anonymous</span>
          </div>
          <p style={{ fontSize: '2.25rem', fontWeight: '800', color: '#059669' }}>{giveaway.entryCount}</p>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Commitments on-chain</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>Prize Pool</span>
            <span>💰 Escrowed</span>
          </div>
          <p style={{ fontSize: '1.35rem', fontWeight: '800', color: '#047857', marginTop: '8px' }}>
            {indexerConnected ? (giveaway.prizeDetails || 'Not set') : '--'}
          </p>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>Preprod Network</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span style={{ fontWeight: '600' }}>Winner Status</span>
            <span>🎯 State</span>
          </div>
          <p style={{ fontSize: '1.35rem', fontWeight: '700', color: '#d97706', marginTop: '8px' }}>
            {giveaway.state === 'REGISTRATION_OPEN' ? 'Awaiting Draw' : giveaway.state}
          </p>
          <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '4px' }}>
            {giveaway.winnerClaimed ? 'Prize Claimed' : 'Unclaimed'}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Active Giveaway Highlight */}
        <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Featured Giveaway</h3>
            <span className="badge-status badge-open">Registration Open</span>
          </div>

          <div style={{ background: '#f0fdf4', borderRadius: '14px', padding: '20px', marginBottom: '20px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h4 style={{ fontSize: '1.15rem', color: '#047857', marginBottom: '6px' }}>{giveaway.title}</h4>
            <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: '16px' }}>{giveaway.prizeDetails}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748b', fontWeight: '600' }}>Organizer PK:</span>
                <p style={{ fontFamily: 'monospace', color: '#334155', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: '600' }}>
                  {giveaway.organizerPk.substring(0, 18)}...
                </p>
              </div>
              <div>
                <span style={{ color: '#64748b', fontWeight: '600' }}>Contract Address:</span>
                <p style={{ fontFamily: 'monospace', color: '#059669', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: '700' }}>
                  {giveaway.contractAddress.substring(0, 18)}...
                </p>
              </div>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('giveaways')}>
            Submit Private Entry Now →
          </button>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass-panel" style={{ padding: '28px', background: '#ffffff' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: '#0f172a' }}>Activity Log</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((act) => (
              <div key={act.id} style={{ background: '#f8fafc', border: '1px solid rgba(16, 185, 129, 0.15)', borderRadius: '12px', padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0f172a' }}>{act.action}</span>
                  <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700' }}>{act.status}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#475569', marginBottom: '4px' }}>{act.details}</p>
                <span style={{ fontSize: '0.725rem', color: '#94a3b8' }}>{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
