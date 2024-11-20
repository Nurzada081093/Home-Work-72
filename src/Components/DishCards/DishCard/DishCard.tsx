import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { IDish } from '../../../types';
import React from 'react';
import Box from '@mui/joy/Box';

interface Props {
  dish: IDish;
}

const DishCard: React.FC<Props> = ({dish}) => {
  return (
    <Card variant="outlined" sx={{width: '60%', margin: '20px auto'}}>
      <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
        <img style={{width: '200px', height: '120px'}} src={dish.image} alt={dish.title}/>
        <Box sx={{marginTop: '10px', width: '55%', display: 'flex', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between', marginLeft: '30px'}}>
          <Typography sx={{fontSize: '20px', fontWeight: '600'}}>{dish.title}</Typography>
          <Typography>{dish.price} KGS</Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default DishCard;