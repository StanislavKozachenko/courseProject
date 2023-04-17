import React from 'react';
import styles from './CaluclateProfit.module.scss';
import { AdminContext } from '../../../pages/Admin';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
export default function CalculateProfit() {
  const { orders, ordersStatus } = useContext(AdminContext);
  const [profit, setProfit] = useState(0);
  const calculateProfit = () => {
    let profitLocal = 0;
    if (ordersStatus === 'success') {
      orders.forEach((order) => {
        if (order.orderDate.split('T')[0].split('-')[1] == new Date().getMonth() + 1) {
          profitLocal += order.total;
        }
      });
    }
    setProfit(profitLocal.toFixed(2));
  };
  useEffect(() => {
    calculateProfit();
  }, [profit]);
  return (
    <>
      <h3>Прибыль за текущий месяц: {profit} руб.</h3>
    </>
  );
}
