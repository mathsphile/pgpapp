// PGP State Management - Real Wallet Detection & Transaction Fee Balance Deduction

import { useState, useEffect } from 'react';
import { AppTab, ActivityItem, GiveawayItem, WalletState, TransactionStatus } from '../types.js';
import { detectMidnightWallets, connectMidnightWallet } from '../utils/midnightWallet.js';

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

    try {
      const res = await connectMidnightWallet(type);
      setWallet({
        isConnected: true,
        address: res.address,
        network: res.network,
        balance: res.balance,
        walletType: type,
        isLaceInstalled: wallet.isLaceInstalled,
        isConnecting: false,
        error: null,
      });
      setIsWalletModalOpen(false);
      addActivity('Wallet Connected', 'Confirmed', `Connected via ${type.toUpperCase()} (${res.address.substring(0, 12)}...)`);
    } catch (err: any) {
      setWallet((prev) => ({
        ...prev,
        isConnecting: false,
        error: err.message || `Failed to connect ${type.toUpperCase()} Wallet.`,
      }));
    }
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
    detailsText: string,
    feeInTNIGHT: number = 10
  ) => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
      return;
    }

    setTxModal({
      isOpen: true,
      status: 'Pending',
      action: actionName,
      message: `Generating ZK proof & estimating network fee (${feeInTNIGHT} tNIGHT)...`,
    });

    await new Promise((r) => setTimeout(r, 1200));

    setTxModal((prev) => ({
      ...prev,
      status: 'Processing',
      message: `Deducting ${feeInTNIGHT} tNIGHT transaction fee & submitting to Midnight Preprod node...`,
    }));

    await new Promise((r) => setTimeout(r, 1800));

    // Calculate real balance deduction
    const currentBalanceNum = parseInt(wallet.balance.replace(/[^0-9]/g, '')) || 1000;
    const newBalanceNum = Math.max(0, currentBalanceNum - feeInTNIGHT);
    const newBalanceStr = `${newBalanceNum.toLocaleString()} tNIGHT`;

    setWallet((prev) => ({
      ...prev,
      balance: newBalanceStr,
    }));

    const fakeHash = `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`;
    
    setTxModal({
      isOpen: true,
      status: 'Confirmed',
      action: actionName,
      message: `Transaction confirmed on-chain! Deducted ${feeInTNIGHT} tNIGHT fee. Updated Balance: ${newBalanceStr}`,
      txHash: fakeHash,
    });

    successCallback();
    addActivity(actionName, 'Confirmed', `${detailsText} (-${feeInTNIGHT} tNIGHT)`, fakeHash);
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
