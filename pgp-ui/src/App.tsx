// Private Giveaway Platform (PGP) Main App Component - White & Emerald Theme with Wallet Connection Toggle

import React from 'react';
import { Navbar } from './components/Navbar.js';
import { HomePage } from './components/HomePage.js';
import { Dashboard } from './components/Dashboard.js';
import { GiveawayPortal } from './components/GiveawayPortal.js';
import { WinnerVerification } from './components/WinnerVerification.js';
import { OrganizerConsole } from './components/OrganizerConsole.js';
import { AnalyticsView } from './components/AnalyticsView.js';
import { SettingsView } from './components/SettingsView.js';
import { TransactionModal } from './components/TransactionModal.js';
import { WalletModal } from './components/WalletModal.js';
import { WalletGate } from './components/WalletGate.js';
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
    isWalletModalOpen,
    setIsWalletModalOpen,
    connectWallet,
    disconnectWallet,
    toggleWalletConnection,
    txModal,
    setTxModal,
    triggerTransactionFlow,
  } = usePGPStore();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-main)' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wallet={wallet}
        toggleWalletConnection={toggleWalletConnection}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
      />

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '40px 24px' }}>
        {activeTab === 'home' && (
          <HomePage
            giveaway={giveaway}
            wallet={wallet}
            setActiveTab={setActiveTab}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard giveaway={giveaway} activities={activities} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'giveaways' && (
          <WalletGate
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            title="Connect Wallet to Enter Giveaway"
            description="Participating in private giveaways requires connecting your Midnight Wallet to generate local ZK ticket commitments."
          >
            <GiveawayPortal giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
          </WalletGate>
        )}

        {activeTab === 'verify' && (
          <WalletGate
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            title="Connect Wallet to Verify & Claim Prize"
            description="Proving ticket ownership and claiming giveaway prizes requires connecting your Midnight Wallet to generate local zk-SNARK proofs."
          >
            <WinnerVerification giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
          </WalletGate>
        )}

        {activeTab === 'organizer' && (
          <WalletGate
            wallet={wallet}
            onOpenWalletModal={() => setIsWalletModalOpen(true)}
            title="Connect Wallet for Organizer Actions"
            description="Creating giveaways, drawing winners, or cancelling registration requires connecting your Midnight Wallet with organizer permissions."
          >
            <OrganizerConsole giveaway={giveaway} triggerTransactionFlow={triggerTransactionFlow} setGiveaway={setGiveaway} />
          </WalletGate>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView giveaway={giveaway} />
        )}

        {activeTab === 'settings' && (
          <SettingsView contractAddress={contractAddress} setContractAddress={setContractAddress} wallet={wallet} />
        )}
      </main>

      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        wallet={wallet}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />

      <TransactionModal
        isOpen={txModal.isOpen}
        status={txModal.status}
        action={txModal.action}
        message={txModal.message}
        txHash={txModal.txHash}
        onClose={() => setTxModal((prev) => ({ ...prev, isOpen: false }))}
      />

      <footer style={{ borderTop: '1px solid var(--border-glass)', padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '0.85rem', background: '#ffffff' }}>
        Midnight Network Private Giveaway Platform (PGP) • Zero-Knowledge Smart Contract System
      </footer>
    </div>
  );
};

export default App;
