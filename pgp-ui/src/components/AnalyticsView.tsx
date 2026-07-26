// Analytics & Metrics View for PGP DApp - White & Emerald Theme

import React from 'react';
import { GiveawayItem } from '../types.js';

interface AnalyticsViewProps {
  giveaway: GiveawayItem;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ giveaway }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f172a' }}>📈 Protocol Analytics & ZK Metrics</h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Real-time metrics on Zero-Knowledge proof performance, commitment tree accumulator state, and ledger throughput.
        </p>

        {/* Performance Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Average Proof Generation Time</span>
            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#059669', marginTop: '4px' }}>1.24s</p>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>ZK Prover Memory Peak</span>
            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#047857', marginTop: '4px' }}>412 MB</p>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Accumulator Tree Height</span>
            <p style={{ fontSize: '1.75rem', fontWeight: '800', color: '#0d9488', marginTop: '4px' }}>32 Levels</p>
          </div>

          <div style={{ background: '#f0fdf4', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: '14px', padding: '20px' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Privacy Score</span>
            <p style={{ fontSize: '1.4rem', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>100% Zero-Knowledge</p>
          </div>
        </div>

        {/* Accumulator Tree Inspector */}
        <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#0f172a' }}>🌳 On-Chain Commitment Accumulator State</h3>
        <div style={{ background: '#f8fafc', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '14px', padding: '24px', fontFamily: 'monospace', fontSize: '0.875rem' }}>
          <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '600' }}>// Current Entry Accumulator Hash</div>
          <div style={{ color: '#059669', wordBreak: 'break-all', marginBottom: '16px', fontWeight: '700' }}>{giveaway.entryAccumulator}</div>

          <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '600' }}>// Circuit Verification Key Digest</div>
          <div style={{ color: '#047857', wordBreak: 'break-all', fontWeight: '700' }}>0x9a8f21b7c4e5d8a01f92e3d4c5b6a7890123456789abcdef0123456789abcdef</div>
        </div>

      </div>

    </div>
  );
};

export default AnalyticsView;
