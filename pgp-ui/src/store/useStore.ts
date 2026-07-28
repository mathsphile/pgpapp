// PGP State Store - Real Midnight Indexer Connection & Honest Transaction Flow
// No simulated hashes, no fabricated balances, no fake activity entries.

import { useState, useEffect, useRef } from 'react';
import type { Subscription } from 'rxjs';
import { AppTab, ActivityItem, GiveawayItem, WalletState, TransactionStatus } from '../types.js';
import { detectMidnightWallets, connectMidnightWallet } from '../utils/midnightWallet.js';
import {
  connectContract,
  disconnectContract,
  getConnectionState,
  enterGiveaway,
  claimPrize,
  createGiveaway,
  closeAndSelectWinner,
  cancelGiveaway,
} from '../utils/midnightService.js';

const EMPTY_GIVEAWAY: GiveawayItem = {
  id: '',
  contractAddress: '',
  title: 'No contract connected',
  prizeDetails: 'Enter a deployed PGP contract address to view on-chain state',
  organizerPk: '',
  state: 'REGISTRATION_OPEN',
  entryCount: 0,
  entryAccumulator: '',
  winningCommitment: '',
  winnerClaimed: false,
  isOrganizer: false,
};

export function usePGPStore() {
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [giveaway, setGiveaway] = useState<GiveawayItem>(EMPTY_GIVEAWAY);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [indexerConnected, setIndexerConnected] = useState<boolean>(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const stateSubscription = useRef<Subscription | null>(null);

  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    network: 'Preprod Remote',
    balance: '--',
    walletType: null,
    isLaceInstalled: false,
    isConnecting: false,
    error: null,
  });

  const [isWalletModalOpen, setIsWalletModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const { isLaceInstalled } = detectMidnightWallets();
    setWallet((prev) => ({ ...prev, isLaceInstalled }));
    return () => {
      stateSubscription.current?.unsubscribe();
    };
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

  const addActivity = (action: string, status: TransactionStatus, details: string, txHash?: string) => {
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString(),
        action,
        status,
        details,
        txHash,
      },
      ...prev,
    ]);
  };

  const subscribeContract = (address: string) => {
    stateSubscription.current?.unsubscribe();
    const state$ = connectContract(address);
    stateSubscription.current = state$.subscribe({
      next: (derived) => {
        setIndexerConnected(true);
        setConnectionError(null);
        setGiveaway({
          id: address,
          contractAddress: address,
          title: derived.title ?? 'Untitled Giveaway',
          prizeDetails: derived.prizeDetails ?? 'Not set',
          organizerPk: derived.organizerPk,
          state: ['REGISTRATION_OPEN', 'DRAW_PENDING', 'COMPLETED', 'CANCELLED'][derived.giveawayState] as any,
          entryCount: Number(derived.entryCount ?? 0n),
          entryAccumulator: derived.entryAccumulator,
          winningCommitment: derived.winningCommitment,
          winnerClaimed: derived.winnerClaimed,
          isOrganizer: derived.isOrganizer,
        });
        addActivity('Contract Connected', 'Confirmed', `Bound to deployed PGP contract ${address.substring(0, 12)}...`);
      },
      error: (err) => {
        setConnectionError(err?.message ?? 'Failed to observe contract');
        setIndexerConnected(false);
      },
    });
  };

  const handleSetContractAddress = (address: string) => {
    setContractAddress(address);
    if (address) {
      subscribeContract(address);
    } else {
      stateSubscription.current?.unsubscribe();
      disconnectContract();
      setIndexerConnected(false);
      setGiveaway(EMPTY_GIVEAWAY);
    }
  };

  const connectWallet = async (type: 'lace' | '1am' | 'seed' | 'custom', customAddress?: string) => {
    setWallet((prev) => ({ ...prev, isConnecting: true, error: null }));

    if (type === 'custom' && customAddress) {
      setWallet({
        isConnected: true,
        address: customAddress,
        network: 'Midnight Preprod Remote',
        balance: '--',
        walletType: 'custom',
        isLaceInstalled: wallet.isLaceInstalled,
        isConnecting: false,
        error: null,
      });
      setIsWalletModalOpen(false);
      addActivity(
        'Wallet Connected',
        'Confirmed',
        `View-only connection via custom address (${customAddress.substring(0, 12)}...)`,
      );
      return;
    }

    try {
      const res = await connectMidnightWallet(type as 'lace' | '1am' | 'seed');
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
      addActivity(
        'Wallet Connected',
        'Confirmed',
        `Connected via ${type.toUpperCase()} (${res.address.substring(0, 12)}...)`,
      );
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
      balance: '--',
      walletType: null,
      error: null,
    }));
    addActivity('Wallet Disconnected', 'Confirmed', 'Disconnected Midnight Wallet');
  };

  const toggleWalletConnection = () => {
    if (wallet.isConnected) disconnectWallet();
    else setIsWalletModalOpen(true);
  };

  // Honest transaction flow: calls real circuit functions that error if prerequisites are unmet.
  const submitCircuitCall = async (
    actionName: string,
    detailsText: string,
    onSuccess: () => void,
    circuitCall: () => Promise<any>,
  ) => {
    if (!wallet.isConnected) {
      setIsWalletModalOpen(true);
      return;
    }
    if (!contractAddress) {
      setTxModal({
        isOpen: true,
        status: 'Failed',
        action: actionName,
        message: 'No contract connected. Enter a deployed PGP contract address on the Settings tab first.',
      });
      return;
    }

    setTxModal({
      isOpen: true,
      status: 'Pending',
      action: actionName,
      message: 'Generating ZK proof via proof server...',
    });

    try {
      const result = await circuitCall();
      setTxModal({
        isOpen: true,
        status: 'Confirmed',
        action: actionName,
        message: 'Transaction confirmed on Midnight Preprod.',
        txHash: result?.txHash,
      });
      onSuccess();
      addActivity(actionName, 'Confirmed', detailsText, result?.txHash);
    } catch (err: any) {
      setTxModal({
        isOpen: true,
        status: 'Failed',
        action: actionName,
        message: err?.message || 'Circuit call failed.',
      });
      addActivity(actionName, 'Failed', err?.message || detailsText);
    }
  };

  const enterGiveawayAction = (commitmentHex: string, onSuccess: () => void) =>
    submitCircuitCall('Private Entry', `Submitted ZK commitment ${commitmentHex.substring(0, 12)}...`, onSuccess, () =>
      enterGiveaway(contractAddress, commitmentHex),
    );

  const claimPrizeAction = (ticketSecretHex: string, onSuccess: () => void) =>
    submitCircuitCall('Prize Claim', 'ZK proof verifies ticket secret matches winning commitment', onSuccess, () =>
      claimPrize(contractAddress, ticketSecretHex),
    );

  const createGiveawayAction = (title: string, prizeDetails: string, onSuccess: () => void) =>
    submitCircuitCall('Create Giveaway', `Created giveaway "${title}"`, onSuccess, () =>
      createGiveaway(contractAddress, title, prizeDetails),
    );

  const closeAndSelectWinnerAction = (winningCommitment: string, onSuccess: () => void) =>
    submitCircuitCall(
      'Draw Winner',
      `Posted winning commitment ${winningCommitment.substring(0, 12)}...`,
      onSuccess,
      () => closeAndSelectWinner(contractAddress, winningCommitment),
    );

  const cancelGiveawayAction = (onSuccess: () => void) =>
    submitCircuitCall('Cancel Giveaway', 'Organizer cancelled the active giveaway', onSuccess, () =>
      cancelGiveaway(contractAddress),
    );

  return {
    activeTab,
    setActiveTab,
    contractAddress,
    setContractAddress: handleSetContractAddress,
    giveaway,
    setGiveaway,
    activities,
    addActivity,
    indexerConnected,
    connectionError,
    wallet,
    setWallet,
    isWalletModalOpen,
    setIsWalletModalOpen,
    connectWallet,
    disconnectWallet,
    toggleWalletConnection,
    txModal,
    setTxModal,
    enterGiveawayAction,
    claimPrizeAction,
    createGiveawayAction,
    closeAndSelectWinnerAction,
    cancelGiveawayAction,
    subscribeContract,
  };
}
