import React from 'react';
import { Link } from 'react-router-dom';
import imageUrl from '../assets/img/empty-cart.png';

export default function CartEmpty() {
  return (
    <div class="content">
      <div class="container container--cart">
        <div class="cart cart--empty">
          <h2>
            Корзина пустая <icon>😕</icon>
          </h2>
          <p>
            Вероятней всего, вы не заказывали ещё книгу.
            <br />
            Для того, чтобы заказать книгу, перейди на главную страницу.
          </p>
          <img src={imageUrl} alt="Empty cart" />
          <Link to="/" class="button button--black">
            <span>Вернуться назад</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
