import React, { useContext } from 'react';
import styles from './ShowOrders.module.scss';
import ShowOrdersItem from '../ShowOrdersItem/ShowOrdersItem';
import { UserContext } from '../../pages/User';
import PurchaseBlock from '../PurchaseBlock/PurchaseBlock';
export default function ShowOrders({ context }) {
  const { orders, ordersStatus, orderId, setOrderId } = useContext(context);
  return (
    <>
      {orderId === 0 ? (
        <div className={styles.main}>
          <table className={styles.show} cellSpacing="12">
            <tbody>
              <tr className={styles.list}>
                <th>Id</th>
                <th>Сумма</th>
                <th>Статус</th>
                <th>Дата</th>
                {context === UserContext ? '' : <th>Id пользователя</th>}
              </tr>
              {ordersStatus === 'loading'
                ? 'Loading...'
                : orders.map((obj) => (
                    <ShowOrdersItem
                      setOrderId={setOrderId}
                      context={context}
                      key={obj.id}
                      {...obj}
                    />
                  ))}
            </tbody>
          </table>
        </div>
      ) : (
        <PurchaseBlock
          setOrderId={setOrderId}
          order={orders.filter((order) => order.id === orderId)[0]}
        />
      )}
    </>
  );
}
