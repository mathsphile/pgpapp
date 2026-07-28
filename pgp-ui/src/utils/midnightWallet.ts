// Midnight Network Wallet Connector - Real Lace & 1AM Extension Detection
// Returns real on-chain state from installed extensions; never returns fabricated addresses.

declare global {
  interface Window {
    midnight?: {
      lace?: any;
      '1am'?: any;
      [key: string]: any;
    };
    cardano?: any;
  }
}

export interface WalletDetectionResult {
  isLaceInstalled: boolean;
  is1AMInstalled: boolean;
  laceProvider: any | null;
  oneAMProvider: any | null;
}

export function detectMidnightWallets(): WalletDetectionResult {
  if (typeof window === 'undefined') {
    return { isLaceInstalled: false, is1AMInstalled: false, laceProvider: null, oneAMProvider: null };
  }

  const laceProvider = window.midnight?.lace || window.midnight?.['midnight-lace'] || window.cardano?.lace || null;
  const oneAMProvider = window.midnight?.['1am'] || window.midnight?.['midnight-1am'] || window.midnight?.oneAM || window.cardano?.['1am'] || null;

  return {
    isLaceInstalled: !!laceProvider,
    is1AMInstalled: !!oneAMProvider,
    laceProvider,
    oneAMProvider,
  };
}

async function resolveWalletApi(provider: any): Promise<any> {
  if (typeof provider?.enable === 'function') {
    return provider.enable();
  }
  if (typeof provider?.connect === 'function') {
    return provider.connect();
  }
  if (typeof provider === 'function') {
    return provider();
  }
  return provider;
}

function extractAddress(state: any): string | null {
  if (!state) return null;
  return state?.address
    ?? state?.coinPublicKey
    ?? state?.publicAddress
    ?? state?.accountAddress
    ?? state?.unshieldedAddress
    ?? null;
}

async function fetchBalance(api: any, address: string | null): Promise<string> {
  if (!api || typeof api?.balance !== 'function') return '--';
  try {
    const bal = await api.balance();
    if (bal == null) return '--';
    if (typeof bal === 'string') return bal;
    if (typeof bal === 'number') return bal.toString();
    if (typeof bal === 'bigint') return bal.toString();
    return JSON.stringify(bal);
  } catch {
    return '--';
  }
}

export async function connectMidnightWallet(
  providerType: 'lace' | '1am' | 'seed',
  seedPhrase?: string
): Promise<{ address: string; network: string; balance: string }> {
  const detection = detectMidnightWallets();

  if (providerType === 'lace') {
    if (!detection.isLaceInstalled || !detection.laceProvider) {
      throw new Error('Lace Wallet extension for Midnight Network is not installed. Install it from your browser store.');
    }
    try {
      const api = await resolveWalletApi(detection.laceProvider);
      const address = extractAddress(api?.state ? await api.state() : api);
      if (!address) {
        throw new Error('Lace returned no address. Ensure your Lace wallet is unlocked and set to the Preprod network.');
      }
      const state = typeof api?.state === 'function' ? await api.state() : api;
      const balance = await fetchBalance(state, address);
      return {
        address,
        network: 'Midnight Preprod Remote',
        balance,
      };
    } catch (err: any) {
      throw new Error(err?.message || 'Lace Wallet authorization declined.');
    }
  }

  if (providerType === '1am') {
    if (!detection.is1AMInstalled || !detection.oneAMProvider) {
      throw new Error('1AM Wallet extension for Midnight Network is not installed. Install it from your browser store.');
    }
    try {
      const api = await resolveWalletApi(detection.oneAMProvider);
      const address = extractAddress(api?.state ? await api.state() : api);
      if (!address) {
        throw new Error('1AM Wallet returned no address. Ensure it is unlocked and set to the Preprod network.');
      }
      const state = typeof api?.state === 'function' ? await api.state() : api;
      const balance = await fetchBalance(state, address);
      return {
        address,
        network: 'Midnight Preprod Remote',
        balance,
      };
    } catch (err: any) {
      throw new Error(err?.message || '1AM Wallet authorization declined.');
    }
  }

  if (providerType === 'seed') {
    if (!seedPhrase || seedPhrase.trim().length < 12) {
      throw new Error('Please enter a valid 12 or 24 word Midnight seed phrase.');
    }
    throw new Error('Seed-based wallet import is not yet supported in-browser. Use the CLI (`cd pgp-cli && npm run preprod-remote`) to import a seed wallet locally.');
  }

  throw new Error('Unsupported wallet provider type.');
}
