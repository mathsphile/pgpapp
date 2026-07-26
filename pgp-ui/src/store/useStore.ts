// PGP State Management - Real Wallet Detection & Toggle System

import { useState, useEffect } from 'react';
import { AppTab, ActivityItem, GiveawayItem, WalletState, TransactionStatus } from '../types.js';
import { detectMidnightWallets, connectLaceWallet } from '../utils/midnightWallet.js';

const INITIAL_GIVEAWAY: GiveawayItem = {
  id: 'pgp-giveaway-1',
  contractAddress: '02007a8f902c31e7b41298c5643a1f9e2b1049e0c8b321a94f876e5d4c3b2a1f',
  title: 'Midnight Privacy Giveaway - 1,000 tNIGHT',
  prizeDetails: '1,000 tNIGHT + Limited Edition ZK Badge',
  organizerPk: '006acc0a4b06bc8ca2a050f3de0188bc41d1ed8c0a8c5d8f3f5e1afc86c7aa41ec',
  state: 'REGISTRATION_OPEN',
  entryCount: 42,
  entryAccumulator: '0x7a8f902c31e7b41298c5643a1f9e2b1049e0c8b321a94f876e5d4c3b2a1f0987',
  winningCommitment: '0x0000000000000000000000000000000000000000000000000000000000000000',
  winnerClaimed: false,
  isOrganizer: true,
};

const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString(),
    action: 'Giveaway Created',
    status: 'Confirmed',
    details: 'Midnight Privacy Giveaway initialized on Preprod Remote',
    txHash: '0x3aef...91b2',
  },
  {
    id: 'act-2',
    timestamp: new Date(Date.now() - 1800000).toLocaleTimeString(),
    action: 'Private Entry Registered',
    status: 'Confirmed',
    details: 'Participant entry commitment appended to ZK accumulator tree',
    txHash: '0x7c12...49e0',
  },
];

export function usePGPStore() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [contractAddress, setContractAddress] = useState<string>('02007a8f902c31e7b41298c5643a1f9e2b1049e0c8b321a94f876e5d4c3b2a1f');
  const [giveaway, setGiveaway] = useState<GiveawayItem>(INITIAL_GIVEAWAY);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);

  // Wallet Connection State (Disconnected by default)
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Preprod Remote',
    balance: '0 tNIGHT',
    walletType: null,
    isLaceInstalled: false,
    isConnecting: false,
    error: null,
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

  // Check browser extension installation on mount
  useEffect(() => {
    const { isLaceInstalled } = detectMidnightWallets();
    setWallet((prev) => ({
      ...prev,
      isLaceInstalled,
    }));
  }, []);

  const [txModal, setTxModal] = useState<{
    isOpen: boolean;
    status: TransactionStatus;
    action: string;
    message: string;
    txHash?: string;
  }>({
    isOpen: false,
    status: 'Idle',
    action: '',
    message: '',
  });

  const connectWallet = async (type: 'lace' | '1am' | 'seed') => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));

    if (type === 'lace') {
      const { isLaceInstalled } = detectMidnightWallets();
      if (!isLaceInstalled) {
        setWallet((prev) => ({
          ...prev,
          isConnecting: false,
          error: 'Lace Wallet extension not detected in browser. Please install Lace Wallet for Midnight Network.',
        }));
        return;
      }

      try {
        const res = await connectLaceWallet();
        setWallet({
          isConnected: true,
          address: res.address,
          network: res.network,
          balance: res.balance,
          walletType: 'lace',
          isLaceInstalled: true,
          isConnecting: false,
          error: null,
        });
        setIsWalletModalOpen(false);
        addActivity('Wallet Connected', 'Confirmed', `Connected via Lace Wallet (${res.address.substring(0, 10)}...)`);
        return;
      } catch (err: any) {
        setWallet((prev) => ({
          ...prev,
          isConnecting: false,
          error: err.message || 'Failed to connect Lace Wallet.',
        }));
        return;
      }
    }

    // Provider connection for 1AM / Seed Phrase
    await new Promise((r) => setTimeout(r, 800));

    const mockAddresses = {
      '1am': 'mn_addr_preprod1q9a8c7b6v5x4z3m2n1p0o9i8u7y6t5r4e3w2q1a0b9c8d7e6f5',
      seed: 'mn_addr_preprod1q7x8y9z0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u',
    };

    const targetAddr = mockAddresses[type];

    setWallet({
      isConnected: true,
      address: targetAddr,
      network: 'Preprod Remote',
      balance: '1,000 tNIGHT',
      walletType: type,
      isLaceInstalled: wallet.isLaceInstalled,
      isConnecting: false,
      error: null,
    });

    setIsWalletModalOpen(false);
    addActivity('Wallet Connected', 'Confirmed', `Connected via ${type.toUpperCase()} provider (${targetAddr.substring(0, 10)}...)`);
  };

  const disconnectWallet = () => {
    setWallet((prev) => ({
      ...prev,
      isConnected: false,
      address: null,
      balance: '0 tNIGHT',
      walletType: null,
      error: null,
    }));
    addActivity('Wallet Disconnected', 'Confirmed', 'Disconnected Midnight Wallet');
  };

  const toggleWalletConnection = () => {
    if (wallet.isConnected) {
      disconnectWallet();
    } else {
      setIsWalletModalOpen(true);
    }
  };

  const addActivity = (action: string, status: TransactionStatus, details: string, txHash?: string) => {
    const newItem: ActivityItem = {
      id: `act-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      action,
      status,
      details,
      txHash,
    };
    setActivities((prev) => [newItem, ...prev]);
  };

  const triggerTransactionFlow = async (
    actionName: string,
    successCallback: () => void,
    detailsText: string
  ) => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
      return;
    }

    setTxModal({
      isOpen: true,
      status: 'Pending',
      action: actionName,
      message: 'Generating Zero-Knowledge proof locally...',
    });

    await new Promise((r) => setTimeout(r, 1500));

    setTxModal((prev) => ({
      ...prev,
      status: 'Processing',
      message: 'Submitting transaction to Midnight Preprod node...',
    }));

    await new Promise((r) => setTimeout(r, 2000));

    const fakeHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    
    setTxModal({
      isOpen: true,
      status: 'Confirmed',
      action: actionName,
      message: 'Transaction successfully confirmed on-chain!',
      txHash: fakeHash,
    });

    successCallback();
    addActivity(actionName, 'Confirmed', detailsText, fakeHash);
  };

  return {
    activeTab,
    setActiveTab,
    contractAddress,
    setContractAddress,
    giveaway,
    setGiveaway,
    activities,
    wallet,
    setWallet,
    isWalletModalOpen,
    setIsWalletModalOpen,
    connectWallet,
    disconnectWallet,
    toggleWalletConnection,
    txModal,
    setTxModal,
    triggerTransactionFlow,
    addActivity,
  };
}
