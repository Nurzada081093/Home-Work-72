import { createSlice } from '@reduxjs/toolkit';
import { IFormDish } from '../../types';
import { createDish } from '../Thunks/dishesThunk.ts';

interface InitialState {
  dishes: IFormDish[];
  dish: IFormDish | null;
  isLoading: {
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
    getOneDishLoading: boolean;
    editLoading: boolean;
  },
  error: boolean;
}

const initialState: InitialState = {
  dishes: [],
  dish: null,
  isLoading: {
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
    getOneDishLoading: false,
    editLoading: false,
  },
  error: false,
};

export const dishesSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDish.pending, (state) => {
        state.isLoading.createLoading = true;
        state.error = false;
      })
      .addCase(createDish.fulfilled, (state) => {
        state.isLoading.createLoading = false;
        state.error = false;
      })
      .addCase(createDish.rejected, (state) => {
        state.isLoading.createLoading = false;
        state.error = true;
      });
  }
});

export const dishesReducer = dishesSlice.reducer;