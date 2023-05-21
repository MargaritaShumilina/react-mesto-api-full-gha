import "../index.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRoute";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import InfoTooltip from "./InfoTooltip";
import { register, authorize, getContent } from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData(res.data.email);
            setLoggedIn(true);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  };

  function signOut() {
    setLoggedIn(false);
    setUserData("");
    localStorage.removeItem("jwt");
  }

  function handleRegistrationClick(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setPopupOpen(true);
          localStorage.setItem("jwt", res.token);
          setSuccessful(true);
          navigate("/signin", { replace: true });
        }
      })
      .catch((err) => {
        setPopupOpen(true);
        setSuccessful(false);
        console.log(err);
      });
  }

  function handleLoginClick(email, password) {
    authorize(email, password)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setUserData(email);
          localStorage.setItem("jwt", res.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setPopupOpen(true);
        setSuccessful(false);
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setPopupOpen(false);
    setSelectedCard({});
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getUserInformation()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then(setCards)
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(data) {
    api
      .userInformationForSave(data.name, data.about)
      .then(
        ({ name, about }) => setCurrentUser({ name, about }),
        closeAllPopups()
      )
      .catch((e) => console.log(e));
  }

  function handleUpdateAvatar(data) {
    api
      .newUserAvatar(data.avatar)
      .then(({ avatar }) => setCurrentUser({ avatar }), closeAllPopups())
      .catch((e) => console.log(e));
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCardToTemplate(data.name, data.link)
      .then((newCard) => setCards([newCard, ...cards]), closeAllPopups())
      .catch((e) => console.log(e));
  }

  function handleClickBackgroundClose(e) {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  }

  function handleEscClose(e) {
    if (e.key === "Escape") {
      closeAllPopups();
    }
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const choiceApiMethod = isLiked
      ? api.deleteLike(card._id)
      : api.putLike(card._id);
    choiceApiMethod
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleCardDelete(card) {
    api
      .removeMyOwnCard(card._id)
      .then(() =>
        setCards((cards) => cards.filter((value) => value._id !== card._id))
      )
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    if (
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      isEditAvatarPopupOpen === true
    ) {
      document.addEventListener("keydown", handleEscClose);
    }
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <Header userData={userData} isSignOut={signOut} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          }
        />
        <Route
          path="/signup"
          element={<Register handleRegistration={handleRegistrationClick} />}
          loggedIn={loggedIn}
        />
        <Route
          path="/signin"
          element={<Login handleLogin={handleLoginClick} />}
          loggedIn={loggedIn}
        />
      </Routes>

      <Footer />

      <InfoTooltip
        isOpen={popupOpen}
        name="info"
        onClose={closeAllPopups}
        successful={successful}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onClick={handleClickBackgroundClose}
      />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onClick={handleClickBackgroundClose}
        onUpdateUser={handleUpdateUser}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onClick={handleClickBackgroundClose}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onClick={handleClickBackgroundClose}
        onAddPlace={handleAddPlaceSubmit}
      />

      <PopupWithForm
        onClick={handleClickBackgroundClose}
        name="are-you-sure"
        title="Вы уверены?"
        btnName="Да"
        isOpen=""
      >
        <>
          <button
            className="popup__close popup-are-you-sure__close"
            type="button"
          ></button>
          <h2 className="popup__title popup__title-without-inputs">
            Вы уверены?
          </h2>
          <button className="popup__button" type="submit" value="Да">
            Да
          </button>
        </>
      </PopupWithForm>
    </CurrentUserContext.Provider>
  );
}

export default App;
