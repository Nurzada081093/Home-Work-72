import { Container } from '@mui/joy';
import DishForm from '../../Components/DishForm/DishForm.tsx';
import { IFormDish } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { createDish } from '../../store/Thunks/dishesThunk.ts';
import { toast } from 'react-toastify';

const AddNewDish = () => {
  const dispatch = useAppDispatch();

  const onSubmitDish = async (dish: IFormDish) => {
    await dispatch(createDish(dish));
    toast.success(`${dish.title} has been added successfully!`);
  };

  return (
    <Container>
      <DishForm onSubmitDish={onSubmitDish}/>
    </Container>
  );
};

export default AddNewDish;