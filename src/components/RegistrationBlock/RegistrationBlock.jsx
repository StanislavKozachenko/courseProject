import React from 'react';
import styles from './RegistrationBlock.module.scss';
import axios from 'axios';
export default function RegistrationBlock({ isRegistration, setIsRegistration }) {
  function onSendHandler(event) {
    event.preventDefault();
    const form = document.querySelector('.form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    if (
      !(
        data.firstName === '' ||
        data.lastName === '' ||
        data.email === '' ||
        data.passwordHash === ''
      )
    ) {
      axios
        .post(`http://localhost:8080/users/add`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((data) => console.log(data));
    } else {
      alert('Ошибка регистрации!\nВведите все данные!');
    }
    console.log(isRegistration);
  }
  return (
    <>
      <form className="form">
        <div className="auth__content auth">
          <span className="auth__title">Регистрация</span>
          <input required type="text" placeholder="Имя" className="auth__input" name="firstName" />
          <input
            required
            type="text"
            placeholder="Фамилия"
            className="auth__input"
            name="lastName"
          />
          <input required type="email" placeholder="Почта" className="auth__input" name="email" />
          <input
            required
            type="password"
            placeholder="Пароль"
            className="auth__input"
            name="passwordHash"
          />
          <button type="submit" className="auth__buttons--btn" onClick={onSendHandler}>
            Отправить
          </button>
        </div>
      </form>
    </>
  );
}
