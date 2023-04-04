import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CalculateState {
  value: number;
  mode: boolean
}

const initialState: CalculateState = {
  value: 0,
  mode: false,
};

export const calculateSlice = createSlice({
  name: 'calculate',
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = calculateSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.calculation.value)`
export const selectCount = (state: RootState) => state.counter.value;

export default calculateSlice.reducer;
