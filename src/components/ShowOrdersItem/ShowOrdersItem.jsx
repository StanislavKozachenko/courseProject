import React from 'react';
import styles from './ShowOrdersItem.module.scss';
import { UserContext } from '../../pages/User';
import { AdminContext } from '../../pages/Admin';
export default function ShowOrdersItem({
  id,
  total,
  code,
  orderDate,
  userId,
  context,
  setOrderId,
}) {
  function onBuyHandler(id) {
    setOrderId(id);
  }
  return (
    <>
      <tr className={styles.order}>
        <td>
          <input className={styles.input} name="value" value={id}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={total}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={code === 203 ? 'Не оплачено, код: ' + code : 'Оплачено, код: ' + code}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={orderDate}></input>
        </td>
        {context === UserContext && code === 203 ? (
          <button
            type="submit"
            className={styles.saveBtn}
            id={'buy-' + id}
            onClick={() => onBuyHandler(id)}>
            Оплатить
          </button>
        ) : context === AdminContext ? (
          <td>
            <input className={styles.input} name="value" value={userId}></input>
          </td>
        ) : (
          ''
        )}
      </tr>
    </>
  );
}
