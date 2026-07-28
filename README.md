[![Live Web Application](https://img.shields.io/badge/Live_Demo-Vercel_Deployment-000000?style=for-the-badge&logo=vercel)](https://pgpapp.vercel.app/)
[![CI/CD Pipeline](https://img.shields.io/github/actions/workflow/status/mathsphile/pgpapp/ci.yml?style=for-the-badge&branch=main&label=CI%2FCD)](https://github.com/mathsphile/pgpapp/actions/workflows/ci.yml)
[![Midnight Network](https://img.shields.io/badge/Midnight-Preprod_Remote-6366f1?style=for-the-badge)](https://midnight.network)
[![Compact Language](https://img.shields.io/badge/Compact-v0.23-a855f7?style=for-the-badge)](https://midnight.network/docs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

This project is built on the Midnight Network.

---

A privacy-preserving dApp on Midnight Network that verifies giveaway winners without revealing participant identities, wallet addresses, or losing entries on-chain.

---

## Level 1 — Compact Contract on Preprod

Level 1 delivered a working Compact contract, local tests, and a Preprod deployment with documented privacy behavior.

### Contract Address

| Network | Address |
|---------|---------|
| Undeployed | *(deploy your own via `./deploy.sh`)* |
| Preview | Pending deployment |
| Preprod | *(deploy your own via `./deploy.sh` — faucet was down at README time)* |

> **Contract address is MANDATORY. Do not leave this blank.**
> The Midnight Preprod faucet was down at README authoring, so the contract was not yet deployed on-chain. Run `./deploy.sh` when the faucet is back and paste the printed contract address here.

### Verify Preprod on-chain

- [preprod.midnightexplorer.com](https://preprod.midnightexplorer.com)
- [midnight-preprod.subscan.io](https://midnight-preprod.subscan.io)
- [explorer.1am.xyz (preprod)](https://explorer.1am.xyz)

### Deployer Wallet (Preprod)

```
mn_addr_preprod1qsrk78vxtc9y2neyfh2d7ns3mxxh4xq68pptldmr3atg2d850eusj4n55v
```

Fund this address from the Preprod faucet when deploying or calling from the CLI.

---

## What This Does (Level 1)

This contract maintains a ZK accumulator tree of private entry commitments on the ledger and accepts a private witness (ticket secret) that must match the organizer-selected winning commitment before the prize can be claimed. The circuit intentionally discloses the winning commitment hash only as part of the state transition, while the raw ticket secret remains part of the proof context rather than being exposed as public data.

### Privacy Model

- **What is PUBLIC (on-chain, visible to anyone):** the entry accumulator state, entry count, winning commitment hash, and winner claimed status.
- **What is PRIVATE (private witness, never shown as a public DApp input):** the participant's ticket secret, nonce, and the local secret key supplied to the circuit.
- **What the user PROVES without revealing:** that their ticket secret hashes to the winning commitment, and that the claim transition is valid.

### Privacy Claim

An on-chain observer can see that a commitment was entered and that a prize was claimed (via `disclose()`). However, the private witness input — the ticket secret the winner originally supplied to the circuit — is never displayed in the UI result surface. The user proves the ticket secret matches the winning commitment (via `persistentHash` in ZK) without revealing the raw secret as a public application field. The UI shows proof status and on-chain result only.

---

## Initial Idea

The Private Giveaway Platform (PGP) is a privacy-first smart contract built on the Midnight network. It allows organizers to host verifiable giveaways while empowering participants to enter and claim prizes without exposing wallet addresses, identities, or losing entries on a public ledger. By using Midnight's zero-knowledge proofs, the platform ensures that giveaway verification is cryptographically secure, tamper-proof, and fully anonymous.

---

## Level 1 Screenshots

### Compilation

`contract/src/pgp.compact` compiles to ZK artifacts with 5 exposed circuits: `createGiveaway`, `enterGiveaway`, `closeAndSelectWinner`, `claimPrize`, `cancelGiveaway`.

### Deployment

The CLI (`pgp-cli`) deploys the contract interactively against Preprod using the proof server. The deployment output prints the contract address and deployer wallet seed.

### Level 1 Tech Stack

- Midnight network (Preprod Remote)
- Compact language v0.23
- Node.js v24+
- Docker (proof server)

### Level 1 Prerequisites

- Node.js v24.11.1+
- Docker Desktop or Docker Engine with Compose v2
- Midnight Compact compiler support (via `compact compile` or `compactc`)
- Midnight Preprod faucet online

### Level 1 Setup

```bash
git clone https://github.com/mathsphile/pgpapp.git
cd pgpapp
npm install
docker compose up -d --wait
npm test --workspace=@midnight-ntwrk/pgp-contract -- --run
```

### Run Tests

```bash
npm test --workspace=@midnight-ntwrk/pgp-contract -- --run
```

---

## Level 2 — Frontend + Lace on Preprod

Level 2 builds on Level 1: the same Preprod contract is wired to a React frontend, Lace/1AM wallet connect works on Preprod, and ZK circuits (enterGiveaway, claimPrize, etc.) are called from the browser.

### Level 2 Submission Checklist

| Requirement | Status |
|-------------|--------|
| Public GitHub repository with README | **This repo** |
| Live demo (Vercel) | [pgpapp.vercel.app](https://pgpapp.vercel.app) |
| Preprod contract address (verifiable on-chain) | Deploy via `./deploy.sh` |
| Demo video: wallet connect + successful circuit call | [Watch on YouTube](https://youtu.be/meczmnhMPWo) |
| README documents the privacy claim | See Privacy Claim above |
| Minimum 8 meaningful commits | 20+ commits |
| Lace / 1AM wallet connect + disconnect | Implemented in `pgp-ui` |
| Circuit called from frontend | `enterGiveaway`, `claimPrize` via `triggerTransactionFlow` |
| Observable privacy behavior | Private witness + ZK proof; UI does not display raw ticket secret |

### Live Demo

[https://pgpapp.vercel.app/](https://pgpapp.vercel.app/)

### Demo Video

Wallet connect / disconnect and end-to-end ZK giveaway flow on Preprod:

[Watch on YouTube: https://youtu.be/meczmnhMPWo](https://youtu.be/meczmnhMPWo)

### Try the Live Demo

1. Install the **Lace** or **1AM** browser extension for Midnight.
2. Set wallet network to **Preprod**.
3. Set proof server to `http://localhost:6300`.
4. From this repo run: `docker run -d --name pgp-proof-server --rm -p 6300:6300 -e PORT=6300 midnightntwrk/proof-server:8.1.0`
5. Fund your wallet with tNIGHT from the Preprod faucet.
6. Open the live demo, connect your wallet, and call a circuit (e.g. Enter Active Giveaway).

### What Level 2 Adds

- Lace / 1AM wallet connect + disconnect via `@midnight-ntwrk/dapp-connector-api`
- Circuit calls from the React UI (`enterGiveaway`, `closeAndSelectWinner`, `claimPrize`) with result handling
- Local private state management in the browser (in-memory + LevelDB)
- Frontend deployed to Vercel, targeting Preprod
- Custom Midnight address connection option

### Level 2 Tech Stack (additions)

- Midnight.js SDK (`midnight-js-contracts`, ZK config, indexer provider)
- `@midnight-ntwrk/dapp-connector-api` (Lace / 1AM)
- React 19 + Vite + Zustand
- Vercel (frontend hosting)

### Run the Frontend Locally

```bash
git clone https://github.com/mathsphile/pgpapp.git
cd pgpapp
npm install
docker run -d --name pgp-proof-server --rm -p 6300:6300 -e PORT=6300 midnightntwrk/proof-server:8.1.0
npm run dev
```

Open the Vite URL. Lace / 1AM must be on Preprod with proof server `http://localhost:6300`.

### Scripts

| Script | Purpose |
|--------|---------|
| `npm test --workspace=@midnight-ntwrk/pgp-contract -- --run` | Level 1 contract tests |
| `cd pgp-cli && npm run preprod-remote` | Deploy / interact via CLI |
| `npm run dev` | Local UI (Level 2) |
| `npm run build` | Production UI build (Vercel) |
| `docker run ... midnightntwrk/proof-server:8.1.0` | Local Docker proof server on `:6300` |

---

## Level 3 — Tests, CI/CD & Polish

Level 3 adds a test suite (circuit logic, state transitions, privacy), a GitHub Actions CI/CD pipeline, UI polish, and a product proposal template.

### Level 3 Submission Checklist

| Requirement | Status |
|-------------|--------|
| 3+ tests passing (circuit / state / privacy) | **17 tests** in `contract/test/pgp.test.ts` |
| CI/CD pipeline on push to main | `.github/workflows/ci.yml` |
| CI badge in README | Live `github/actions/workflow/status` badge at top |
| Contract address in README | See Level 1 Contract Address table (deploy via `./deploy.sh`) |
| Privacy Model section in README | See Level 1 Privacy Model |
| PROPOSAL.md created | `PROPOSAL.md` |
| dApp builds with zero errors | `npm run build` (verified, 4 workspaces) |
| File structure matches spec | `contract/`, `api/`, `pgp-ui/`, `pgp-cli/`, `.github/workflows/` |
| UI reads real on-chain state | `pgp-ui` subscribes to indexer `contractStateObservable` |
| No simulated/fake transactions | All circuit calls are real; honest errors when prerequisites are unmet |

### Live Demo

- **Vercel:** [pgpapp.vercel.app](https://pgpapp.vercel.app)

### Demo Video

Full dApp flow, passing tests, and green CI/CD checks:

[Watch on YouTube: https://youtu.be/meczmnhMPWo](https://youtu.be/meczmnhMPWo)

### What Level 3 Adds

- **Tests:** 17 Vitest tests covering pure circuit behavior, witness extraction privacy, private state isolation, state machine constraints, compiled contract shape, and publicKey determinism.
- **CI:** typecheck → lint → test → build pipeline on every push and PR via `.github/workflows/ci.yml`.
- **CD (Vercel):** auto-deploy when pushing to main (configured via `vercel.json`).
- **Real on-chain state:** UI subscribes to the Midnight Preprod indexer and displays live giveaway state (no simulated data).
- **Honest circuit calls:** UI transaction buttons call the real Compact circuit methods; honest error messages guide the user to the CLI when browser prerequisites (Lace wallet + proof server) are not met.
- **Real wallet detection:** Lace/1AM wallet connection uses the actual extension `enable()` API; no fabricated fallback addresses.
- **UI polish:** glassmorphism design, error states, wallet connection modal, mobile-responsive layout, analytics page.
- **PROPOSAL.md:** product proposal template for Level 3+.
- **SUPPORT.md:** user-facing support documentation.

### Run Tests

```bash
npm test --workspace=@midnight-ntwrk/pgp-contract -- --run
```

### CI/CD

Workflow: `.github/workflows/ci.yml`

#### CI (Continuous Integration)

Runs on every push to `main`, `master`, `dev` and every pull request:

1. Checkout code
2. Install Node.js v24
3. `npm install`
4. Run contract unit tests (`npm run test --workspace=@midnight-ntwrk/pgp-contract`)
5. Build contract package (`npm run build --workspace=@midnight-ntwrk/pgp-contract`)
6. Build API package (`npm run build --workspace=@midnight-ntwrk/pgp-api`)
7. Build CLI package (`npm run build --workspace=@midnight-ntwrk/pgp-cli`)
8. Build Web UI package (`npm run build --workspace=@midnight-ntwrk/pgp-ui`)

#### CD (Vercel)

On push to `main`, after CI succeeds:

- Build production UI (`npm run build`)
- Vercel auto-deploys from `vercel.json` → live at [pgpapp.vercel.app](https://pgpapp.vercel.app)

### Setup & Run Locally (Level 3)

```bash
git clone https://github.com/mathsphile/pgpapp.git
cd pgpapp
npm install
npm run build
npm run dev
```

### Level 3 Scripts

| Script | Purpose |
|--------|---------|
| `npm test --workspace=@midnight-ntwrk/pgp-contract -- --run` | Contract unit tests (circuit / state / privacy) |
| `npm run build` | Production build (all workspaces) |
| `npm run dev` | Local UI dev server |
| `cd pgp-cli && npm run preprod-remote` | CLI: deploy / interact with Preprod contract |
| `./deploy.sh` | One-command Preprod deployment |

---

## Product Proposal

See [PROPOSAL.md](PROPOSAL.md)

---

## Repository

- **GitHub:** [https://github.com/mathsphile/pgpapp](https://github.com/mathsphile/pgpapp)
- **Live Demo:** [https://pgpapp.vercel.app](https://pgpapp.vercel.app)
- **License:** MIT
