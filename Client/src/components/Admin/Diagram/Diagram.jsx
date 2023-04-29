import React from 'react';
import styles from './Diagram.module.scss';
import { PieChart } from 'react-minimal-pie-chart';
import { useContext } from 'react';
import { AdminContext } from '../../../pages/Admin';
export default function Diagram() {
  const { orders, ordersStatus } = useContext(AdminContext);
  let buyed = 0;
  let waited = 0;
  orders.forEach((order) => {
    order.code === 200 ? (buyed += 1) : (waited += 1);
  });
  return (
    <div className={styles.main}>
      <h3 className={styles.header}>Процент оплаченных заказов</h3>
      <div>
        <PieChart
          data={[
            { title: `Оплачено: ${buyed}`, value: buyed, color: '#E38627' },
            { title: `Не оплачено: ${waited}`, value: waited, color: '#C13C37' },
          ]}
          animationDuration={500}
          animationEasing="ease-out"
          center={[50, 50]}
          lengthAngle={360}
          lineWidth={20}
          paddingAngle={0}
          radius={50}
          rounded
          startAngle={0}
          viewBoxSize={[100, 100]}
          label={(data) => data.dataEntry.title}
          labelPosition={35}
          labelStyle={{
            fontSize: '6px',
            fontWeight: '400',
          }}
        />
      </div>
    </div>
  );
}
