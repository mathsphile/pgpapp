// Private Giveaway Platform (PGP) UI Types

export type AppTab = 'home' | 'dashboard' | 'giveaways' | 'verify' | 'organizer' | 'analytics' | 'settings';

export type TransactionStatus = 'Idle' | 'Pending' | 'Processing' | 'Confirmed' | 'Failed';

export interface ActivityItem {
  id: string;
  timestamp: string;
  action: string;
  status: TransactionStatus;
  details: string;
  txHash?: string;
}

export interface GiveawayItem {
  id: string;
  contractAddress: string;
  title: string;
  prizeDetails: string;
  organizerPk: string;
  state: 'REGISTRATION_OPEN' | 'DRAW_PENDING' | 'COMPLETED' | 'CANCELLED';
  entryCount: number;
  entryAccumulator: string;
  winningCommitment: string;
  winnerClaimed: boolean;
  isOrganizer: boolean;
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  network: string;
  balance: string;
}
