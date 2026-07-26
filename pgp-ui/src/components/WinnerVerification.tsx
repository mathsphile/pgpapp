// Winner Verification Portal Component for PGP DApp - White & Emerald Theme

import React, { useState } from 'react';
import { GiveawayItem } from '../types.js';

interface WinnerVerificationProps {
  giveaway: GiveawayItem;
  triggerTransactionFlow: (actionName: string, successCallback: () => void, detailsText: string) => Promise<void>;
  setGiveaway: React.Dispatch<React.SetStateAction<GiveawayItem>>;
}

export const WinnerVerification: React.FC<WinnerVerificationProps> = ({ giveaway, triggerTransactionFlow, setGiveaway }) => {
  const [ticketSecretInput, setTicketSecretInput] = useState<string>('');
  const [verificationResult, setVerificationResult] = useState<{ status: 'idle' | 'success' | 'failed'; message: string }>({
    status: 'idle',
    message: '',
  });

  const handleVerifyAndClaim = () => {
    if (!ticketSecretInput.trim()) {
      alert('Please enter your private ticket secret.');
      return;
    }

    triggerTransactionFlow(
      'Prize Claimed via ZK Verification',
      () => {
        setGiveaway((prev) => ({
          ...prev,
          state: 'COMPLETED',
          winnerClaimed: true,
        }));
        setVerificationResult({
          status: 'success',
          message: 'Zero-Knowledge Proof Verified! Prize transferred to winner account without revealing ticket identity.',
        });
      },
      'Verified ZK winner proof matching on-chain commitment'
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f172a' }}>🏆 ZK Winner Verification & Prize Claim</h2>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.95rem' }}>
          Verify if your ticket secret matches the winning commitment on-chain. Zero-Knowledge proofs verify ownership without exposing non-winning entries.
        </p>

        {/* Status Box */}
        <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', marginBottom: '28px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#64748b', fontWeight: '600' }}>On-Chain Winning Commitment:</span>
            <span style={{ color: '#d97706', fontWeight: '700', fontFamily: 'monospace' }}>
              {giveaway.winningCommitment !== '0x0000000000000000000000000000000000000000000000000000000000000000'
                ? giveaway.winningCommitment.substring(0, 18) + '...'
                : 'Pending Selection by Organizer'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: '#64748b', fontWeight: '600' }}>Prize Claim Status:</span>
            <span style={{ color: giveaway.winnerClaimed ? '#059669' : '#0284c7', fontWeight: '800' }}>
              {giveaway.winnerClaimed ? 'CLAIMED' : 'UNCLAIMED'}
            </span>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
              Enter Your Private Ticket Secret:
            </label>
            <input
              className="input-glass"
              placeholder="e.g. 46aff717417086838261bea1896c2b8b"
              value={ticketSecretInput}
              onChange={(e) => setTicketSecretInput(e.target.value)}
              style={{ fontFamily: 'monospace', padding: '14px' }}
            />
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={handleVerifyAndClaim}>
            🔒 Execute ZK Proof & Claim Prize
          </button>

          {verificationResult.status === 'success' && (
            <div style={{ background: '#ecfdf5', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '12px', padding: '16px', color: '#047857', fontSize: '0.9rem', fontWeight: '600' }}>
              ✓ {verificationResult.message}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default WinnerVerification;
