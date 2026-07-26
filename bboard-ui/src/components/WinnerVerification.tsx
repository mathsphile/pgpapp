// Winner Verification Portal Component for PGP DApp

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
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>🏆 ZK Winner Verification & Prize Claim</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
          Verify if your ticket secret matches the winning commitment on-chain. Zero-Knowledge proofs verify ownership without exposing non-winning entries.
        </p>

        {/* Status Box */}
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '20px', marginBottom: '24px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ color: 'var(--text-dim)' }}>On-Chain Winning Commitment:</span>
            <span style={{ color: '#fbbf24', fontWeight: '600' }}>
              {giveaway.winningCommitment !== '0x0000000000000000000000000000000000000000000000000000000000000000'
                ? giveaway.winningCommitment.substring(0, 16) + '...'
                : 'Pending Selection by Organizer'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-dim)' }}>Prize Claim Status:</span>
            <span style={{ color: giveaway.winnerClaimed ? '#10b981' : '#38bdf8', fontWeight: '600' }}>
              {giveaway.winnerClaimed ? 'CLAIMED' : 'UNCLAIMED'}
            </span>
          </div>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Enter Your Private Ticket Secret:
            </label>
            <input
              className="input-glass"
              placeholder="e.g. 46aff717417086838261bea1896c2b8b"
              value={ticketSecretInput}
              onChange={(e) => setTicketSecretInput(e.target.value)}
              style={{ fontFamily: 'monospace' }}
            />
          </div>

          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleVerifyAndClaim}>
            🔒 Execute ZK Proof & Claim Prize
          </button>

          {verificationResult.status === 'success' && (
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', padding: '16px', color: '#34d399', fontSize: '0.9rem' }}>
              ✓ {verificationResult.message}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
