function ImagePopup(props) {
  return (
    <div
      className={`popup popup-full-img ${
        props.card.link ? "popup_opened" : ""
      }`}
      onClick={props.onClick}
    >
      <div className="popup-full-img__container">
        <button
          className="popup__close popup-full-img__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <figure className="popup-full-img__full-showplace">
          <img
            className="popup-full-img__photo"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup-full-img__title">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
