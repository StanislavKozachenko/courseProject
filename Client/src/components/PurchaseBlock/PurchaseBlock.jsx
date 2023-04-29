import React from 'react';
import styles from './PurchaseBlock.module.scss';
import axios from 'axios';
import validator from 'validator';
import { useRef } from 'react';
export default function PurchaseBlock({ order, setOrderId }) {
  const cartNumberRef = useRef();
  const cartCVVRef = useRef();

  function purchaseHandler(order) {
    if (validator.isCreditCard(cartNumberRef.current.value) && cartCVVRef.current.value !== '') {
      const resp = {
        id: parseInt(order.id),
        code: 200,
        total: parseFloat(order.total),
        createdAt: order.createdAt,
        userId: parseInt(order.userId),
      };
      axios
        .put(`http://localhost:8080/orders/${order.id}`, JSON.stringify(resp), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => console.log(data))
        .then(() => alert('Успешно!'))
        .then(() => setOrderId(0));
    } else {
      alert('Ошибочные данные!');
    }
  }
  return (
    <>
      <div className="auth">
        <h2 className="auth__text">Заказ №{order.id}</h2>
        <input
          ref={cartNumberRef}
          type="number"
          placeholder="Номер карты"
          className="auth__input"
          name="number"
        />
        <input
          type="password"
          placeholder="CVV"
          className="auth__input"
          name="cvv"
          maxLength={3}
          ref={cartCVVRef}
          minLength={3}
        />
        <button className="auth__buttons--btn" onClick={() => purchaseHandler(order)}>
          Оплатить
        </button>
      </div>
    </>
  );
}
