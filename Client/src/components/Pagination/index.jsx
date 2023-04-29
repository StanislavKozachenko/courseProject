import React from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import styles from './Pagination.module.scss';
export default function Pagination({ currentPage, onChangePage }) {
  const { items, status } = useSelector((state) => state.books);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      forcePage={currentPage - 1}
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={8}
      pageCount={4}
      renderOnZeroPageCount={null}
    />
  );
}
