// PGP Web UI Main Entry Point

import './globals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { setNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import App from './App.js';
import * as pino from 'pino';

const networkId = (import.meta.env.VITE_NETWORK_ID as any) || 'undeployed';
setNetworkId(networkId);

export const logger = pino.pino({
  level: (import.meta.env.VITE_LOGGING_LEVEL as string) || 'info',
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
