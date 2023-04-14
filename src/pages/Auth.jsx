import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Redux/slices/usersSlice';
import Cookies from 'universal-cookie';
import { SessionContext } from '../App';
import Admin from './Admin';
import User from './User';
import RegistrationBlock from '../components/RegistrationBlock/RegistrationBlock';

export default function AuthPage() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const passRef = useRef();
  const emailRef = useRef();
  const [isAuthorized, setIsAuthorized] = useState();
  const [isRegistration, setIsRegistration] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { items, status } = useSelector((state) => state.users);
  const { sessionValue, setSessionValue } = useContext(SessionContext);
  const getUsers = async () => {
    dispatch(fetchUsers());
  };
  useEffect(() => {}, [isAuthorized]);
  useEffect(() => {
    getUsers();
  }, []);
  const checkIfUserExist = () => {
    setPassword(passRef.current.value);
    setEmail(emailRef.current.value);
    if (status === 'success') {
      for (let item of items) {
        if (item.email === email && item.passwordHash === password) {
          window.location.reload();
          console.log(item.role);
          cookies.set(
            'user',
            item.email +
              ' ' +
              item.firstName +
              ' ' +
              item.lastName +
              ' ' +
              item.role +
              ' ' +
              item.id,
            {
              path: '/',
            },
          );
          setSessionValue(item);
          setIsAuthorized(true);
        }
      }
    }
  };
  const onExitHandler = () => {
    setIsAuthorized(false);
    setSessionValue('No user');
    cookies.remove('user');
  };
  return (
    <div className="container">
      {!cookies.get('user') ? (
        <div className="auth__content auth">
          {!isRegistration ? (
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
                <button className="auth__buttons--btn" onClick={() => setIsRegistration(true)}>
                  Зарегистрироваться
                </button>
              </div>
            </div>
          ) : (
            <RegistrationBlock
              isRegistration={isRegistration}
              setIsRegistration={setIsRegistration}
            />
          )}
        </div>
      ) : (
        <div className="auth__success">
          <span>
            Добро пожаловать, {cookies.get('user').split(' ')[1]}{' '}
            {cookies.get('user').split(' ')[2]} !
          </span>
          {cookies.get('user').split(' ')[3] === '0' ? <Admin /> : <User />}
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
