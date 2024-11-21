import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useCallback, useEffect } from 'react';
import { getOrders } from '../../store/Thunks/ordersThunks.ts';
import { userCards, userOrders } from '../../store/Slices/ordersSlices.ts';
import { Container } from '@mui/joy';
import { Typography } from '@mui/material';


const Orders = () => {
  const orders = useAppSelector(userCards);
  const usersOrder = useAppSelector(userOrders);
  const dispatch = useAppDispatch();

  const getAllOrders = useCallback(async () => {
    await dispatch(getOrders());

  },[dispatch]);

  useEffect(() => {
    void getAllOrders();
  }, [getAllOrders]);

  console.log(orders);
  console.log(usersOrder);

  return (
    <Container>
      <Typography variant="h3">Orders</Typography>
      Все заказы!
    </Container>
  );
};

export default Orders;