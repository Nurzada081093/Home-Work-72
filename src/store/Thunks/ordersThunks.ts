import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { APIOrder, IOrderDish } from '../../types';

export const createOrder = createAsyncThunk<void, IOrderDish>(
  'orders/createOrder',
  async (order) => {
    await axiosRequest.post('orders.json', {...order});
  }
);

export const getOrders = createAsyncThunk<APIOrder[], void>(
  'orders/getOrders',
  async () => {
    const response = await axiosRequest('orders.json');
    const responseData = response.data;

    if (responseData === null) {
      return [];
    }
    return responseData;
  }
);