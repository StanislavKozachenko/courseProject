import React, { useContext } from 'react';
import styles from './EditBlock.module.scss';
import { AdminContext } from '../../../pages/Admin';
import EditBlockItem from '../EditBlockItem/EditBlockItem';
export default function EditBlock() {
  const { books, booksStatus } = useContext(AdminContext);
  return (
    <>
      <div className={styles.main}>
        <table className={styles.show} cellSpacing="12">
          <tbody>
            <tr className={styles.list}>
              <th>ID</th>
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
            {booksStatus === 'loading'
              ? 'Loading...'
              : books.map((obj) => <EditBlockItem key={obj.id} {...obj} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}
