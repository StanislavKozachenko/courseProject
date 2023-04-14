import React, { useContext } from 'react';
import styles from './EditBlockItem.module.scss';
import { AdminContext } from '../../../pages/Admin';
import axios from 'axios';
export default function EditBlockItem({
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
  const categoryTypes = [
    'все',
    'психология',
    'бестеллеры',
    'биография',
    'бизнес',
    'художественная',
  ];
  function getPublisherId(info) {
    let result;
    publishers.forEach((el) => {
      if (info === el.name + ' ' + el.country) {
        result = el.id;
      }
    });
    return result;
  }
  function getAuthorId(info) {
    let result;
    authors.forEach((el) => {
      if (info === el.firstName + ' ' + el.lastName) {
        result = el.id;
      }
    });
    return result;
  }
  function getCategoryId(info) {
    let result;
    let i = 0;
    categoryTypes.forEach((el) => {
      if (info === el) {
        result = i;
      }
      i++;
    });
    return result;
  }
  function getValue(name) {
    let result;
    if (document.getElementById(name + '-' + id).value) {
      result = document.getElementById(name + '-' + id).value;
    } else {
      result = document.getElementById(name + '-' + id).placeholder;
    }
    return result;
  }
  types = types.split(',');
  sizes = sizes.split(',');
  function onSaveHandler(event) {
    event.preventDefault();
    const id = event.target.id.split('-')[1];
    const publisherId = getPublisherId(document.getElementById('publisher-' + id).value);
    const authorId = getAuthorId(document.getElementById('author-' + id).value);
    const category = getCategoryId(document.getElementById('category-' + id).value);
    const title = getValue('title');
    const sizes = getValue('sizes');
    const publicationYear = getValue('publicationYear');
    const types = getValue('types');
    const imageUrl = getValue('imageUrl');
    const price = getValue('price');
    const rating = getValue('rating');
    const resp = {
      publisherId: publisherId,
      authorId: authorId,
      title: title,
      sizes: sizes,
      category: category,
      publicationYear: publicationYear,
      types: types,
      imageUrl: imageUrl,
      price: price,
      rating: rating,
    };
    axios
      .put(`http://localhost:8080/books/${id}`, JSON.stringify(resp), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((data) => console.log(data));
  }
  return (
    <>
      <tr className={styles.book}>
        <td>
          <input className={styles.input} name="id" value={id}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="title"
            placeholder={title}
            id={'title-' + id}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="price"
            placeholder={price}
            id={'price-' + id}></input>
        </td>
        <td>
          <select className={styles.input} name="category" id={'category-' + id}>
            <option>{categoryTypes[category]}</option>
            {categoryTypes.map((obj) =>
              obj !== categoryTypes[category] ? <option key={obj.id}>{obj}</option> : '',
            )}
          </select>
        </td>
        <td>
          <input
            className={styles.input}
            name="imageUrl"
            placeholder={imageUrl}
            id={'imageUrl-' + id}></input>
        </td>
        <td>
          <input
            id={'sizes-' + id}
            className={styles.input}
            name="sizes"
            placeholder={sizes.map((size, index) => size)}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="publicationYear"
            placeholder={publicationYear}
            id={'publicationYear-' + id}></input>
        </td>
        <td>
          <input
            id={'types-' + id}
            className={styles.input}
            name="types"
            placeholder={types.map((type, index) => type)}></input>
        </td>
        <td>
          <input
            className={styles.input}
            name="rating"
            placeholder={rating}
            id={'rating-' + id}></input>
        </td>
        <td>
          <select className={styles.input} name="author" id={'author-' + id}>
            <option>
              {authors[authorId - 1].firstName + ' ' + authors[authorId - 1].lastName}
            </option>
            {authors.map((obj) =>
              obj.id !== authorId ? (
                <option key={obj.id}>{obj.firstName + ' ' + obj.lastName}</option>
              ) : (
                ''
              ),
            )}
          </select>
        </td>
        <td>
          <select className={styles.input} name="publisher" id={'publisher-' + id}>
            <option>
              {publishers[publisherId - 1].name + ' ' + publishers[publisherId - 1].country}
            </option>
            {publishers.map((obj) =>
              obj.id !== publisherId ? (
                <option key={obj.id}>{obj.name + ' ' + obj.country}</option>
              ) : (
                ''
              ),
            )}
          </select>
        </td>
        <td>
          <button
            type="submit"
            className={styles.saveBtn}
            id={'save-' + id}
            onClick={onSaveHandler}>
            Сохранить
          </button>
        </td>
      </tr>
    </>
  );
}
