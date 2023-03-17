import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Redux/slices/usersSlice';
import Cookies from 'universal-cookie';
import { SessionContext } from '../App';

export default function AuthPage() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const passRef = useRef();
  const emailRef = useRef();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { items, status } = useSelector((state) => state.users);
  const { sessionValue, setSessionValue } = useContext(SessionContext);
  const getUsers = async () => {
    dispatch(fetchUsers());
  };
  useEffect(() => {
    getUsers();
  }, []);
  const checkIfUserExist = () => {
    setPassword(passRef.current.value);
    setEmail(emailRef.current.value);
    if (status === 'success') {
      for (let i of items) {
        if (i.email === email && i.password === password) {
          cookies.set('userEmail', i.email + ' ' + i.name + ' ' + i.lastname, { path: '/' });
          setSessionValue(i);
          setIsAuthorized(true);
        }
      }
    }
  };
  const onExitHandler = () => {
    cookies.remove('userEmail');
    setSessionValue('No user');
    setIsAuthorized(false);
  };
  useEffect(() => {}, [isAuthorized]);
  return (
    <div className="container">
      {!cookies.get('userEmail') ? (
        <div className="auth__content auth">
          <span className="auth__title">Авторизация</span>
          <input
            type="email"
            placeholder="Почта"
            className="auth__input"
            name="email"
            ref={emailRef}
          />
          <input
            type="password"
            placeholder="Пароль"
            ref={passRef}
            className="auth__input"
            name="password"
          />
          <div className="auth__buttons">
            <button className="auth__buttons--btn" onClick={checkIfUserExist}>
              Войти
            </button>
            <button className="auth__buttons--btn">Зарегистрироваться</button>
          </div>
        </div>
      ) : (
        <div className="auth__success">
          <span>
            {' '}
            Добро пожаловать, {cookies.get('userEmail').split(' ')[1]}{' '}
            {cookies.get('userEmail').split(' ')[2]} !
          </span>
          <div>
            <button className="auth__exit" onClick={onExitHandler}>
              Выйти
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
