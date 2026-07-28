// HomePage Component for PGP DApp - App Flow & Wallet Gate

import React from 'react';
import { AppTab, GiveawayItem, WalletState } from '../types.js';

interface HomePageProps {
  giveaway: GiveawayItem;
  wallet: WalletState;
  setActiveTab: (tab: AppTab) => void;
  onOpenWalletModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ giveaway, wallet, setActiveTab, onOpenWalletModal }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {/* Hero Section */}
      <div
        className="glass-panel"
        style={{
          padding: '48px 40px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.9))',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(16, 185, 129, 0.25)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: '-50px',
            top: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: '820px', position: 'relative', zIndex: 10 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: '#ecfdf5',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '20px',
              marginBottom: '20px',
            }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span
              style={{
                fontSize: '0.825rem',
                fontWeight: '700',
                color: '#047857',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Midnight Network Preprod Protocol
            </span>
          </div>

          <h1
            style={{
              fontSize: '3.1rem',
              lineHeight: '1.15',
              marginBottom: '18px',
              color: '#0f172a',
              fontWeight: '800',
            }}
          >
            Private Giveaways Built on <span className="gradient-text">Zero-Knowledge</span> Proofs
          </h1>

          <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '32px' }}>
            Enter giveaways, register commitments, and prove winning tickets on Midnight Network without ever exposing
            your wallet address, real-world identity, or losing entries.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
            {wallet.isConnected ? (
              <>
                <button
                  className="btn-primary"
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                  onClick={() => setActiveTab('giveaways')}
                >
                  <span>🎟️</span> Enter Active Giveaway
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '14px 28px', fontSize: '1rem' }}
                  onClick={() => setActiveTab('verify')}
                >
                  <span>🏆</span> Verify Winning Ticket
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '14px 24px', fontSize: '0.95rem' }}
                  onClick={() => setActiveTab('organizer')}
                >
                  <span>⚡</span> Organizer Console
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn-primary"
                  style={{ padding: '14px 32px', fontSize: '1.05rem' }}
                  onClick={onOpenWalletModal}
                >
                  <span className="pulse-glow">⚡</span> Connect Midnight Wallet to Start
                </button>
                <button
                  className="btn-secondary"
                  style={{ padding: '14px 24px', fontSize: '0.95rem' }}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <span>📊</span> Explore Public Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Wallet Status Banner if Disconnected */}
      {!wallet.isConnected && (
        <div
          className="glass-panel"
          style={{
            padding: '24px 32px',
            background: '#ffffff',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                color: '#10b981',
              }}
            >
              🔑
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: '#0f172a' }}>Wallet Connection Required for Access</h4>
              <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                Connect a Midnight wallet (Lace, 1AM, or Seed Import) to unlock giveaway registration and ZK proof
                verification.
              </p>
            </div>
          </div>
          <button className="btn-primary" onClick={onOpenWalletModal}>
            Connect Wallet Now
          </button>
        </div>
      )}

      {/* Complete Step-by-Step Application Flow */}
      <div>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 32px auto' }}>
          <span className="badge-status badge-open" style={{ marginBottom: '8px' }}>
            ● Zero-Knowledge Execution
          </span>
          <h2 style={{ fontSize: '2.2rem', color: '#0f172a', marginBottom: '12px' }}>How the PGP Protocol Works</h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' }}>
            From organizer deployment to zero-knowledge prize verification — understand the end-to-end cryptographic
            flow.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {/* Step 1 */}
          <div
            className="glass-panel"
            style={{ padding: '32px', background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                1
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Organizer Phase
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Create & Escrow Giveaway</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55', marginBottom: '16px' }}>
              The organizer calls{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                createGiveaway(title, prizeDetails)
              </code>
              . The contract binds{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                organizerPk
              </code>{' '}
              via ZK witness and locks prize escrow.
            </p>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#047857',
                background: '#ecfdf5',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              On-Chain State: REGISTRATION_OPEN
            </div>
          </div>

          {/* Step 2 */}
          <div
            className="glass-panel"
            style={{ padding: '32px', background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                2
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Participant Phase
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>
              Generate Opaque ZK Commitment
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55', marginBottom: '16px' }}>
              Participant generates local random ticket secret & nonce. Client computes{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                persistentHash([secret, sk, nonce])
              </code>{' '}
              and appends only the hash to the accumulator tree.
            </p>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#047857',
                background: '#ecfdf5',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              Privacy: Identity & Address 100% Hidden
            </div>
          </div>

          {/* Step 3 */}
          <div
            className="glass-panel"
            style={{ padding: '32px', background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                3
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Drawing Phase
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Select Winning Commitment</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55', marginBottom: '16px' }}>
              The organizer closes registration by publishing the drawn winning commitment hash via{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                closeAndSelectWinner(winningCommitment)
              </code>
              .
            </p>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#047857',
                background: '#ecfdf5',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              On-Chain State: DRAW_PENDING
            </div>
          </div>

          {/* Step 4 */}
          <div
            className="glass-panel"
            style={{ padding: '32px', background: '#ffffff', border: '1px solid rgba(16, 185, 129, 0.2)' }}
          >
            <div
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}
            >
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#10b981',
                  color: '#fff',
                  fontWeight: '800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                4
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase' }}>
                Verification & Settlement
              </span>
            </div>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '10px' }}>Prove & Claim Prize</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55', marginBottom: '16px' }}>
              Winning participant inputs local ticket secret. Local zk-SNARK prover generates proof matching{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                winningCommitment
              </code>
              . Ledger sets{' '}
              <code style={{ background: '#f0fdf4', color: '#047857', padding: '2px 6px', borderRadius: '4px' }}>
                winnerClaimed = true
              </code>
              .
            </p>
            <div
              style={{
                fontSize: '0.8rem',
                color: '#047857',
                background: '#ecfdf5',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
              }}
            >
              On-Chain State: COMPLETED
            </div>
          </div>
        </div>
      </div>

      {/* On-Chain Public Ledger vs Off-Chain Private Witness Matrix */}
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#0f172a', marginBottom: '8px' }}>
          🔒 Data Privacy & Ledger Disclosure Matrix
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
          Understanding what data is written to the Midnight public ledger versus what stays on your device as private
          witness data.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div
            style={{
              background: '#f0fdf4',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                color: '#047857',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🌐</span> Written to Public Ledger
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.9rem',
                color: '#334155',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Entry commitment hash (
                <code style={{ fontSize: '0.8rem' }}>persistentHash</code>)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Cumulative{' '}
                <code style={{ fontSize: '0.8rem' }}>entryAccumulator</code> state
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Published{' '}
                <code style={{ fontSize: '0.8rem' }}>winningCommitment</code>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> <code style={{ fontSize: '0.8rem' }}>winnerClaimed</code>{' '}
                boolean status
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Organizer public key (
                <code style={{ fontSize: '0.8rem' }}>organizerPk</code>)
              </li>
            </ul>
          </div>

          <div
            style={{
              background: '#ecfdf5',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid rgba(16, 185, 129, 0.25)',
            }}
          >
            <h4
              style={{
                fontSize: '1.1rem',
                color: '#047857',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🛡️</span> Never Leaves Participant Device
            </h4>
            <ul
              style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                fontSize: '0.9rem',
                color: '#334155',
              }}
            >
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Participant secret key (
                <code style={{ fontSize: '0.8rem' }}>localSecretKey</code>)
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Random ticket secret & participant nonce
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Unselected ticket secrets & losing entries
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Merkle accumulator paths & private witness
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981' }}>✓</span> Off-chain LevelDB key store
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
