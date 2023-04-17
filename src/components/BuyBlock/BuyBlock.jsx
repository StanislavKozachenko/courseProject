import React, { useEffect, useState } from 'react';
import styles from './BuyBlock.module.scss';
import Cookies from 'universal-cookie';
import AuthPage from '../../pages/Auth';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function BuyBlock({ items, totalPrice, setIsBuying, isBuying }) {
  const cookies = new Cookies();
  const bookTypes = ['твёрдый', 'мягкий'];
  const categoryTypes = [
    'все',
    'психология',
    'бестеллеры',
    'биография',
    'бизнес',
    'художественная',
  ];
  const [id, setId] = useState(false);
  useEffect(() => {
    let value = cookies.get('user');
    if (value) {
      setId(true);
    }
  }, []);
  const resp = {
    userId: parseInt(cookies.get('user').split(' ')[4]),
    total: totalPrice,
    code: 203,
  };
  function buy() {
    let orderItemResp;
    let transactionResp;
    let orderIdValue;
    axios
      .post(`http://localhost:8080/orders/add`, JSON.stringify(resp), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => {
        items.forEach((item) => {
          orderIdValue = data.data.id;
          orderItemResp = {
            bookId: item.id,
            orderId: data.data.id,
          };
          axios
            .post(`http://localhost:8080/orderItems/add`, JSON.stringify(orderItemResp), {
              headers: {
                'Content-Type': 'application/json',
              },
            })
            .then(() => {
              transactionResp = {
                orderId: orderIdValue,
                userId: parseInt(cookies.get('user').split(' ')[4]),
              };
              axios
                .post(`http://localhost:8080/transactions/add`, JSON.stringify(transactionResp), {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                })
                .then((data) => console.log(data));
            });
        });
      })
      .then(() => alert('Заказ оформлен успешно!'));
    setIsBuying(false);
  }
  return (
    <div className="container">
      {id ? (
        <div>
          <h3>Для подтверждения нажмте на кнопку</h3>
          <div class="cart__bottom-buttons" onClick={() => buy()}>
            <button className="button button--outline button--add">Подтвердить заказ</button>
          </div>
        </div>
      ) : (
        <div>
          Необходима авторизация!
          <div class="cart__bottom-buttons">
            <Link to="/auth" className="button button--outline button--add">
              <span>Войти</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
