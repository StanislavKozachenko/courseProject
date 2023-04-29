import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../Redux/slices/cartSlice';

const bookTypes = ['твёрдый', 'мягкий'];

export default function BookBlock({ id, title, price, imageUrl, sizes, types }) {
  types = types.split(',');
  sizes = sizes.split(',');

  const dispath = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.id === id));
  const addedCount = cartItem ? cartItem.count : 0;
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: bookTypes[activeType],
      size: sizes[activeSize],
    };
    dispath(addItem(item));
  };

  return (
    <div className="book-block">
      <img className="book-block__image" src={imageUrl} alt="book" />
      <h4 className="book-block__title">{title}</h4>
      <div className="book-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveType(index)}
              className={activeType === index ? 'active' : ''}>
              {bookTypes[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((obj, index) => (
            <li
              key={obj.imageUrl}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}>
              {obj} мм.
            </li>
          ))}
        </ul>
      </div>
      <div className="book-block__bottom">
        <div className="book-block__price">от {price} руб.</div>
        <button onClick={onClickAdd} className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {addedCount === 0 ? '' : <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
}
