function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
      onClick={props.onClick}
    >
      <div className={`popup__container popup-${props.name}__container`}>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{`${props.title}`}</h2>
        <form
          name={`${props.name}`}
          className="popup__form"
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className="popup__button"
            type="submit"
            value={`${props.btnName}`}
          >{`${props.btnName}`}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
