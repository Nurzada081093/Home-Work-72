import DishForm from '../../Components/DishForm/DishForm.tsx';
import { Container } from '@mui/joy';

const AddNewDish = () => {
  return (
    <Container>
      <h1>Add new dish</h1>
      <DishForm/>
    </Container>
  );
};

export default AddNewDish;