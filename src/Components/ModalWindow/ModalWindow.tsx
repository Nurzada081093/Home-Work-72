import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import React, { MouseEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { dishCardToDelete, userCards } from '../../store/Slices/userCartDishSlices.ts';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import IconButton from '@mui/joy/IconButton';

interface Props {
  showModal: boolean;
  closeModal: MouseEventHandler;
  sendOrder: MouseEventHandler;
}

const ModalWindow: React.FC<Props> = ({showModal, closeModal, sendOrder}) => {
  const cardWithDishes = useAppSelector(userCards);
  const dispatch = useAppDispatch();

  const totalPrise = cardWithDishes.reduce((acc, dish) => {
    acc = acc + dish.cardDish.price * dish.amount;
    return acc;
  }, 150);

  return (
    <Modal open={showModal} onClose={closeModal}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}
      >
        <Box sx={{marginBottom: '10px'}}>
          <ModalClose />
        </Box>
        <Typography sx={{fontSize: '25px', fontWeight: '600', textAlign: 'center', marginBottom: '10px'}}>Your order:</Typography>
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{width: '380px', padding: '0 20px'}}>
            {cardWithDishes.length !== 0 ?
              cardWithDishes.map(dish => (
              <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={dish.cardDish.id}>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '50%'}}>
                  <Typography level="title-md">{dish.cardDish.title}</Typography>
                  <Typography level="title-md"> x {dish.amount}</Typography>
                </Box>
                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <Typography sx={{marginRight: '10px'}}><b>{dish.cardDish.price} KGS</b></Typography>
                  <IconButton
                    color="neutral"
                    size="sm"
                    onClick={() => dispatch(dishCardToDelete(dish.cardDish))}
                  >
                    <RiDeleteBin5Fill />
                  </IconButton>
                </Box>
              </Box>
            )) :
              <Typography sx={{fontSize: '20px', fontStyle: 'italic', textAlign: 'center', marginBottom: '10px'}}>This order cart is empty!</Typography>
            }
            <hr/>
            <Box sx={{margin: '20px 0'}}>
              <Typography sx={{fontSize: '16px', marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>Delivery: <b>150 KGS</b></Typography>
              <Typography sx={{fontSize: '16px', marginBottom: '10px', width: '100%', display: 'flex', justifyContent: 'space-between'}}>Total: <b>{totalPrise} KGS</b></Typography>
            </Box>
            <Box
              sx={{
                mt: 1,
                display: 'flex',
                justifyContent: 'space-around',
                gap: 1
              }}
            >
              <Button variant="solid" color="primary" sx={{width: '110px'}} onClick={sendOrder}>
                Order
              </Button>
              <Button
                sx={{width: '110px'}}
                variant="solid"
                color="danger"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </ModalDialog>
    </Modal>
  );
};

export default ModalWindow;