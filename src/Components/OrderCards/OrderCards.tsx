import OrderCard from './OrderCard/OrderCard.tsx';
import { IDishOrders } from '../../types';
import React from 'react';

interface Props {
  orders: IDishOrders[];
}

const OrderCards: React.FC<Props> = ({orders}) => {
  return (
    <>
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </>
  );
};

export default OrderCards;