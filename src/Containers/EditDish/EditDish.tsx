import DishForm from '../../Components/DishForm/DishForm.tsx';
import { IFormDish } from '../../types';

const EditDish = () => {


  const onSubmitDish = (dish: IFormDish) => {
    console.log(dish);
  };

  return (
    <div>
      <h1>Edit Dish</h1>
      <DishForm onSubmitDish={onSubmitDish} />
    </div>
  );
};

export default EditDish;