import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDish, IDishCart } from '../../types';
import { RootState } from '../../app/store.ts';

interface UserCartDishState {
  cards: IDishCart[];
}

const initialState: UserCartDishState = {
  cards: [],
};

export const userCards = (state: RootState) => state.cards.cards;

const userCartDishSlice = createSlice({
  name: 'cardsDish',
  initialState,
  reducers: {
    dishCardToAdd: (state, {payload: cardDish}: PayloadAction<IDish>) => {
      const indexDish = state.cards.findIndex((card) => card.cardDish.id === cardDish.id);
      if (indexDish === -1) {
        state.cards = [...state.cards, {cardDish, amount: 1}];
      } else {
        const initialCards = [...state.cards];
        const initialCard = {...initialCards[indexDish]};
        initialCard.amount++;
        initialCards[indexDish] = initialCard;
        state.cards = [...initialCards];
      }
    },
    dishCardToDelete: (state, {payload: cardDish}: PayloadAction<IDish>) => {
      const indexDish = state.cards.findIndex((card) => card.cardDish.id === cardDish.id);
      if (indexDish === -1) {
        state.cards = [...state.cards, {cardDish, amount: 1}];
      } else {
        const initialCards = [...state.cards];
        const initialCard = {...initialCards[indexDish]};
        if (initialCard.amount > 0) {
          initialCard.amount--;
        } else {
          initialCard.amount = 0;
        }
        initialCards[indexDish] = initialCard;
        state.cards = [...initialCards];
      }
    },
  }
});

export const cardsDishReducer = userCartDishSlice.reducer;
export const {dishCardToAdd, dishCardToDelete} = userCartDishSlice.actions;
