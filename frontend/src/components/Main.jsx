import { useContext } from "react";

import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-edit" onClick={props.onEditAvatar}>
          <div
            className="profile__avatar"
            alt="Аватар"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          />
        </div>
        <div className="profile__info">
          <div className="profile__heading">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__edit"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-photo"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="photo-places">
        {props.cards.map((card) => {
          return (
            <Card
              card={card}
              key={card._id}
              onClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
