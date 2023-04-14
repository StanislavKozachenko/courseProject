import React from 'react';
import styles from './ShowTransactionsItem.module.scss';
export default function ShowTransactionsItem({ id, orderId, createdAt, userId }) {
  return (
    <>
      <tr className={styles.transaction}>
        <td>
          <input className={styles.input} name="value" value={id}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={orderId}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={createdAt}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={userId}></input>
        </td>
      </tr>
    </>
  );
}
