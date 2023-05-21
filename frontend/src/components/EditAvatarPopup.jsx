import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const currentAvatar = useRef("");

  useEffect(() => {
    currentAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: currentAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      onClick={props.onClick}
      name="avatar"
      title="Обновить аватар"
      btnName="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          ref={currentAvatar}
          className="popup__input popup__input_type_url-avatar"
          type="url"
          name="url"
          placeholder="Ссылка на новый аватар"
          required
          id="popup-url-avatar"
        />
        <span className="popup-url-avatar-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
