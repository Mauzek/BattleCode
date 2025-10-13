import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/profileSlice';
import localeReducer from './slices/localeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    locale: localeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;