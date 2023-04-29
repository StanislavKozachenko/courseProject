import React, { useContext } from 'react';
import styles from './ShowBookItem.module.scss';
import { AdminContext } from '../../../pages/Admin';

export default function ShowBookItem({
  id,
  title,
  price,
  category,
  imageUrl,
  sizes,
  types,
  publicationYear,
  rating,
  publisherId,
  authorId,
}) {
  const { authors, publishers } = useContext(AdminContext);

  const bookTypes = ['твёрдый', 'мягкий'];
  const categoryTypes = [
    'все',
    'психология',
    'бестеллеры',
    'биография',
    'бизнес',
    'художественная',
  ];

  types = types.split(',');
  sizes = sizes.split(',');
  return (
    <>
      <tr className={styles.book}>
        <td>
          <input className={styles.input} name="value" value={id}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={title}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={price.toFixed(2)}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={categoryTypes[category]}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={imageUrl}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={sizes.map((size, index) => size)}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={publicationYear}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={types.map((type, index) => bookTypes[type])}></input>
        </td>
        <td>
          <input className={styles.input} name="value" value={rating}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={authors[authorId - 1].firstName + ' ' + authors[authorId - 1].lastName}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="value"
            value={
              publishers[publisherId - 1].name + ' ' + publishers[publisherId - 1].country
            }></input>
        </td>
      </tr>
    </>
  );
}
