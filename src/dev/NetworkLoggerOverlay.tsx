import React, { useCallback, useEffect, useState } from 'react';
import type { ComponentProps } from 'react';
import {
  DevSettings,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import NetworkLogger, { clearRequests } from 'react-native-network-logger';

declare global {
  // eslint-disable-next-line no-var
  var openNetworkLogger: (() => void) | undefined;
  // eslint-disable-next-line no-var
  var __HAS_NETWORK_LOGGER_MENU__: boolean | undefined;
}

const MENU_LABEL_OPEN = 'Open Network Logger';
const MENU_LABEL_CLEAR = 'Clear Network Logs';

type NetworkLoggerComponentProps = ComponentProps<typeof NetworkLogger>;

type Props = Pick<
  NetworkLoggerComponentProps,
  'theme' | 'compact' | 'maxRows' | 'sort'
>;

export const NetworkLoggerOverlay: React.FC<Props> = ({
  theme = 'dark',
  compact = false,
  maxRows,
  sort = 'desc',
}) => {
  const [visible, setVisible] = useState(false);

  const closeOverlay = useCallback(() => {
    setVisible(false);
  }, []);

  const openOverlay = useCallback(() => {
    setVisible(true);
  }, []);

  const clearAllRequests = useCallback(() => {
    clearRequests();
  }, []);

  useEffect(() => {
    if (!globalThis.__HAS_NETWORK_LOGGER_MENU__) {
      if (__DEV__ && typeof DevSettings?.addMenuItem === 'function') {
        DevSettings.addMenuItem(MENU_LABEL_OPEN, openOverlay);
        DevSettings.addMenuItem(MENU_LABEL_CLEAR, clearAllRequests);
      }

      globalThis.__HAS_NETWORK_LOGGER_MENU__ = true;
    }

    globalThis.openNetworkLogger = openOverlay;

    return () => {
      if (globalThis.openNetworkLogger === openOverlay) {
        delete globalThis.openNetworkLogger;
      }
    };
  }, [openOverlay, clearAllRequests]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={closeOverlay}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Network Logger</Text>
          <View style={styles.actions}>
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={clearAllRequests}
              style={[styles.button, styles.secondaryButton]}
            >
              <Text style={styles.secondaryText}>Clear</Text>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              hitSlop={10}
              onPress={closeOverlay}
              style={[styles.button, styles.primaryButton]}
            >
              <Text style={styles.primaryText}>Close</Text>
            </Pressable>
          </View>
        </View>
        <NetworkLogger
          theme={theme}
          compact={compact}
          maxRows={maxRows}
          sort={sort}
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  primaryButton: {
    backgroundColor: '#fff',
  },
  secondaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  primaryText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default NetworkLoggerOverlay;
