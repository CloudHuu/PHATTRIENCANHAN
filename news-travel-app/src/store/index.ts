import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tourReducer from './slices/tourSlice';
import newsReducer from './slices/newsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
    news: newsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 