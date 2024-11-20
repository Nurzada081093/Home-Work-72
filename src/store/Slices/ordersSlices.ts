import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish, IDishCart } from '../../types';
import { RootState } from '../../app/store.ts';
import { createOrder } from '../Thunks/ordersThunks.ts';

interface UserCartDishState {
  orders: IDishCart[];
  loading: {
    createLoading: boolean;
  };
  error: boolean;
}

const initialState: UserCartDishState = {
  orders: [],
  loading: {
    createLoading: false,
  },
  error: false,
};

export const userCards = (state: RootState) => state.orders.orders;

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    dishCardToAdd: (state, {payload: orderDish}: PayloadAction<IDish>) => {
      const indexDish = state.orders.findIndex((order) => order.orderDish.id === orderDish.id);
      if (indexDish === -1) {
        state.orders = [...state.orders, {orderDish, amount: 1}];
      } else {
        const initialCards = [...state.orders];
        const initialCard = {...initialCards[indexDish]};
        initialCard.amount++;
        initialCards[indexDish] = initialCard;
        state.orders = [...initialCards];
      }
    },
    dishCardToDelete: (state, {payload: orderDish}: PayloadAction<IDish>) => {
      const indexDish = state.orders.findIndex((order) => order.orderDish.id === orderDish.id);
      if (indexDish === -1) {
        state.orders = [...state.orders, {orderDish, amount: 1}];
      } else {
        const initialCards = [...state.orders];
        const initialCard = {...initialCards[indexDish]};
        if (initialCard.amount > 0) {
          initialCard.amount--;
        } else {
          initialCard.amount = 0;
        }
        initialCards[indexDish] = initialCard;
        state.orders = [...initialCards];
      }

      const checkOrder: number[] = state.orders.map((order) => {
        return order.amount;
      });

      const sum: number = checkOrder.reduce((acc: number, i: number) => {
        acc = acc + i;
        return acc;
      }, 0);

      if (sum === 0) {
        state.orders = [];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading.createLoading = true;
        state.error = false;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.loading.createLoading = false;
        state.error = false;
        state.orders = [];
      })
      .addCase(createOrder.rejected, (state) => {
        state.loading.createLoading = false;
        state.error = true;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const {dishCardToAdd, dishCardToDelete} = ordersSlice.actions;
