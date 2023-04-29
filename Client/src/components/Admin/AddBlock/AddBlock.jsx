import React, { useContext, useState } from 'react';
import { AdminContext } from '../../../pages/Admin';
import styles from './AddBlock.module.scss';
import axios from 'axios';

export default function AddBlock() {
  const { authors, publishers } = useContext(AdminContext);
  const [isCorrect, setIsCorrect] = useState(true);
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
    let result = false;
    if (document.getElementById(name).value) {
      result = document.getElementById(name).value;
    } else {
      alert('Данные неверны.');
      setIsCorrect(false);
    }
    return result;
  }
  function onAddHandler(event) {
    if (isCorrect) {
      event.preventDefault();
      const publisherId = getPublisherId(document.getElementById('publisher').value);
      const authorId = getAuthorId(document.getElementById('author').value);
      const category = getCategoryId(document.getElementById('category').value);
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
        .post(`http://localhost:8080/books/add`, JSON.stringify(resp), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => console.log(data));
    }
  }
  return (
    <>
      <div className={styles.main}>
        <table className={styles.show} cellSpacing="12">
          <tbody>
            <tr className={styles.list}>
              <th>Название</th>
              <th>Цена</th>
              <th>Категория</th>
              <th>URL картинки</th>
              <th>Размеры</th>
              <th>Год публикации</th>
              <th>Тип переплёта</th>
              <th>Рейтинг</th>
              <th>Автор</th>
              <th>Издательство</th>
            </tr>
            <tr className={styles.book}>
              <td>
                <input
                  className={styles.input}
                  name="title"
                  placeholder="Название..."
                  id={'title'}></input>
              </td>
              <td>
                <input
                  className={styles.input}
                  name="price"
                  placeholder="Цена..."
                  id={'price'}></input>
              </td>
              <td>
                <select className={styles.input} name="category" id={'category'}>
                  <option>{categoryTypes[0]}</option>
                  {categoryTypes.map((obj) =>
                    obj !== categoryTypes[0] ? <option key={obj.id}>{obj}</option> : '',
                  )}
                </select>
              </td>
              <td>
                <input
                  className={styles.input}
                  name="imageUrl"
                  placeholder="Путь к картинке..."
                  id={'imageUrl'}></input>
              </td>
              <td>
                <input
                  id={'sizes'}
                  className={styles.input}
                  name="sizes"
                  placeholder="Размеры..."></input>
              </td>
              <td>
                <input
                  className={styles.input}
                  name="publicationYear"
                  placeholder="Год публикации..."
                  id={'publicationYear'}></input>
              </td>
              <td>
                <input
                  id={'types'}
                  className={styles.input}
                  name="types"
                  placeholder="Тип переплёта..."></input>
              </td>
              <td>
                <input
                  className={styles.input}
                  name="rating"
                  placeholder="Рейтинг..."
                  id={'rating'}></input>
              </td>
              <td>
                <select className={styles.input} name="author" id={'author'}>
                  <option>{authors[0].firstName + ' ' + authors[0].lastName}</option>
                  {authors.map((obj) =>
                    obj !== authors[0] ? (
                      <option key={obj.id}>{obj.firstName + ' ' + obj.lastName}</option>
                    ) : (
                      ''
                    ),
                  )}
                </select>
              </td>
              <td>
                <select className={styles.input} name="publisher" id={'publisher'}>
                  <option>{publishers[0].name + ' ' + publishers[0].country}</option>
                  {publishers.map((obj) =>
                    obj !== publishers[0] ? (
                      <option key={obj.id}>{obj.name + ' ' + obj.country}</option>
                    ) : (
                      ''
                    ),
                  )}
                </select>
              </td>
              <td>
                <button type="submit" className={styles.saveBtn} id={'save'} onClick={onAddHandler}>
                  Добавить
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
