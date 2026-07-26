// Organizer Console Component for PGP DApp - White & Emerald Theme

import React, { useState } from 'react';
import { GiveawayItem } from '../types.js';

interface OrganizerConsoleProps {
  giveaway: GiveawayItem;
  triggerTransactionFlow: (actionName: string, successCallback: () => void, detailsText: string) => Promise<void>;
  setGiveaway: React.Dispatch<React.SetStateAction<GiveawayItem>>;
}

export const OrganizerConsole: React.FC<OrganizerConsoleProps> = ({ giveaway, triggerTransactionFlow, setGiveaway }) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrize, setNewPrize] = useState<string>('');
  const [winningCommitmentInput, setWinningCommitmentInput] = useState<string>('');

  const handleCreateGiveaway = () => {
    if (!newTitle || !newPrize) {
      alert('Please enter title and prize details.');
      return;
    }

    triggerTransactionFlow(
      'New Giveaway Created',
      () => {
        setGiveaway((prev) => ({
          ...prev,
          title: newTitle,
          prizeDetails: newPrize,
          state: 'REGISTRATION_OPEN',
          entryCount: 0,
        }));
      },
      `Created giveaway "${newTitle}" on Midnight Preprod`
    );
  };

  const handleCloseAndSelectWinner = () => {
    if (!winningCommitmentInput) {
      alert('Please provide winning commitment hex.');
      return;
    }

    triggerTransactionFlow(
      'Giveaway Closed & Winner Selected',
      () => {
        setGiveaway((prev) => ({
          ...prev,
          state: 'DRAW_PENDING',
          winningCommitment: winningCommitmentInput,
        }));
      },
      `Selected winning commitment ${winningCommitmentInput.substring(0, 16)}...`
    );
  };

  const handleCancelGiveaway = () => {
    triggerTransactionFlow(
      'Giveaway Cancelled',
      () => {
        setGiveaway((prev) => ({
          ...prev,
          state: 'CANCELLED',
        }));
      },
      'Giveaway registration cancelled by organizer'
    );
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Create Giveaway Panel */}
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#0f172a' }}>⚡ Create New Private Giveaway</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Giveaway Title:</label>
            <input className="input-glass" placeholder="e.g. Midnight Developer Ecosystem Drop" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} style={{ padding: '14px' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Prize Description & Terms:</label>
            <input className="input-glass" placeholder="e.g. 5,000 tNIGHT + Midnight Developer Pass" value={newPrize} onChange={(e) => setNewPrize(e.target.value)} style={{ padding: '14px' }} />
          </div>

          <button className="btn-primary" onClick={handleCreateGiveaway} style={{ justifyContent: 'center', padding: '14px' }}>
            ➕ Deploy Giveaway Configuration to Ledger
          </button>
        </div>
      </div>

      {/* Draw Winner Panel */}
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#0f172a' }}>🎲 Close Entries & Select Winning Commitment</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}>Winning Commitment Hash (64-char Hex):</label>
            <input className="input-glass" placeholder="e.g. 0x46aff717417086838261bea1896c2b8b" value={winningCommitmentInput} onChange={(e) => setWinningCommitmentInput(e.target.value)} style={{ fontFamily: 'monospace', padding: '14px' }} />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleCloseAndSelectWinner} style={{ flex: 1, justifyContent: 'center', padding: '14px' }}>
              🎯 Post Winning Commitment & Close Entries
            </button>
            <button className="btn-secondary" onClick={handleCancelGiveaway} style={{ borderColor: '#dc2626', color: '#dc2626', background: '#fef2f2', padding: '14px' }}>
              Cancel Giveaway
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default OrganizerConsole;
