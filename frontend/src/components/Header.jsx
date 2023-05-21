import { Routes, Route, useNavigate, Link } from "react-router-dom";
import logo from "../blocks/logo/img/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип" />
      <div className="header__navigation_login">
        {props.userData && (
          <p className="header__navigation_email">{props.userData}</p>
        )}
        <Routes>
          <Route
            path="/signup"
            element={
              <Link to="/signin" className="header__navigation">
                Войти
              </Link>
            }
          />
          <Route
            path="/signin"
            element={
              <Link to="/signup" className="header__navigation">
                Зарегистрироваться
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <Link
                to="/signin"
                onClick={props.isSignOut}
                className="header__navigation_logout"
              >
                Выйти
              </Link>
            }
          />
        </Routes>
      </div>
    </header>
  );
}

export default Header;
