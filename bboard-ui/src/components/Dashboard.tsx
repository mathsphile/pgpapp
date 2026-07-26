// Dashboard Component for PGP DApp

import React from 'react';
import { GiveawayItem, ActivityItem, AppTab } from '../types.js';

interface DashboardProps {
  giveaway: GiveawayItem;
  activities: ActivityItem[];
  setActiveTab: (tab: AppTab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ giveaway, activities, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Hero Banner */}
      <div className="glass-panel" style={{ padding: '36px', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)', filter: 'blur(20px)' }} />
        
        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 10 }}>
          <span className="badge-status badge-open" style={{ marginBottom: '16px' }}>
            ● Zero-Knowledge Private Protocol
          </span>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '12px', lineHeight: '1.2' }}>
            Verify Winners Without Exposing <span className="gradient-text">Participant Lists</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '24px', lineHeight: '1.6' }}>
            Midnight Private Giveaway Platform leverages zk-SNARKs and Compact smart contracts to let organizers host verifiable giveaways while guaranteeing total participant privacy.
          </p>

          <div style={{ display: 'flex', gap: '16px' }}>
            <button className="btn-primary" onClick={() => setActiveTab('giveaways')}>
              <span>🎟️</span> Enter Active Giveaway
            </button>
            <button className="btn-secondary" onClick={() => setActiveTab('verify')}>
              <span>🏆</span> Verify Winning Ticket
            </button>
          </div>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span>Active Giveaways</span>
            <span>🔒 ZK Shielded</span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#fff' }}>1</p>
          <p style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '4px' }}>● 1 Registration Open</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span>Total Private Entries</span>
            <span>👥 Anonymous</span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#c084fc' }}>{giveaway.entryCount}</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Commitments on-chain</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span>Prize Pool</span>
            <span>💰 Escrowed</span>
          </div>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#38bdf8' }}>1,000 tNIGHT</p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Preprod Network</p>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
            <span>Winner Status</span>
            <span>🎯 State</span>
          </div>
          <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fbbf24', marginTop: '8px' }}>
            {giveaway.state === 'REGISTRATION_OPEN' ? 'Awaiting Draw' : giveaway.state}
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            {giveaway.winnerClaimed ? 'Prize Claimed' : 'Unclaimed'}
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Active Giveaway Highlight */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.25rem' }}>Featured Giveaway</h3>
            <span className="badge-status badge-open">Registration Open</span>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', padding: '20px', marginBottom: '20px', border: '1px solid var(--border-glass)' }}>
            <h4 style={{ fontSize: '1.1rem', color: '#818cf8', marginBottom: '6px' }}>{giveaway.title}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>{giveaway.prizeDetails}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Organizer PK:</span>
                <p style={{ fontFamily: 'monospace', color: 'var(--text-muted)', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {giveaway.organizerPk.substring(0, 16)}...
                </p>
              </div>
              <div>
                <span style={{ color: 'var(--text-dim)' }}>Contract Placeholder Address:</span>
                <p style={{ fontFamily: 'monospace', color: '#fbbf24', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {giveaway.contractAddress}
                </p>
              </div>
            </div>
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => setActiveTab('giveaways')}>
            Submit Private Entry Now →
          </button>
        </div>

        {/* Real-time Activity Feed */}
        <div className="glass-panel" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Activity Log</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activities.map((act) => (
              <div key={act.id} style={{ background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--border-glass)', borderRadius: '10px', padding: '12px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600', fontSize: '0.85rem', color: '#fff' }}>{act.action}</span>
                  <span style={{ fontSize: '0.75rem', color: '#34d399' }}>{act.status}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>{act.details}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{act.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
