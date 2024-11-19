import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { IFormDish } from '../../types';

export const createDish = createAsyncThunk<void, IFormDish>(
  'dishes/createDish',
  async (dish) => {
    await axiosRequest.post('dishes.json', {...dish});
  }
);