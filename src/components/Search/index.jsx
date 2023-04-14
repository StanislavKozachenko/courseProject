import React, { useRef } from 'react';
import { useContext } from 'react';
import debounce from 'lodash.debounce';
import { SearchContext } from '../../App';
import styles from './Search.module.scss';
import { useCallback } from 'react';
import { useState } from 'react';
export default function Search() {
  const [value, setValue] = useState();
  const { searchValue, setSearchValue } = useContext(SearchContext);
  const inputRef = useRef();
  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  };
  const updateSearchValue = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 500),
    [],
  );
  const onChangeInput = (event) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск книги..."
      />
      {searchValue && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          enableBackground="new 0 0 32 32"
          height="32px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 32 32"
          width="32px">
          <g>
            <polyline
              fill="none"
              points="   649,137.999 675,137.999 675,155.999 661,155.999  "
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <polyline
              fill="none"
              points="   653,155.999 649,155.999 649,141.999  "
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
            <polyline
              fill="none"
              points="   661,156 653,162 653,156  "
              stroke="#FFFFFF"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit="10"
              strokeWidth="2"
            />
          </g>
          <g>
            <path d="M11.312,12.766c0.194,0.195,0.449,0.292,0.704,0.292c0.255,0,0.51-0.097,0.704-0.292c0.389-0.389,0.389-1.02,0-1.409   L4.755,3.384c-0.389-0.389-1.019-0.389-1.408,0s-0.389,1.02,0,1.409L11.312,12.766z" />
            <path d="M17.407,16.048L28.652,4.793c0.389-0.389,0.389-1.02,0-1.409c-0.389-0.389-1.019-0.561-1.408-0.171L15.296,15   c0,0-0.296,0-0.296,0s0,0.345,0,0.345L3.2,27.303c-0.389,0.389-0.315,1.02,0.073,1.409c0.194,0.195,0.486,0.292,0.741,0.292   s0.528-0.097,0.722-0.292L15.99,17.458l11.249,11.255c0.194,0.195,0.452,0.292,0.706,0.292s0.511-0.097,0.705-0.292   c0.389-0.389,0.39-1.02,0.001-1.409L17.407,16.048z" />
          </g>
        </svg>
      )}
    </div>
  );
}
