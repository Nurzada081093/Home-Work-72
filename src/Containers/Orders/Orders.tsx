import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { getOrders } from '../../store/Thunks/ordersThunks.ts';
import { userOrders } from '../../store/Slices/ordersSlices.ts';
import { Container } from '@mui/joy';
import { Typography } from '@mui/material';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import { IDishOrders } from '../../types';
import { allDishes } from '../../store/Slices/dishesSlice.ts';
import OrderCards from '../../Components/OrderCards/OrderCards.tsx';

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

  return (
    <Container>
      <Typography variant="h3" sx={{margin: '20px 0 20px 30px'}}>Orders</Typography>
      {allOrders.length !== 0 ? <OrderCards orders={allOrders}/>
        :
      <Typography variant="h4" sx={{margin: '50px auto', textAlign: 'center', fontStyle: 'italic'}}>You haven't orders at the moment!</Typography>}
    </Container>
  );
};

export default Orders;