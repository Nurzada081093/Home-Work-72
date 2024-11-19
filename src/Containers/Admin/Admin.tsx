import { NavLink } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import { Button, Container } from '@mui/joy';
import { Typography } from '@mui/material';


const Admin = () => {
  // const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
        <Typography variant="h3">Dishes</Typography>
        <Button to={'/admin/addNewDish'} component={NavLink} startDecorator={<AddIcon/>}>
          Add new Dish
        </Button>
      </Box>
      Все блюда!
    </Container>
  );
};

export default Admin;