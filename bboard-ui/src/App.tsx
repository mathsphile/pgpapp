// Private Giveaway Platform (PGP) Main App Component

import React from 'react';
import { Navbar } from './components/Navbar.js';
import { Dashboard } from './components/Dashboard.js';
import { GiveawayPortal } from './components/GiveawayPortal.js';
import { WinnerVerification } from './components/WinnerVerification.js';
import { OrganizerConsole } from './components/OrganizerConsole.js';
import { AnalyticsView } from './components/AnalyticsView.js';
import { SettingsView } from './components/SettingsView.js';
import { TransactionModal } from './components/TransactionModal.js';
import { usePGPStore } from './store/useStore.js';
import './index.css';

export const App: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    contractAddress,
    setContractAddress,
    giveaway,
    setGiveaway,
    activities,
    wallet,
    txModal,
    setTxModal,
    triggerTransactionFlow,
  } = usePGPStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} wallet={wallet} />

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '40px 24px' }}>
        {activeTab === 'dashboard' && (
          <Dashboard giveaway={giveaway} activities={activities} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'giveaways' && (
          <GiveawayPortal giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
        )}

        {activeTab === 'verify' && (
          <WinnerVerification giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
        )}

        {activeTab === 'organizer' && (
          <OrganizerConsole giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView giveaway={giveaway} />
        )}

        {activeTab === 'settings' && (
          <SettingsView contractAddress={contractAddress} setContractAddress={setContractAddress} wallet={wallet} />
        )}
      </main>

      <TransactionModal
        isOpen={txModal.isOpen}
        status={txModal.status}
        action={txModal.action}
        message={txModal.message}
        txHash={txModal.txHash}
        onClose={() => setTxModal((prev) => ({ ...prev, isOpen: false }))}
      />

      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
        Midnight Network Private Giveaway Platform (PGP) • Zero-Knowledge Smart Contract System
      </footer>
    </div>
  );
};

export default App;
