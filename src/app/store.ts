import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import calculateReducer from '../features/calculation/calculateSlice';

export const store = configureStore({
  reducer: {
    calculation: calculateReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
