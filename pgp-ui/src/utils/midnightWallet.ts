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
  const oneAMProvider =
    window.midnight?.['1am'] ||
    window.midnight?.['midnight-1am'] ||
    window.midnight?.oneAM ||
    window.cardano?.['1am'] ||
    null;

  return {
    isLaceInstalled: !!laceProvider,
    is1AMInstalled: !!oneAMProvider,
    laceProvider,
    oneAMProvider,
  };
}

async function resolveWalletApi(provider: any): Promise<any> {
  if (typeof provider?.enable === 'function') {
    console.log('[Wallet] Calling enable()...');
    return provider.enable();
  }
  if (typeof provider?.connect === 'function') {
    console.log('[Wallet] Calling connect()...');
    return provider.connect();
  }
  if (typeof provider === 'function') {
    console.log('[Wallet] Calling provider as function...');
    return provider();
  }
  console.log('[Wallet] Using provider directly');
  return provider;
}

function extractAddress(api: any): string | null {
  if (!api) return null;

  // Try direct properties first
  const directAddress =
    api.address ?? api.coinPublicKey ?? api.publicAddress ?? api.accountAddress ?? api.unshieldedAddress;

  if (directAddress) {
    console.log('[Wallet] Found direct address:', directAddress.substring(0, 20));
    return directAddress;
  }

  // Try common nested patterns
  if (api.state && typeof api.state === 'object') {
    const stateAddress =
      api.state.address ??
      api.state.coinPublicKey ??
      api.state.publicAddress ??
      api.state.accountAddress ??
      api.state.unshieldedAddress;
    if (stateAddress) {
      console.log('[Wallet] Found state.address:', stateAddress.substring(0, 20));
      return stateAddress;
    }
  }

  if (api.wallet && typeof api.wallet === 'object') {
    const walletAddress = api.wallet.address ?? api.wallet.coinPublicKey ?? api.wallet.publicAddress;
    if (walletAddress) {
      console.log('[Wallet] Found wallet.address:', walletAddress.substring(0, 20));
      return walletAddress;
    }
  }

  // Try account() method
  if (typeof api.account === 'function') {
    try {
      const account = api.account();
      if (account?.address) {
        console.log('[Wallet] Found account().address:', account.address.substring(0, 20));
        return account.address;
      }
    } catch (e) {
      console.log('[Wallet] account() failed:', e);
    }
  }

  // Try getAddress() method
  if (typeof api.getAddress === 'function') {
    try {
      const addr = api.getAddress();
      if (addr) {
        console.log('[Wallet] Found getAddress():', addr.substring(0, 20));
        return addr;
      }
    } catch (e) {
      console.log('[Wallet] getAddress() failed:', e);
    }
  }

  console.log('[Wallet] API object keys:', Object.keys(api));
  console.log('[Wallet] Full API object:', api);
  return null;
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
  seedPhrase?: string,
): Promise<{ address: string; network: string; balance: string }> {
  const detection = detectMidnightWallets();

  if (providerType === 'lace') {
    if (!detection.isLaceInstalled || !detection.laceProvider) {
      throw new Error(
        'Lace Wallet extension for Midnight Network is not installed. Install it from your browser store.',
      );
    }
    try {
      console.log('[Lace] Resolving wallet API...');
      const api = await resolveWalletApi(detection.laceProvider);
      console.log('[Lace] API resolved, extracting address...');

      // If state is a function, call it first
      const resolvedApi = typeof api?.state === 'function' ? await api.state() : api;

      const address = extractAddress(resolvedApi);
      if (!address) {
        throw new Error(
          'Lace Wallet returned no address. Ensure it is unlocked, set to Preprod network, and has completed initial setup.',
        );
      }

      console.log('[Lace] Address extracted:', address);
      const balance = await fetchBalance(resolvedApi, address);
      return {
        address,
        network: 'Midnight Preprod Remote',
        balance,
      };
    } catch (err: any) {
      console.error('[Lace] Connection error:', err);
      throw new Error(err?.message || 'Lace Wallet authorization declined.');
    }
  }

  if (providerType === '1am') {
    if (!detection.is1AMInstalled || !detection.oneAMProvider) {
      throw new Error(
        '1AM Wallet extension for Midnight Network is not installed. Install it from your browser store.',
      );
    }
    try {
      console.log('[1AM] Resolving wallet API...');
      const api = await resolveWalletApi(detection.oneAMProvider);
      console.log('[1AM] API resolved, extracting address...');

      // If state is a function, call it first
      const resolvedApi = typeof api?.state === 'function' ? await api.state() : api;

      const address = extractAddress(resolvedApi);
      if (!address) {
        throw new Error(
          '1AM Wallet returned no address. Ensure it is unlocked, set to Preprod network, and has completed initial setup.',
        );
      }

      console.log('[1AM] Address extracted:', address);
      const balance = await fetchBalance(resolvedApi, address);
      return {
        address,
        network: 'Midnight Preprod Remote',
        balance,
      };
    } catch (err: any) {
      console.error('[1AM] Connection error:', err);
      throw new Error(err?.message || '1AM Wallet authorization declined.');
    }
  }

  if (providerType === 'seed') {
    if (!seedPhrase || seedPhrase.trim().length < 12) {
      throw new Error('Please enter a valid 12 or 24 word Midnight seed phrase.');
    }
    throw new Error(
      'Seed-based wallet import is not yet supported in-browser. Use the CLI (`cd pgp-cli && npm run preprod-remote`) to import a seed wallet locally.',
    );
  }

  throw new Error('Unsupported wallet provider type.');
}
