import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { IDish } from '../../../types';
import React from 'react';
import Box from '@mui/joy/Box';
import { Button } from '@mui/joy';
import { RiDeleteBin6Fill } from '@react-icons/all-files/ri/RiDeleteBin6Fill';
import { useNavigate } from 'react-router-dom';
import { FiEdit2 } from 'react-icons/fi';
import { useAppDispatch } from '../../../app/hooks.ts';
import { deleteDish, getDishes } from '../../../store/Thunks/dishesThunk.ts';
import { toast } from 'react-toastify';

interface Props {
  dish: IDish;
}

const Dish: React.FC<Props> = ({dish}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const deleteTheDish = async (id:string) => {
    await dispatch(deleteDish(id));
    toast.success(`${dish.title} has been successfully deleted!`);
    await dispatch(getDishes());
  };

  return (
    <Card variant="outlined" sx={{ width: 320, margin: '20px 5px'}}>
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src={dish.image}
            srcSet={dish.image}
            loading="lazy"
            alt={dish.title}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
          <Typography sx={{fontSize: '20px', fontWeight: '600'}}>{dish.title}</Typography>
          <Typography sx={{fontSize: '18px'}}>{dish.price} KGS</Typography>
        </Box>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Box
            sx={{
              mt: 1,
              mb:1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              gap: 1,
              width: '100%'
            }}
          >
            <Button variant="solid" startDecorator={<FiEdit2 />} color="primary" sx={{width: '100px'}}  onClick={() => navigate(`/admin/${dish.id}/editDish`)}>
              Edit
            </Button>
            <Button
              // disabled={deleteLoader}
              variant="solid"
              color="danger"
              startDecorator={<RiDeleteBin6Fill />}
              onClick={() => deleteTheDish(dish.id)}
            >
              Delete
              {/*{deleteLoader ? <DeleteButtonSpinner/> : null}*/}
            </Button>
          </Box>
        </CardContent>
      </CardOverflow>
    </Card>
  );
};

export default Dish;