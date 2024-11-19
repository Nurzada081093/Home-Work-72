import { Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { IFormDish } from '../../types';
import { toast } from 'react-toastify';

interface Props {
  onSubmitDish: (dish: IFormDish) => void;
}

const initialState = {
  title: '',
  price: 0,
  image: '',
};

const DishForm: React.FC<Props> = ({onSubmitDish}) => {
  const [newDish, setNewDish] = useState<IFormDish>(initialState);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setNewDish((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newDish.title.trim().length === 0 || newDish.image.trim().length === 0 || newDish.price <= 0) {
      toast.error('If you want to add a new dish, please fill out all fields!');
      toast.error('The price of the dish should be more than 0!');
    } else {
      onSubmitDish({
        ...newDish,
        price: Number(newDish.price),
      });
    }

    setNewDish(initialState);
  };

  return (
    <form onSubmit={onSubmit} style={{
      border: '1px solid lightgrey',
      width: '50%',
      margin: '0 auto 70px',
      padding: '50px 0',
      borderRadius: '20px',
      backgroundColor: 'white',
      marginTop: '30px'
    }}>
      <Typography variant="h4" sx={{flexGrow: 1, textAlign: 'center', marginBottom: '20px'}}>
        {/*{isEdit ? 'Edit ' : 'Add new '} */}
        dish
      </Typography>
      <Grid container spacing={2} sx={{mx: 'auto', width: '80%'}}>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Title"
            name="title"
            variant="outlined"
            value={newDish.title}
            onChange={onChange}
            type="text"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Price"
            name="price"
            variant="outlined"
            value={newDish.price}
            onChange={onChange}
            type="number"
          />
        </Grid>
        <Grid size={12}>
          <TextField
            sx={{width: '100%'}}
            id="outlined-basic"
            label="Image"
            name="image"
            variant="outlined"
            value={newDish.image}
            onChange={onChange}
            type="url"
          />
        </Grid>
        <Grid size={12}>
          <Button
            // disabled={createLoading || editLoader}
            sx={{width: '100%'}} variant="contained"
                  type="submit">
            Save
            {/*{createLoading || editLoader ? <ButtonSpinner/> : null}*/}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default DishForm;