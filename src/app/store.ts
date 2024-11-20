import {configureStore} from "@reduxjs/toolkit";
import {dishesReducer} from "../store/Slices/dishesSlice.ts";
import { ordersReducer } from '../store/Slices/ordersSlices.ts';

export const store = configureStore({
  reducer: {
    'dishes': dishesReducer,
    'orders': ordersReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
