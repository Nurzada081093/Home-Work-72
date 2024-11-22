import { ColorPaletteProp } from '@mui/joy/styles';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import { useCallback, useEffect, useState } from 'react';
import { Container } from '@mui/joy';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { userOrders } from '../../store/Slices/ordersSlices.ts';
import { getOrders } from '../../store/Thunks/ordersThunks.ts';

const ToolBar = () => {
  const [color, setColor] = useState<ColorPaletteProp>('primary');
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orders = useAppSelector(userOrders);

  const getAllOrders = useCallback(async () => {
    await dispatch(getOrders());
  },[dispatch]);

  useEffect(() => {
    void getAllOrders();
  }, [getAllOrders]);

  return (
    <Sheet
      variant="solid"
      color={color}
      invertedColors
      sx={[
        {
          p: 3,
          minWidth: 'min-content',
        },
        color !== 'warning' &&
        ((theme) => ({
          background: `linear-gradient(to top, ${theme.vars.palette[color][600]}, ${theme.vars.palette[color][500]})`,
        })),
      ]}
    >
      <Container sx={[
        {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
        },
      ]}>
        <IconButton
          variant="soft"
          size="sm"
          onClick={() => {
            const colors: ColorPaletteProp[] = [
              'primary',
              'neutral',
              'danger',
              'success',
              'warning',
            ];
            const nextColorIndex = colors.indexOf(color) + 1;
            setColor(colors[nextColorIndex] ?? colors[0]);
          }}
        >
          <ColorLensRoundedIcon fontSize="small"/>
        </IconButton>
        <Box sx={{flex: 1, display: 'flex', gap: 1, px: 2}}>
          <Dropdown>
            <NavLink to={'/'} style={{
              textDecoration: 'none',
              color: 'white',
              fontSize: '30px',
              fontStyle: 'italic',
              fontWeight: '600'
            }}>
              {location.pathname !== '/' ? 'Turtle Pizza Admin' : 'Turtle Pizza'}
            </NavLink>
          </Dropdown>
        </Box>
        {location.pathname !== '/' ?
          <Box sx={{display: 'flex', flexShrink: 0, gap: 2, alignItems: 'center'}}>
          <NavLink to={'/admin/dishes'} style={{color: 'white', fontSize: '20px', textDecoration: 'none'}}>Dishes</NavLink>
          <NavLink to={'admin/orders'}  style={{color: 'white', fontSize: '20px', textDecoration: 'none'}}>Orders</NavLink>
          <Badge badgeContent={orders.length} variant="solid" color="danger" to={'/admin/orders'} component={NavLink}>
            <IconButton variant="soft" sx={{borderRadius: '50%'}}>
              <NotificationsIcon/>
            </IconButton>
          </Badge>
        </Box>
        : null}
      </Container>
    </Sheet>
  );
};

export default ToolBar;