import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish, IFormDish } from '../../types';
import { createDish, deleteDish, editDish, getDishes, getOneDish } from '../Thunks/dishesThunk.ts';
import { RootState } from '../../app/store.ts';

interface InitialState {
  dishes: IDish[];
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

export const allDishes = (state: RootState) => state.dishes.dishes;
export const oneDish = (state: RootState) => state.dishes.dish;

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
      })
      .addCase(getDishes.pending, (state) => {
        state.isLoading.getLoading = true;
        state.error = false;
      })
      .addCase(getDishes.fulfilled, (state, action: PayloadAction<IDish[]>) => {
        state.isLoading.getLoading = false;
        state.error = false;
        state.dishes = action.payload;
      })
      .addCase(getDishes.rejected, (state) => {
        state.isLoading.getLoading = false;
        state.error = true;
      })
      .addCase(deleteDish.pending, (state) => {
        state.isLoading.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteDish.fulfilled, (state) => {
        state.isLoading.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteDish.rejected, (state) => {
        state.isLoading.deleteLoading = false;
        state.error = true;
      })
      .addCase(getOneDish.pending, (state) => {
        state.isLoading.getOneDishLoading = true;
        state.error = false;
      })
      .addCase(getOneDish.fulfilled, (state, action: PayloadAction<IFormDish | null>) => {
        state.isLoading.getOneDishLoading = false;
        state.error = false;
        state.dish = action.payload;
      })
      .addCase(getOneDish.rejected, (state) => {
        state.isLoading.getOneDishLoading = false;
        state.error = true;
      })
      .addCase(editDish.pending, (state) => {
        state.isLoading.editLoading = true;
        state.error = false;
      })
      .addCase(editDish.fulfilled, (state) => {
        state.isLoading.editLoading = false;
        state.error = false;
        state.dish = null;
      })
      .addCase(editDish.rejected, (state) => {
        state.isLoading.editLoading = false;
        state.error = true;
      });
   }
});

export const dishesReducer = dishesSlice.reducer;