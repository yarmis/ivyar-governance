/**
 * Redux Store Configuration
 */

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore, persistReducer } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';

// Slices
import authReducer from './slices/authSlice';
import settingsReducer from './slices/settingsSlice';
import offlineReducer from './slices/offlineSlice';

// MMKV Storage Adapter
const storage = new MMKV();

const mmkvStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value ?? null);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  whitelist: ['settings', 'offline'],
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: persistReducer(persistConfig, settingsReducer),
    offline: offlineReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
