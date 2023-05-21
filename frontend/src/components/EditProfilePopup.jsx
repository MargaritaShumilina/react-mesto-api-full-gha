import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useEffect, useState, useContext } from "react";

function EditProfilePopup(props) {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setName("");
    setDescription("");
  }, [currentUser, props.isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClick={props.onClick}
      name="profile"
      title="Редактировать профиль"
      btnName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          value={name || ""}
          onChange={handleChangeName}
          className="popup__input popup__input_type_name"
          type="text"
          name="name"
          placeholder="Имя"
          required
          id="popup-name-profile"
          maxLength="40"
          minLength="2"
        />
        <span className="popup-name-profile-error popup__input-error"></span>
        <input
          value={description || ""}
          onChange={handleChangeDescription}
          className="popup__input popup__input_type_status"
          type="text"
          name="status"
          placeholder="Описание профиля"
          required
          id="popup-status-profile"
          maxLength="200"
          minLength="2"
        />
        <span className="popup-status-profile-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
