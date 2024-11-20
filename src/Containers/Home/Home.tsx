import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allDishes } from '../../store/Slices/dishesSlice.ts';
import { useCallback, useEffect, useState } from 'react';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import { Container } from '@mui/joy';
import DishCards from '../../Components/DishCards/DishCards.tsx';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { userCards } from '../../store/Slices/ordersSlices.ts';
import { Button } from '@mui/material';
import ModalWindow from '../../Components/ModalWindow/ModalWindow.tsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dishes = useAppSelector(allDishes);
  const cardWithDishes = useAppSelector(userCards);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getAllDishes = useCallback( async () => {
    await dispatch(getDishes());

  }, [dispatch]);

  useEffect(() => {
    void getAllDishes();
  }, [getAllDishes]);

  const totalPrise = cardWithDishes.reduce((acc, order) => {
    acc = acc + order.orderDish.price * order.amount;
    return acc;
  }, 0);

  const openTheModalWindow = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    navigate('/');
  };

  const sendOrder = async () => {
    console.log('Отправка заказов на сервер!');
    const userOrder = cardWithDishes.map((order) => {
      return {
        [order.orderDish.id] : order.amount,
      };
    });

    // await dispatch(createOrder(userOrder));

    console.log(userOrder);

    closeModal();
  };

  return (
    <Container>
      <ModalWindow showModal={openModal} closeModal={closeModal} sendOrder={sendOrder}/>
      <Box sx={{margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap'}}>
        <Typography sx={{fontSize: '25px'}}><b>Order total: </b> {totalPrise} KGS</Typography>
        <Button variant="contained" size="large" onClick={openTheModalWindow} >
          Checkout
        </Button>
      </Box>
      <hr/>
      <DishCards dishes={dishes}/>
    </Container>
  );
};

export default Home;