import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
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
    props.handleRegistration(email, password);
  }

  return (
    <div className="main-content">
      <div className="main-form form-registration">
        <h1 className="main-form__heading form-registration__heading">
          Регистрация
        </h1>
        <form
          className="main-form__block form-registration__block"
          onSubmit={handleSubmit}
        >
          <fieldset className="main-form__inputs form-registration__inputs">
            <input
              type="email"
              className="main-form__input form-registration__input form-registration-email"
              placeholder="Email"
              required
              id="form-registration-email"
              maxLength="40"
              minLength="5"
              value={email}
              onChange={handleChangeEmail}
            />
            <input
              type="password"
              className="main-form__input form-registration__input form-registration-password"
              placeholder="Пароль"
              required
              id="form-registration-password"
              maxLength="40"
              minLength="5"
              value={password}
              onChange={handleChangePassword}
            />
          </fieldset>
          <button
            className="main-form__button form-registration__button"
            onClick={props.onOpenStatusPopup}
            type="submit"
            onSubmit={handleSubmit}
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="main-form__another-way">
          Уже зарегистрированы?&nbsp;
          <Link to="/signin" className="main-form__login-link">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
