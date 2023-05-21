import React from "react";
import popupNo from "../blocks/popup/img/popupNo.svg";
import popupOk from "../blocks/popup/img/popupOk.svg";

function InfoTooltip(props) {
  return (
    <div
      className={`popup popup-${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup-${props.name}__container`}>
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          className="popup__icon"
          src={`${props.successful ? popupOk : popupNo}`}
        />
        <h2 className="popup__title popup__title_center-position">{`${
          props.successful
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }`}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
