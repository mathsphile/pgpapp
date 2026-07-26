// PGP Contract Unit & Circuit Verification Tests

import { describe, it, expect } from 'vitest';
import { pureCircuits } from '../src/managed/pgp/contract/index.js';
import { createPGPPrivateState, witnesses } from '../src/witnesses.js';

describe('Private Giveaway Platform (PGP) Smart Contract', () => {
  it('should generate valid public key from secret key witness', () => {
    const secretKey = new Uint8Array(32).fill(7);
    const publicKey = pureCircuits.publicKey(secretKey);

    expect(publicKey).toBeDefined();
    expect(publicKey.length).toBe(32);
  });

  it('should generate deterministic public key for identical secret keys', () => {
    const sk1 = new Uint8Array(32).fill(12);
    const sk2 = new Uint8Array(32).fill(12);

    const pk1 = pureCircuits.publicKey(sk1);
    const pk2 = pureCircuits.publicKey(sk2);

    expect(pk1).toEqual(pk2);
  });

  it('should produce different public keys for different secret keys', () => {
    const sk1 = new Uint8Array(32).fill(1);
    const sk2 = new Uint8Array(32).fill(2);

    const pk1 = pureCircuits.publicKey(sk1);
    const pk2 = pureCircuits.publicKey(sk2);

    expect(pk1).not.toEqual(pk2);
  });

  it('should format private state with witnesses correctly', () => {
    const sk = new Uint8Array(32).fill(42);
    const nonce = new Uint8Array(32).fill(99);
    const privateState = createPGPPrivateState(sk, nonce);

    const witnessCtx = {
      ledger: {} as any,
      privateState,
      contractAddress: '0x1234',
    };

    const [returnedState, returnedSk] = witnesses.localSecretKey(witnessCtx as any);
    expect(returnedSk).toEqual(sk);
    expect(returnedState.secretKey).toEqual(sk);

    const [, returnedNonce] = witnesses.participantNonce(witnessCtx as any);
    expect(returnedNonce).toEqual(nonce);
  });
});


