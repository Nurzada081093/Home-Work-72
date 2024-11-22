import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import { Button, Container } from '@mui/joy';
import { Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { allDishes, getLoadingSlice } from '../../store/Slices/dishesSlice.ts';
import { useCallback, useEffect } from 'react';
import { getDishes } from '../../store/Thunks/dishesThunk.ts';
import Dishes from '../../Components/Dishes/Dishes.tsx';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Admin = () => {
  const dishes = useAppSelector(allDishes);
  const loading = useAppSelector(getLoadingSlice);
  const dispatch = useAppDispatch();

  const getAllDishes = useCallback( async () => {
    await dispatch(getDishes());

  }, [dispatch]);

  useEffect(() => {
    void getAllDishes();
  }, [getAllDishes]);

  return (
    <>
      {loading ? <Loader/> :
        <Container>
          <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', margin: '50px 0 20px'}}>
            <Typography variant="h3">Dishes</Typography>
            <Button to={'/admin/addNewDish'} component={NavLink} startDecorator={<AddIcon/>} sx={{fontSize: '18px'}}>
              Add new Dish
            </Button>
          </Box>
          {dishes.length !== 0 ? <Dishes dishes={dishes}/> :
            <Typography variant="h4" sx={{margin: '50px auto', textAlign: 'center', fontStyle: 'italic'}}>This list of dishes is empty!</Typography>
          }
        </Container>
      }
    </>
  );
};

export default Admin;