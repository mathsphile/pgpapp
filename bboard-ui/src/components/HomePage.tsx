// HomePage Component for PGP DApp - White & Emerald Theme

import React from 'react';
import { AppTab, GiveawayItem } from '../types.js';

interface HomePageProps {
  giveaway: GiveawayItem;
  setActiveTab: (tab: AppTab) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ giveaway, setActiveTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      
      {/* Hero Section */}
      <div className="glass-panel" style={{
        padding: '48px 40px',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.9))',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid rgba(16, 185, 129, 0.25)',
      }}>
        <div style={{
          position: 'absolute',
          right: '-50px',
          top: '-50px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.18) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: '#ecfdf5', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '20px', marginBottom: '20px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
            <span style={{ fontSize: '0.825rem', fontWeight: '700', color: '#047857', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Midnight Network Preprod Protocol
            </span>
          </div>

          <h1 style={{ fontSize: '3rem', lineHeight: '1.15', marginBottom: '18px', color: '#0f172a', fontWeight: '800' }}>
            Private Giveaways Built on <span className="gradient-text">Zero-Knowledge</span> Proofs
          </h1>

          <p style={{ color: '#475569', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '32px' }}>
            Enter giveaways, register commitments, and prove winning tickets on Midnight Network without ever revealing your wallet address, identity, or losing entries.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button className="btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={() => setActiveTab('giveaways')}>
              <span>🎟️</span> Enter Active Giveaway
            </button>
            <button className="btn-secondary" style={{ padding: '14px 28px', fontSize: '1rem' }} onClick={() => setActiveTab('verify')}>
              <span>🏆</span> Verify Winning Ticket
            </button>
            <button className="btn-secondary" style={{ padding: '14px 24px', fontSize: '0.95rem' }} onClick={() => setActiveTab('organizer')}>
              <span>⚡</span> Organizer Console
            </button>
          </div>
        </div>
      </div>

      {/* Canonical Deployment Highlight */}
      <div className="glass-panel" style={{ padding: '20px 28px', background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
            🌐
          </div>
          <div>
            <p style={{ fontSize: '0.8rem', fontWeight: '700', color: '#059669', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Canonical Smart Contract</p>
            <p style={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>
              02007a8f902c31e7b41298c5643a1f9e2b1049e0c8b321a94f876e5d4c3b2a1f
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Network:</span>
          <span className="badge-status badge-open">Preprod Remote</span>
        </div>
      </div>

      {/* Key Benefits Grid */}
      <div>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '20px', color: '#0f172a' }}>Why Zero-Knowledge Privacy Matters</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          
          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '16px' }}>
              🛡️
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#0f172a' }}>100% On-Chain Privacy</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55' }}>
              Participants submit opaque commitment hashes. On-chain observers learn zero details about participant identities or wallet balances.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '16px' }}>
              ⚡
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#0f172a' }}>Portable ZK Proofs</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55' }}>
              When the winner is drawn, you prove ticket ownership locally on your device without exposing secret keys or unselected tickets.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '16px' }}>
              🔒
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#0f172a' }}>Compact Disclose Discipline</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55' }}>
              Built with Compact v0.23 smart contract language. Disclosed ledger outputs are verified strictly at compile-time to prevent accidental leaks.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#e6f4ea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '16px' }}>
              🌐
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#0f172a' }}>Non-Custodial Architecture</h3>
            <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: '1.55' }}>
              Requires no centralized server or custodial wallet. Verifiers query the Midnight indexer and contract state directly.
            </p>
          </div>

        </div>
      </div>

      {/* How It Works Step-by-Step */}
      <div className="glass-panel" style={{ padding: '36px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '24px', color: '#0f172a', textAlign: 'center' }}>How PGP Works in 3 Simple Steps</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
              <h3 style={{ fontSize: '1.1rem', color: '#047857' }}>Organizer Creates Giveaway</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
              The organizer initializes title, prize details, and binds their public key. Escrow funds are locked on Midnight ledger.
            </p>
          </div>

          <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
              <h3 style={{ fontSize: '1.1rem', color: '#047857' }}>Participants Enter Privately</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
              Participants generate a local secret key & ticket nonce. Only the opaque commitment hash is appended to the ZK accumulator.
            </p>
          </div>

          <div style={{ background: '#f0fdf4', borderRadius: '16px', padding: '24px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <span style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#10b981', color: '#fff', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
              <h3 style={{ fontSize: '1.1rem', color: '#047857' }}>Winner ZK Verification</h3>
            </div>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5' }}>
              The organizer selects the winning commitment. The ticket holder proves ownership via a local zk-SNARK proof to claim the prize.
            </p>
          </div>

        </div>
      </div>

      {/* Featured Active Giveaway Card */}
      <div className="glass-panel" style={{ padding: '32px', background: 'linear-gradient(135deg, #ffffff, #f0fdf4)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge-status badge-open" style={{ marginBottom: '8px' }}>● Live Giveaway</span>
            <h3 style={{ fontSize: '1.4rem', color: '#0f172a' }}>{giveaway.title}</h3>
          </div>
          <button className="btn-primary" onClick={() => setActiveTab('giveaways')}>
            Join Giveaway Now →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', paddingTop: '16px', borderTop: '1px solid rgba(16, 185, 129, 0.15)' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Prize Pool:</span>
            <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#059669' }}>{giveaway.prizeDetails}</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>On-Chain Entries:</span>
            <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#0f172a' }}>{giveaway.entryCount} Anonymous Entries</p>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Current Status:</span>
            <p style={{ fontWeight: '700', fontSize: '1.1rem', color: '#047857' }}>
              {giveaway.state === 'REGISTRATION_OPEN' ? 'Registration Open' : giveaway.state}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
