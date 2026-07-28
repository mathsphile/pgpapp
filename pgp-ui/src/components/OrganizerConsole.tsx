// Organizer Console - Real Circuit Calls via PGPAPI

import React, { useState } from 'react';
import { GiveawayItem } from '../types.js';

interface OrganizerConsoleProps {
  giveaway: GiveawayItem;
  createGiveawayAction: (title: string, prizeDetails: string, onSuccess: () => void) => void;
  closeAndSelectWinnerAction: (winningCommitment: string, onSuccess: () => void) => void;
  cancelGiveawayAction: (onSuccess: () => void) => void;
  contractAddress: string;
  indexerConnected: boolean;
  setGiveaway: React.Dispatch<React.SetStateAction<GiveawayItem>>;
}

export const OrganizerConsole: React.FC<OrganizerConsoleProps> = ({
  giveaway,
  createGiveawayAction,
  closeAndSelectWinnerAction,
  cancelGiveawayAction,
  contractAddress,
  indexerConnected,
  setGiveaway,
}) => {
  const [newTitle, setNewTitle] = useState<string>('');
  const [newPrize, setNewPrize] = useState<string>('');
  const [winningCommitmentInput, setWinningCommitmentInput] = useState<string>('');

  const handleCreateGiveaway = () => {
    if (!newTitle || !newPrize) {
      alert('Please enter title and prize details.');
      return;
    }
    if (!contractAddress) {
      alert('No contract connected. Enter a deployed contract address in Settings first.');
      return;
    }
    createGiveawayAction(newTitle, newPrize, () => {
      setGiveaway((prev) => ({
        ...prev,
        title: newTitle,
        prizeDetails: newPrize,
        state: 'REGISTRATION_OPEN',
        entryCount: 0,
      }));
    });
  };

  const handleCloseAndSelectWinner = () => {
    if (!winningCommitmentInput) {
      alert('Please provide winning commitment hex.');
      return;
    }
    closeAndSelectWinnerAction(winningCommitmentInput, () => {
      setGiveaway((prev) => ({ ...prev, state: 'DRAW_PENDING', winningCommitment: winningCommitmentInput }));
    });
  };

  const handleCancelGiveaway = () => {
    cancelGiveawayAction(() => {
      setGiveaway((prev) => ({ ...prev, state: 'CANCELLED' }));
    });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {!indexerConnected && (
        <div className="glass-panel" style={{ padding: '24px', background: '#fef3c7', border: '1px solid #f59e0b' }}>
          <p style={{ color: '#78350f', fontSize: '0.9rem', fontWeight: '600' }}>
            ⚠️ No contract connected. Provide a deployed PGP contract address on the Settings tab first.
          </p>
        </div>
      )}

      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#0f172a' }}>⚡ Create New Private Giveaway</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Giveaway Title:
            </label>
            <input
              className="input-glass"
              placeholder="e.g. Midnight Developer Ecosystem Drop"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              style={{ padding: '14px' }}
            />
          </div>

          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Prize Description & Terms:
            </label>
            <input
              className="input-glass"
              placeholder="e.g. 5,000 tNIGHT + Midnight Developer Pass"
              value={newPrize}
              onChange={(e) => setNewPrize(e.target.value)}
              style={{ padding: '14px' }}
            />
          </div>

          <button
            className="btn-primary"
            onClick={handleCreateGiveaway}
            style={{ justifyContent: 'center', padding: '14px', opacity: indexerConnected ? 1 : 0.5 }}
            disabled={!indexerConnected}
          >
            ➕ Deploy Giveaway Configuration to Ledger
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#0f172a' }}>
          🎲 Close Entries & Select Winning Commitment
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Winning Commitment Hash (64-char Hex):
            </label>
            <input
              className="input-glass"
              placeholder="e.g. 46aff717417086838261bea1896c2b8b"
              value={winningCommitmentInput}
              onChange={(e) => setWinningCommitmentInput(e.target.value)}
              style={{ fontFamily: 'monospace', padding: '14px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              className="btn-primary"
              onClick={handleCloseAndSelectWinner}
              style={{ flex: 1, justifyContent: 'center', padding: '14px', opacity: indexerConnected ? 1 : 0.5 }}
              disabled={!indexerConnected}
            >
              🎯 Post Winning Commitment & Close Entries
            </button>
            <button
              className="btn-secondary"
              onClick={handleCancelGiveaway}
              style={{
                borderColor: '#dc2626',
                color: '#dc2626',
                background: '#fef2f2',
                padding: '14px',
                opacity: indexerConnected ? 1 : 0.5,
              }}
              disabled={!indexerConnected}
            >
              Cancel Giveaway
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerConsole;
