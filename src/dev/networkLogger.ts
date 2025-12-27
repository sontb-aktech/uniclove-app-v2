import { startNetworkLogging } from 'react-native-network-logger';

declare global {
  // eslint-disable-next-line no-var
  var __NETWORK_LOGGER_INITIALIZED__: boolean | undefined;
}

const IGNORED_PATTERNS = [
  /^GET https?:\/\/localhost:\d+\/index\.bundle/,
  /^GET https?:\/\/127\.0\.0\.1:\d+\/index\.bundle/,
  /^POST https?:\/\/localhost:\d+\/symbolicate/,
  /^POST https?:\/\/127\.0\.0\.1:\d+\/symbolicate/,
];

const IGNORED_HOSTS = ['clients3.google.com'];

export const initNetworkLogger = () => {
  if (globalThis.__NETWORK_LOGGER_INITIALIZED__) {
    return;
  }

  startNetworkLogging({
    ignoredHosts: IGNORED_HOSTS,
    ignoredPatterns: IGNORED_PATTERNS,
    maxRequests: 1000,
    forceEnable: true,
  });

  globalThis.__NETWORK_LOGGER_INITIALIZED__ = true;
};

export type InitNetworkLogger = typeof initNetworkLogger;
