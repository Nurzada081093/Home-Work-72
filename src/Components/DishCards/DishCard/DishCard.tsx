import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import { IDish } from '../../../types';
import React from 'react';
import { useAppDispatch } from '../../../app/hooks.ts';
import { dishCardToAdd } from '../../../store/Slices/userCartDishSlices.ts';
import { Button } from '@mui/joy';

interface Props {
  dish: IDish;
}

const DishCard: React.FC<Props> = ({dish}) => {
  const image = "https://jkdigisol.com/wp-content/uploads/2023/08/how-to-find-and-fix-404-errors-in-wordpress.png.webp";
  const dispatch = useAppDispatch();

  return (
    <>
      <Card variant="outlined" sx={{width: '280px', margin: '20px 5px', textAlign: 'center'}} onClick={() => dispatch(dishCardToAdd(dish))}>
        <img style={{width: '100%', height: '150px'}} src={dish.image ? dish.image : image} alt={dish.title}/>
        <Typography sx={{width: '95%', fontSize: '25px', fontWeight: '600'}}>{dish.title}</Typography>
        <Button sx={{backgroundColor: '#3949ab', fontSize: '18px'}}>{dish.price} KGS</Button>
      </Card>
    </>
  );
};

export default DishCard;