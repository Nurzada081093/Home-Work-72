import { Typography } from '@mui/material';
import Layout from './Components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Admin from './Containers/Admin/Admin.tsx';
import Orders from './Containers/Orders/Orders.tsx';
import AddNewDish from './Containers/AddNewDish/AddNewDish.tsx';
import EditDish from './Containers/EditDish/EditDish.tsx';

const App = () => {

  return (
    <Layout>
      <Routes>
        <Route path="/admin" element={<Admin/>}></Route>
        <Route path="/admin/dishes" element={<Admin/>}></Route>
        <Route path="/admin/orders" element={<Orders/>}></Route>
        <Route path="/admin/addNewDish" element={<AddNewDish/>}></Route>
        <Route path="/admin/:id/editDish" element={<EditDish/>}></Route>
        <Route path="*" element={<Typography variant="h1">Not found</Typography>} ></Route>
      </Routes>
    </Layout>
  );
};

export default App;
