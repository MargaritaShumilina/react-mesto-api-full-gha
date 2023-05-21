import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  const { currentUser } = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `showplace__like ${
    isLiked && "showplace__like_active"
  }`;

  return (
    <article className="showplace" key={props.card._id}>
      {isOwn && (
        <button className="showplace__remove" onClick={handleDeleteClick} />
      )}
      <div
        className="showplace__image"
        onClick={handleClick}
        style={{ backgroundImage: `url(${props.card.link})` }}
      ></div>
      <div className="showplace__signature">
        <h2 className="showplace__name">{props.card.name}</h2>
        <div className="showplace__information">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="showplace__people-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
    );
}

export default Card;
