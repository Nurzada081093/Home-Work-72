import {configureStore} from "@reduxjs/toolkit";
import {dishesReducer} from "../store/Slices/dishesSlice.ts";
import { cardsDishReducer } from '../store/Slices/userCartDishSlices.ts';

export const store = configureStore({
  reducer: {
    'dishes': dishesReducer,
    'cards': cardsDishReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
