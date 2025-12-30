/**
 * Offline Status Hook
 */

import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';

export function useOffline() {
  const [isOffline, setIsOffline] = useState(false);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsOffline(!state.isConnected);
      setConnectionType(state.type);
    });

    return () => unsubscribe();
  }, []);

  return { isOffline, connectionType };
}
