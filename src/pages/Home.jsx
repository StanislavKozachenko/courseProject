import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '.././components/Categories';
import Sort from '.././components/Sort';
import BookBlock from '.././components/BookBlock';
import { useEffect, useContext } from 'react';
import Skeleton from '.././components/BookBlock/Skeleton';
import Pagination from '.././components/Pagination';
import { sortList } from '.././components/Sort';
import { SearchContext } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../Redux/slices/filterSlice';
import { useRef } from 'react';
import { fetchBooks } from '../Redux/slices/booksSlice';

export default function Home() {
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const { items, status } = useSelector((state) => state.books);
  const sortType = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const onClickCategory = (i) => {
    dispatch(setCategoryId(i));
  };
  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };
  const getBooks = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchBooks({ currentPage, categoryId, sortType, search }));
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sort === params.sortProperty);
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, [categoryId, sortType.sort, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        {
          sortProperty: sortType.sort,
          categoryId,
          currentPage,
        },
        { addQueryPrefix: true },
      );
      navigate(`${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType.sort, searchValue, currentPage]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => onClickCategory(i)} />
        <Sort />
      </div>
      <h2 className="content__title">Все книги</h2>
      {status === 'error' ? (
        <div>
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            Не удалось получить книги
            <br />
            Для того, чтобы заказать книгу, перейди на главную страницу.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'loading'
            ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
            : items.map((obj) => <BookBlock key={obj.id} {...obj} />)}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
