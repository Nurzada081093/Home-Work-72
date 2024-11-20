import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosRequest from '../../axiosRequest.ts';
import { APIDish, IDish, IFormDish } from '../../types';

export const createDish = createAsyncThunk<void, IFormDish>(
  'dishes/createDish',
  async (dish) => {
    await axiosRequest.post('dishes.json', {...dish});
  }
);

export const getDishes = createAsyncThunk<IDish[], void>(
  'dishes/getDishes',
  async () => {
    const responseDishes: {data: APIDish  | null} = await axiosRequest('dishes.json');
    const responseData = responseDishes.data;

    if (responseData === null) {
      return [];
    }

    return Object.keys(responseData).map((dishId) => {
      return {
        ...responseData[dishId],
        id: dishId,
      };
    });
  }
);

export const deleteDish = createAsyncThunk<void, string>(
  'dishes/deleteDish',
  async (id: string) => {
    await axiosRequest.delete(`dishes/${id}.json`);
  }
);

export const getOneDish = createAsyncThunk<IFormDish | null, string>(
  'dishes/getOneDish',
  async (id: string) => {
    const responseDish = await axiosRequest(`dishes/${id}.json`);
    return responseDish.data || null;
  }
);

export const editDish = createAsyncThunk<void, {id: string, dish: IFormDish}>(
  'dishes/editDish',
  async ({id, dish}) => {
    await axiosRequest.put(`dishes/${id}.json`, {...dish});
  }
);