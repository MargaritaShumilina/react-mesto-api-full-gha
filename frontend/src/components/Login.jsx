import React from "react";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password);
  }

  return (
    <div className="main-content">
      <div className="main-form form-login">
        <h1 className="main-form__heading form-login__heading">Вход</h1>
        <form
          className="main-form__block form-login__block"
          onSubmit={handleSubmit}
        >
          <fieldset className="main-form__inputs form-login__inputs">
            <input
              type="email"
              className="main-form__input form-login__input form-login-email"
              placeholder="Email"
              required
              id="form-login-email"
              maxLength="40"
              minLength="5"
              value={email}
              onChange={handleChangeEmail}
            />
            <input
              type="password"
              className="main-form__input form-login__input form-login-password"
              placeholder="Пароль"
              required
              id="form-login-password"
              maxLength="40"
              minLength="5"
              value={password}
              onChange={handleChangePassword}
            />
          </fieldset>
          <button
            className="main-form__button form-login__button"
            onClick={props.onOpenStatusPopup}
            onSubmit={handleSubmit}
          >
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
