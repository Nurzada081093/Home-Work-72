import Box from '@mui/joy/Box';
import { IDish } from '../../types';
import Dish from './Dish/Dish.tsx';
import React from 'react';

interface Props {
  dishes: IDish[];
}

const Dishes: React.FC<Props> = ({dishes}) => {
  return (
    <Box sx={{marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexWrap: 'wrap'}}>
      {dishes.map(dish => (
        <Dish key={dish.id} dish={dish} />
      ))}
    </Box>
  );
};

export default Dishes;