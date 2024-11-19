import DishForm from '../../Components/DishForm/DishForm.tsx';

const EditDish = () => {
  const onSubmitDish = () => {};

  return (
    <div>
      <h1>Edit Dish</h1>
      <DishForm onSubmitDish={onSubmitDish} />
    </div>
  );
};

export default EditDish;