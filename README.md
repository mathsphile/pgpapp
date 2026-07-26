# pgp

[![CI/CD Pipeline](https://github.com/midnightntwrk/pgp/actions/workflows/ci.yml/badge.svg)](https://github.com/midnightntwrk/pgp/actions/workflows/ci.yml)
[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod_Remote-6366f1)](https://midnight.network)
[![Compact Language](https://img.shields.io/badge/Compact-v0.23-a855f7)](https://midnight.network/docs)

Verify winners without exposing participant lists.

A zero-knowledge private giveaway platform on Midnight. An organizer creates a giveaway, participants enter by submitting opaque commitment hashes locally, and the winner proves ownership of the winning ticket in zero-knowledge. The ledger learns only that a valid winner claimed the prize, and never sees the participant identities, nonces, or unselected entries.

`npm @midnight-ntwrk/pgp-api`  `license MIT`  `Midnight preprod`


Live demo  /  npm  /  Integrate  /  Test on our site

Live on Midnight preprod. Contract `<YOUR_DEPLOYED_CONTRACT_ADDRESS>` is the single canonical deployment. The demo verifies against this one contract, and every app that consumes pgp points at the same address.

---

## The idea in one line

Giveaways today require participants to publicly expose their wallet addresses, email, or identities to enter, making every participant list a target for tracking and spam. pgp turns giveaway participation into a portable zero-knowledge proof: you register an opaque commitment once, and when the winner is drawn, you prove you hold the winning ticket without revealing your secret key or identifying any losing entry.

The verifying frontend needs no custodial wallet or private data server. It needs only an indexer connection, a contract address, and the on-chain winning commitment. That is what makes pgp a composable primitive for private draws on Midnight.

---

## What the chain sees, and what it never sees

| Written to the public ledger | Never leaves the participant's device |
| --- | --- |
| Entry commitment hash (`persistentHash([prefix, count, commitment])`) | Participant secret key (`localSecretKey`) |
| Cumulative `entryAccumulator` state | Random participant nonce & ticket secret |
| Published `winningCommitment` | Unselected ticket secrets & losing entry list |
| `winnerClaimed` status boolean | Merkle accumulator paths & private witness data |
| Organizer public key (`organizerPk`) | Off-chain wallet state & private LevelDB store |

Entries are aggregated inside an opaque hash accumulator, so on-chain observers cannot map participant commitments back to real-world identities or wallet addresses.

---

## How it fits together

```mermaid
sequenceDiagram
    autonumber
    actor Participant as Participant
    participant Wallet as Local Private Wallet
    participant Circuit as Compact ZK Circuit (pgp.compact)
    participant Ledger as Midnight On-Chain Ledger
    actor Organizer as Organizer

    Organizer->>Ledger: createGiveaway(title, prizeDetails)
    Note over Ledger: State = REGISTRATION_OPEN

    Participant->>Wallet: Generate Ticket Secret & Nonce
    Wallet->>Circuit: Compute Commitment = persistentHash([secret, sk, nonce])
    Circuit->>Ledger: enterGiveaway(entryCommitment)
    Note over Ledger: Appends commitment to ZK Accumulator Tree.<br/>Participant identity & total list stay 100% hidden.

    Organizer->>Ledger: closeAndSelectWinner(winningCommitment)
    Note over Ledger: State = DRAW_PENDING

    Participant->>Circuit: claimPrize(ticketSecret)
    Circuit->>Circuit: Verify persistentHash(ticketSecret) == winningCommitment
    Circuit->>Ledger: Set winnerClaimed = true
    Note over Ledger: Prize verified via ZK Proof!<br/>No private keys or unselected tickets exposed.
```

---

## Install

```bash
npm install @midnight-ntwrk/pgp-api
# React UI & CLI packages:
npm install @midnight-ntwrk/pgp-ui @midnight-ntwrk/pgp-cli
```

---

## Integrate in your app

### 1. Query giveaway state (the consumer side, no wallet needed)

This is all a verifier or frontend reader runs. It connects to the indexer and reads the public contract state without requiring a connected wallet or private keys.

```typescript
import { PGPAPI } from '@midnight-ntwrk/pgp-api';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';

setNetworkId('preprod');

const CONTRACT = '<YOUR_DEPLOYED_CONTRACT_ADDRESS>';
const api = await PGPAPI.connect(providers, CONTRACT);

// Read public giveaway state & commitment accumulator
const state = await api.getGiveawayState();
const entryCount = await api.getEntryCount();
const winningCommitment = await api.getWinningCommitment();
```

### 2. Enter and prove on the participant's device

The participant generates a secret locally, constructs an entry commitment witness, and submits the transaction using their Midnight wallet.

```typescript
import { PGPAPI } from '@midnight-ntwrk/pgp-api';

const api = await PGPAPI.join(providers, CONTRACT);

// 1. Participant generates a local ticket secret & commitment
const ticketSecret = crypto.getRandomValues(new Uint8Array(32));
const commitment = PGPAPI.computeCommitment(ticketSecret, participantNonce);

// 2. Submit commitment to the ZK accumulator tree
await api.enterGiveaway(commitment);

// 3. When winner is drawn, claim prize using local ZK proof
await api.claimPrize(ticketSecret);
```

### 3. React, in five lines

```tsx
import { GiveawayPortal } from '@midnight-ntwrk/pgp-ui';

<GiveawayPortal
  contractAddress={CONTRACT}
  connect={connectWallet}
>
  <WinnerVerification />
</GiveawayPortal>;
```

---

## What you can prove

| Circuit | Proves | Discloses |
| --- | --- | --- |
| `createGiveaway` | Initializes giveaway details and binds organizer public key | Title, prize details, and `organizerPk` |
| `enterGiveaway` | Adds a valid participant entry commitment to the ZK accumulator | Updated `entryAccumulator` hash & `entryCount` |
| `closeAndSelectWinner` | Organizer closes registration and sets winning commitment | `winningCommitment` & state change to `DRAW_PENDING` |
| `claimPrize` | Participant holds ticket secret matching `winningCommitment` | `winnerClaimed = true` & state change to `COMPLETED` |
| `cancelGiveaway` | Organizer cancels active giveaway before completion | State change to `CANCELLED` |

---

## Test it on the live site

A full working web interface runs locally at `http://localhost:5173`.

1. Open `http://localhost:5173` or launch the live app on Midnight Preprod.
2. Connect a Midnight wallet on preprod (Lace or 1AM). The 1AM wallet credits test tNIGHT for transaction fees.
3. Deploy or set your deployed contract address in Settings.
4. Enter the active giveaway by generating a ticket secret. Only the commitment hash is appended on-chain.
5. Close registration as the organizer and draw a winning commitment.
6. Verify & claim prize using ZK proof. The dApp reads back a single verified result with no private keys or unselected tickets exposed.

---

## Why it has to be on Midnight

Privacy here is load-bearing, not decorative.

- **Kachina private state** keeps ticket secrets, participant nonces, and witness data on the holder's device as first-class protocol citizens, not as an off-chain hack.
- **The `disclose()` discipline** in Compact means every value that reaches the ledger is acknowledged explicitly. The compiler rejects accidental leaks of witness data.
- **Local proof generation** means proof material never leaves the user's machine.
- **On a transparent chain this is impossible:** either participant entries go on-chain and are public forever, or selection is centralized off-chain. Midnight gives integrity and secrecy at the same time.

---

## Monorepo layout

```
contract/     Compact contract (pgp.compact), witnesses, and compiled artifacts (compactc 0.31.1, language 0.23)
api/          @midnight-ntwrk/pgp-api, TypeScript adapter & contract state observables
bboard-cli/   @midnight-ntwrk/pgp-cli, interactive CLI for headless deployment and testing
bboard-ui/    @midnight-ntwrk/pgp-ui, Glassmorphism Web UI built with React 19, Vite, and Zustand
```

---

## Run it locally

Prerequisites: Node 24 or newer, Docker Desktop, a Midnight wallet, and the Compact toolchain (`compactc 0.31.x`).

```bash
# 1. Start Proof Server (Docker)
docker run -d -p 6300:6300 -e PORT=6300 midnightntwrk/proof-server:8.1.0

# 2. Install dependencies & compile contract
npm install
npm run compact --workspace=@midnight-ntwrk/pgp-contract
npm run build

# 3. Run the demo Web DApp
cd bboard-ui
npm run dev    # http://localhost:5173
```

Have a funded preprod seed phrase? Run the headless CLI driver:

```bash
cd bboard-cli
NODE_OPTIONS="--max-old-space-size=8192" npm run preprod-remote
```

---

## Security notes (honest scope)

- **ZK Accumulator Integrity:** Entry commitments use `persistentHash` chaining to prevent collision attacks while preserving participant anonymity.
- **Single-Claim Enforcement:** `winnerClaimed` boolean state prevents double-claiming of giveaway rewards.
- **Organizer Authentication:** `closeAndSelectWinner` and `cancelGiveaway` verify `organizerPk == publicKey(localSecretKey())` via zero-knowledge witness proof.
- **Intentionally out of scope for this build:**
  - Off-chain sybil-resistance (preventing one user from generating multiple keypairs is handled by wallet authentication / off-chain gating).
  - Multi-winner tier draws (currently designed for 1 canonical winner per deployment instance).

---

## License

MIT. See LICENSE.
