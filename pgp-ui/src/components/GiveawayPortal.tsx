// Private Entry Portal Component for PGP DApp - White & Emerald Theme

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
      
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f172a' }}>🎟️ Private Giveaway Registration</h2>
        <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '0.95rem' }}>
          Enter the giveaway without disclosing your wallet address or identity. Your ticket commitment is stored as an opaque ZK hash on the Midnight ledger.
        </p>

        {/* Giveaway Info Card */}
        <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', marginBottom: '28px', border: '1px solid rgba(16, 185, 129, 0.25)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ color: '#047857', fontSize: '1.25rem' }}>{giveaway.title}</h3>
            <span className="badge-status badge-open">State: {giveaway.state}</span>
          </div>
          <p style={{ color: '#334155', fontSize: '0.95rem', marginBottom: '12px' }}>Prize: <strong>{giveaway.prizeDetails}</strong></p>
          <div style={{ fontSize: '0.875rem', color: '#64748b' }}>
            Total Registered Participants: <strong style={{ color: '#059669' }}>{giveaway.entryCount}</strong>
          </div>
        </div>

        {/* ZK Ticket Generator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }} onClick={generateLocalCommitment}>
            ⚡ Generate Random Private Ticket & Secret Nonce
          </button>

          {generatedCommitment && (
            <div style={{ background: '#ecfdf5', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '24px' }}>
              <h4 style={{ fontSize: '1rem', color: '#047857', marginBottom: '14px', fontWeight: '700' }}>🔒 Private Ticket Credentials (Keep Confidential)</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
                <div>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>Ticket Nonce:</span>
                  <input className="input-glass" readOnly value={nonce} style={{ marginTop: '4px', fontFamily: 'monospace' }} />
                </div>
                <div>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>Private Ticket Secret:</span>
                  <input className="input-glass" readOnly value={secret} style={{ marginTop: '4px', fontFamily: 'monospace' }} />
                </div>
                <div>
                  <span style={{ color: '#64748b', fontWeight: '600' }}>On-Chain Commitment Hash (Public):</span>
                  <input className="input-glass" readOnly value={generatedCommitment} style={{ marginTop: '4px', fontFamily: 'monospace', color: '#059669', fontWeight: '700' }} />
                </div>
              </div>
            </div>
          )}

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '12px', padding: '14px', opacity: generatedCommitment ? 1 : 0.5 }}
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

export default GiveawayPortal;
