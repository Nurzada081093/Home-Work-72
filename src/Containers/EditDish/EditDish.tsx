import DishForm from '../../Components/DishForm/DishForm.tsx';
import { IFormDish } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { editDish, getOneDish } from '../../store/Thunks/dishesThunk.ts';
import { oneDish } from '../../store/Slices/dishesSlice.ts';
import { toast } from 'react-toastify';

const EditDish = () => {
  const dish = useAppSelector(oneDish);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const getDish = useCallback( async () => {
    if (id) {
      await dispatch(getOneDish(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    void getDish();
  }, [getDish]);

  const onSubmitDish = async (dish: IFormDish) => {
    if (id) {
      await dispatch(editDish({id, dish}));
      toast.success(`${dish.title} has been successfully edited!`);
      navigate('/admin/dishes');
    }
  };

  return (
    <div>
      {dish && <DishForm onSubmitDish={onSubmitDish} dishInitial={dish} editDish/>}
    </div>
  );
};

export default EditDish;