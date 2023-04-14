import React from 'react';
import styles from './PurchaseBlock.module.scss';
import axios from 'axios';
export default function PurchaseBlock({ order, setOrderId }) {
  function purchaseHandler(order) {
    const resp = {
      id: parseInt(order.id),
      code: 200,
      total: parseFloat(order.total),
      createdAt: order.createdAt,
      userId: parseInt(order.userId),
    };
    console.log(resp);
    axios
      .put(`http://localhost:8080/orders/${order.id}`, JSON.stringify(resp), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => console.log(data))
      .then(() => alert('Успешно!'))
      .then(() => setOrderId(0));
  }
  console.log(order);
  return (
    <>
      <div className="auth">
        <h2 className="auth__text">Заказ №{order.id}</h2>
        <input type="number" placeholder="Номер карты" className="auth__input" name="number" />
        <input
          type="password"
          placeholder="CVV"
          className="auth__input"
          name="cvv"
          maxLength={3}
          minLength={3}
        />{' '}
        <button className="auth__buttons--btn" onClick={() => purchaseHandler(order)}>
          Оплатить
        </button>
      </div>
    </>
  );
}
