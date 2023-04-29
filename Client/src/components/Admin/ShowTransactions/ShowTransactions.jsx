import React, { useContext, useState } from 'react';
import styles from './ShowTransactions.module.scss';
import ShowTransactionsItem from '../ShowTransactionsItem.jsx/ShowTransactionsItem';
import { AdminContext } from '../../../pages/Admin';
export default function ShowTransactions() {
  const { transactions, transactionsStatus } = useContext(AdminContext);
  return (
    <>
      <div className={styles.main}>
        <table className={styles.show} cellSpacing="12">
          <tbody>
            <tr className={styles.list}>
              <th>Id транзакции</th>
              <th>Id заказа</th>
              <th>Дата заказа</th>
              <th>Id пользователя</th>
            </tr>
            {transactionsStatus === 'loading'
              ? 'Loading...'
              : transactions.map((obj) => <ShowTransactionsItem key={obj.id} {...obj} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
