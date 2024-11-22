import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { APIOrder, IDish, IDishOrder } from '../../types';
import { RootState } from '../../app/store.ts';
import { createOrder, deleteOrder, getOrders } from '../Thunks/ordersThunks.ts';

interface UserCartDishState {
  orders: IDishOrder[];
  ordersFromAPI: APIOrder[];
  loading: {
    createLoading: boolean;
    getLoading: boolean;
    deleteLoading: boolean;
  };
  error: boolean;
}

const initialState: UserCartDishState = {
  orders: [],
  ordersFromAPI: [],
  loading: {
    createLoading: false,
    getLoading: false,
    deleteLoading: false,
  },
  error: false,
};

export const userCards = (state: RootState) => state.orders.orders;
export const userOrders = (state: RootState) => state.orders.ordersFromAPI;
export const addLoadingSlice = (state: RootState) => state.orders.loading.createLoading;
export const getLoadingSlice = (state: RootState) => state.orders.loading.getLoading;

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
      })
      .addCase(getOrders.pending, (state) => {
        state.loading.getLoading = true;
        state.error = false;
      })
      .addCase(getOrders.fulfilled, (state, action: PayloadAction<APIOrder[]>) => {
        state.loading.getLoading = false;
        state.error = false;
        state.ordersFromAPI = action.payload;
      })
      .addCase(getOrders.rejected, (state) => {
        state.loading.getLoading = false;
        state.error = true;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading.deleteLoading = true;
        state.error = false;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.loading.deleteLoading = false;
        state.error = false;
      })
      .addCase(deleteOrder.rejected, (state) => {
        state.loading.deleteLoading = false;
        state.error = true;
      });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const {dishCardToAdd, dishCardToDelete} = ordersSlice.actions;
