import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IOrderDish } from '../../types';

export const createOrder = createAsyncThunk<void, IOrderDish>(
  'orders/createOrder',
  async (order) => {
    await axiosRequest.post('orders.json', {...order});
  }
);