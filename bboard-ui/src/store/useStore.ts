// PGP State Management

import { useState } from 'react';
import { AppTab, ActivityItem, GiveawayItem, WalletState, TransactionStatus } from '../types.js';

const INITIAL_GIVEAWAY: GiveawayItem = {
  id: 'pgp-giveaway-1',
  contractAddress: '<YOUR_DEPLOYED_CONTRACT_ADDRESS>',
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
    details: 'Midnight Privacy Giveaway initialized on Preprod',
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
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [contractAddress, setContractAddress] = useState<string>('<YOUR_DEPLOYED_CONTRACT_ADDRESS>');
  const [giveaway, setGiveaway] = useState<GiveawayItem>(INITIAL_GIVEAWAY);
  const [activities, setActivities] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: true,
    address: 'mn_addr_preprod1qsrk78vxtc9y2neyfh2d7ns3mxxh4xq68pptldmr3atg2d850eusj4n55v',
    network: 'Preprod Remote',
    balance: '1,000 tNIGHT',
  });

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
    txModal,
    setTxModal,
    triggerTransactionFlow,
    addActivity,
  };
}
