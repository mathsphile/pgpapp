// Settings & Configuration View for PGP DApp - White & Emerald Theme

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
      <div className="glass-panel" style={{ padding: '36px', background: '#ffffff' }}>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '8px', color: '#0f172a' }}>
          ⚙️ DApp Configuration & Network Settings
        </h2>
        <p style={{ color: '#64748b', marginBottom: '24px' }}>
          Configure contract endpoints, Proof Server connections, and Midnight RPC nodes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Deployed Contract Address:
            </label>
            <input
              className="input-glass"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              style={{ fontFamily: 'monospace', color: '#059669', fontWeight: '700', padding: '14px' }}
            />
            <span style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '6px', display: 'block' }}>
              Canonical deployment ID on Midnight Preprod Remote testnet.
            </span>
          </div>

          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Midnight Proof Server URL:
            </label>
            <input
              className="input-glass"
              readOnly
              value="http://localhost:6300"
              style={{ fontFamily: 'monospace', padding: '14px' }}
            />
          </div>

          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Midnight Preprod RPC Node Endpoint:
            </label>
            <input
              className="input-glass"
              readOnly
              value="https://rpc.preprod.midnight.network"
              style={{ fontFamily: 'monospace', padding: '14px' }}
            />
          </div>

          <div>
            <label
              style={{ fontSize: '0.9rem', color: '#334155', fontWeight: '600', marginBottom: '6px', display: 'block' }}
            >
              Preprod Indexer GraphQL Endpoint:
            </label>
            <input
              className="input-glass"
              readOnly
              value="https://indexer.preprod.midnight.network/api/v4/graphql"
              style={{ fontFamily: 'monospace', padding: '14px' }}
            />
          </div>

          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              borderRadius: '14px',
              padding: '20px',
            }}
          >
            <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: '#047857', fontWeight: '700' }}>
              Connected Wallet Status
            </h4>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem', color: '#475569' }}
            >
              <div>
                Network: <strong style={{ color: '#0f172a' }}>{wallet.network}</strong>
              </div>
              <div>
                Address: <strong style={{ color: '#059669', fontFamily: 'monospace' }}>{wallet.address}</strong>
              </div>
              <div>
                Balance: <strong style={{ color: '#047857' }}>{wallet.balance}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
