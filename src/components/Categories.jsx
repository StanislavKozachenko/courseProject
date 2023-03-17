import React from 'react';

export default function Categories({ value, onClickCategory }) {
  const categories = ['Все', 'Психология', 'Бестеллеры', 'Биография', 'Бизнес', 'Художественная'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, index) => (
          <li
            key={index}
            onClick={() => onClickCategory(index)}
            className={value === index ? 'active' : ''}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
}
