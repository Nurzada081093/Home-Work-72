import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { getOrders } from '../../store/Thunks/ordersThunks.ts';
import { userOrders } from '../../store/Slices/ordersSlices.ts';
import { Container } from '@mui/joy';
import { Typography } from '@mui/material';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import { IDishOrders } from '../../types';
import { allDishes } from '../../store/Slices/dishesSlice.ts';

const Orders = () => {
  const allOrders: IDishOrders[] = [];
  const orders = useAppSelector(userOrders);
  const dishes = useAppSelector(allDishes);
  const dispatch = useAppDispatch();

  const getAllOrdersWithDishes = useCallback(async () => {
    await dispatch(getOrders());
    await dispatch(getDishes());
  },[dispatch]);

  useEffect(() => {
    void getAllOrdersWithDishes();
  }, [getAllOrdersWithDishes]);

  orders.forEach(order => {
    const newOrder: IDishOrders = { id: String(order.id), dishes: []};

    for (const dishId in order) {
      if (dishId !== 'id') {
        const dish = dishes.find(oneDish => oneDish.id === dishId);
        if (dish) {
          newOrder.dishes.push({
            ...dish,
            amount: Number(order[dishId]),
          });
        }
      }
    }
    allOrders.push(newOrder);
  });

  console.log(allOrders);

  return (
    <Container>
      <Typography variant="h3">Orders</Typography>
      Все заказы!
    </Container>
  );
};

export default Orders;