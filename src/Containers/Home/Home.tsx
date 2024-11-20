import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allDishes } from '../../store/Slices/dishesSlice.ts';
import { useCallback, useEffect } from 'react';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import { Container } from '@mui/joy';
import DishCards from '../../Components/DishCards/DishCards.tsx';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';


const Home = () => {
  const dishes = useAppSelector(allDishes);
  const dispatch = useAppDispatch();

  const getAllDishes = useCallback( async () => {
    await dispatch(getDishes());

  }, [dispatch]);

  useEffect(() => {
    void getAllDishes();
  }, [getAllDishes]);

  console.log(dishes);

  return (
    <Container>
      <Box sx={{margin: '20px 0'}}>
        <Typography><b>Order total: </b> {0} KGS</Typography>
      </Box>
      <hr/>
      <DishCards dishes={dishes}/>
    </Container>
  );
};

export default Home;