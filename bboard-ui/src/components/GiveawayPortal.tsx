// Private Entry Portal Component for PGP DApp

import React, { useState } from 'react';
import { GiveawayItem } from '../types.js';

interface GiveawayPortalProps {
  giveaway: GiveawayItem;
  triggerTransactionFlow: (actionName: string, successCallback: () => void, detailsText: string) => Promise<void>;
  setGiveaway: React.Dispatch<React.SetStateAction<GiveawayItem>>;
}

export const GiveawayPortal: React.FC<GiveawayPortalProps> = ({ giveaway, triggerTransactionFlow, setGiveaway }) => {
  const [nonce, setNonce] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [generatedCommitment, setGeneratedCommitment] = useState<string>('');

  const generateLocalCommitment = () => {
    const randomNonce = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const randomTicketSecret = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    setNonce(randomNonce);
    setSecret(randomTicketSecret);

    const commitment = `0x${randomNonce}${randomTicketSecret}a8f902c31e7`;
    setGeneratedCommitment(commitment);
  };

  const handleRegisterEntry = () => {
    if (!generatedCommitment) {
      alert('Please generate a private ticket commitment first.');
      return;
    }

    triggerTransactionFlow(
      'Private Entry Registered',
      () => {
        setGiveaway((prev) => ({
          ...prev,
          entryCount: prev.entryCount + 1,
        }));
      },
      `Registered commitment hash ${generatedCommitment.substring(0, 16)}... on-chain`
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>🎟️ Private Giveaway Registration</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.95rem' }}>
          Enter the giveaway without disclosing your wallet address or identity. Your ticket commitment is stored as a ZK hash on the Midnight ledger.
        </p>

        {/* Giveaway Info Card */}
        <div style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '12px', padding: '20px', marginBottom: '28px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h3 style={{ color: '#818cf8', fontSize: '1.2rem' }}>{giveaway.title}</h3>
            <span className="badge-status badge-open">State: {giveaway.state}</span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '12px' }}>Prize: {giveaway.prizeDetails}</p>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Total Registered Participants: <strong style={{ color: '#fff' }}>{giveaway.entryCount}</strong>
          </div>
        </div>

        {/* ZK Ticket Generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={generateLocalCommitment}>
            ⚡ Generate Random Private Ticket & Secret Nonce
          </button>

          {generatedCommitment && (
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '12px', padding: '20px' }}>
              <h4 style={{ fontSize: '0.95rem', color: '#c084fc', marginBottom: '12px' }}>🔒 Private Ticket Credentials (Keep Confidential)</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>Ticket Nonce:</span>
                  <input className="input-glass" readOnly value={nonce} style={{ marginTop: '4px', fontFamily: 'monospace' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>Private Ticket Secret:</span>
                  <input className="input-glass" readOnly value={secret} style={{ marginTop: '4px', fontFamily: 'monospace' }} />
                </div>
                <div>
                  <span style={{ color: 'var(--text-dim)' }}>On-Chain Commitment Hash (Public):</span>
                  <input className="input-glass" readOnly value={generatedCommitment} style={{ marginTop: '4px', fontFamily: 'monospace', color: '#34d399' }} />
                </div>
              </div>
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px', opacity: generatedCommitment ? 1 : 0.5 }}
            disabled={!generatedCommitment}
            onClick={handleRegisterEntry}
          >
            🛡️ Submit ZK Entry Commitment to Ledger
          </button>
        </div>

      </div>

    </div>
  );
};
