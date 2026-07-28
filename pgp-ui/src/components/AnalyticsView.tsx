// Analytics View - Shows Real On-Chain State from Connected Contract

import React from 'react';
import { GiveawayItem } from '../types.js';

interface AnalyticsViewProps {
  giveaway: GiveawayItem;
  indexerConnected: boolean;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ giveaway, indexerConnected }) => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f172a' }}>
          📈 Protocol Analytics & ZK Metrics
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          {indexerConnected
            ? 'Live state read from the on-chain PGP contract on Midnight Preprod.'
            : 'Connect to a deployed contract on the Settings tab to view live on-chain state.'}
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Giveaway State</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#059669', marginTop: '4px' }}>
              {indexerConnected ? giveaway.state.replace(/_/g, ' ') : 'N/A'}
            </p>
          </div>

          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Entry Commitments</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#047857', marginTop: '4px' }}>
              {indexerConnected ? giveaway.entryCount : '--'}
            </p>
          </div>

          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Winner Claimed</span>
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: '800',
                color: giveaway.winnerClaimed ? '#059669' : '#64748b',
                marginTop: '4px',
              }}
            >
              {indexerConnected ? (giveaway.winnerClaimed ? 'YES' : 'NO') : '--'}
            </p>
          </div>

          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>Circuits</span>
            <p style={{ fontSize: '1.5rem', fontWeight: '800', color: '#0d9488', marginTop: '4px' }}>5</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: '#0f172a' }}>
          🌳 On-Chain Commitment Accumulator
        </h3>
        <div
          style={{
            background: '#f8fafc',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '14px',
            padding: '24px',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
          }}
        >
          <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '600' }}>// entryAccumulator (current)</div>
          <div style={{ color: '#059669', wordBreak: 'break-all', marginBottom: '16px', fontWeight: '700' }}>
            {indexerConnected ? giveaway.entryAccumulator || '(empty)' : '(not connected)'}
          </div>

          <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '600' }}>// winningCommitment</div>
          <div style={{ color: '#047857', wordBreak: 'break-all', marginBottom: '16px', fontWeight: '700' }}>
            {indexerConnected ? giveaway.winningCommitment || '(not set)' : '(not connected)'}
          </div>

          <div style={{ color: '#64748b', marginBottom: '6px', fontWeight: '600' }}>// organizerPk</div>
          <div style={{ color: '#047857', wordBreak: 'break-all', fontWeight: '700' }}>
            {indexerConnected ? giveaway.organizerPk || '(not set)' : '(not connected)'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
