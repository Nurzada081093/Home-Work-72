import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { IDishOrders } from '../../../types';
import React from 'react';
import Box from '@mui/joy/Box';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { deleteOrder, getOrders } from '../../../store/Thunks/ordersThunks.ts';
import { toast } from 'react-toastify';

interface Props {
  order: IDishOrders;
}

const OrderCard: React.FC<Props>  = ({order}) => {
  const dispatch = useAppDispatch();

  const totalPrice = order.dishes.reduce((acc, dish) => {
    acc += (dish.price * dish.amount);
    return acc;
  }, 150);

  const deleteTheOrder = async (id: string) => {
    await dispatch(deleteOrder(id));
    toast.success(`The order has been successfully deleted!`);
    await dispatch(getOrders());
  };

  return (
    <Card sx={{width: '95%', margin: '30px auto', padding: '10px'}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center', flexWrap: 'wrap'}}>
        <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%', justifyContent: 'space-around'}}>
          {order.dishes.map((dish) => (
            <Box key={dish.id} sx={{ margin: '10px  0 10px 10px', border: '1px solid transparent', width: '340px'}}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', margin: '10px  0'}}>
                <CardOverflow >
                  <img
                    style={{width: '100px', height: '100px', marginRight: '20px'}}
                    src={dish.image}
                    srcSet={dish.image}
                    loading="lazy"
                    alt={dish.title}
                  />
                </CardOverflow>
                <Box>
                  <Typography level="title-md" sx={{fontSize: '18px'}}>{dish.title}</Typography>
                  <Typography level="title-md">x {dish.amount} pcs</Typography>
                  <Typography level="title-md">{dish.price} KGZ</Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', width: '100%', justifyContent: 'space-around', borderTop: '1px solid lightgrey', padding: '10px 0'}}>
        <Typography level="body-md">Delivery: <Typography sx={{fontSize: 'lg', fontWeight: 'lg', marginLeft: '10px'}}>150 KGS</Typography></Typography>
        <Typography level="body-md" sx={{margin: '20px'}}>Total price: <Typography sx={{fontSize: 'lg', fontWeight: 'lg', marginLeft: '10px'}}>{totalPrice} KGS</Typography></Typography>
        <Button variant="text" sx={{color: 'black'}} onClick={() => deleteTheOrder(order.id)}>Complete order</Button>
      </Box>
    </Card>
  );
};

export default OrderCard;