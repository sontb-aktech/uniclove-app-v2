import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import CodePushSlice from './CodePushSlice';
import CommonSlice from './CommonSlice';
import TransSlice from './TransSlice';
import UserSlice from './UserSlice';
import HomeSlice from './HomeSlice';

const persistUserConfig = {
  key: 'user',
  storage: AsyncStorage,
  whitelist: ['userInfo', 'accessToken', 'refreshToken', 'firstInstall'],
};

const persistTransConfig = {
  key: 'trans',
  storage: AsyncStorage,
  whitelist: ['langCode', 'langTag'],
};

const persistCommonConfig = {
  key: 'common',
  storage: AsyncStorage,
  whitelist: ['theme', 'impressionTimeAppOpenAd'],
};

const persistAssistantConfig = {
  key: 'assistant',
  storage: AsyncStorage,
  whitelist: ['listAssistants'],
};

const persistNotificationConfig = {
  key: 'notification',
  storage: AsyncStorage,
  whitelist: ['lastReadNotificationId', 'countBadge'],
};

const persistArtConfig = {
  key: 'art',
  storage: AsyncStorage,
  whitelist: ['selectedModel'],
};

const persistModelConfig = {
  key: 'model',
  storage: AsyncStorage,
  whitelist: [
    'modelSettings',
    'selectedModelId',
    'selectedVoice',
    'listChatModels',
    'listImageModels',
  ],
};

const persistHomeConfig = {
  key: 'home',
  storage: AsyncStorage,
  whitelist: ['listTrends'],
};

const reducers = combineReducers({
  common: persistReducer(persistCommonConfig, CommonSlice.reducer),
  user: persistReducer(persistUserConfig, UserSlice.reducer),
  trans: persistReducer(persistTransConfig, TransSlice.reducer),
  codepush: CodePushSlice.reducer,
  home: persistReducer(persistHomeConfig, HomeSlice.reducer),
});

const store = configureStore({
  reducer: reducers,
  devTools: false,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type StoreType = typeof store;
export default store;
