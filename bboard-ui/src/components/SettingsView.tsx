// Settings & Configuration View for PGP DApp

import React from 'react';
import { WalletState } from '../types.js';

interface SettingsViewProps {
  contractAddress: string;
  setContractAddress: (addr: string) => void;
  wallet: WalletState;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ contractAddress, setContractAddress, wallet }) => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '32px' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>⚙️ DApp Configuration & Network Settings</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Configure contract endpoints, Proof Server connections, and Midnight RPC nodes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Deployed Contract Address Placeholder:
            </label>
            <input
              className="input-glass"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              style={{ fontFamily: 'monospace', color: '#fbbf24' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
              Replace with your 64-character hex contract address after deployment.
            </span>
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Midnight Proof Server URL:
            </label>
            <input className="input-glass" readOnly value="http://localhost:6300" style={{ fontFamily: 'monospace' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Midnight Preprod RPC Node Endpoint:
            </label>
            <input className="input-glass" readOnly value="https://rpc.preprod.midnight.network" style={{ fontFamily: 'monospace' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '6px', display: 'block' }}>
              Preprod Indexer GraphQL Endpoint:
            </label>
            <input className="input-glass" readOnly value="https://indexer.preprod.midnight.network/api/v4/graphql" style={{ fontFamily: 'monospace' }} />
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '8px', color: '#818cf8' }}>Connected Wallet Status</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <div>Network: <strong style={{ color: '#fff' }}>{wallet.network}</strong></div>
              <div>Address: <strong style={{ color: '#34d399', fontFamily: 'monospace' }}>{wallet.address}</strong></div>
              <div>Balance: <strong style={{ color: '#38bdf8' }}>{wallet.balance}</strong></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
