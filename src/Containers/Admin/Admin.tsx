import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import { Button, Container } from '@mui/joy';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allDishes } from '../../store/Slices/dishesSlice.ts';
import { useCallback, useEffect } from 'react';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import Dishes from '../../Components/Dishes/Dishes.tsx';

const Admin = () => {
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
      <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '50px 0 20px'}}>
        <Typography variant="h3">Dishes</Typography>
        <Button to={'/admin/addNewDish'} component={NavLink} startDecorator={<AddIcon/>} sx={{fontSize: '18px'}}>
          Add new Dish
        </Button>
      </Box>
      <Dishes dishes={dishes}/>
    </Container>
  );
};

export default Admin;