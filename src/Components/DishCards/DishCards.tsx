import Box from '@mui/joy/Box';
import { IDish } from '../../types';
import DishCard from './DishCard/DishCard.tsx';
import React from 'react';

interface Props {
  dishes: IDish[];
}

const DishCards: React.FC<Props> = ({dishes}) => {
  return (
    <Box sx={{margin: '10px'}}>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish}/>
      ))}
    </Box>
  );
};

export default DishCards;