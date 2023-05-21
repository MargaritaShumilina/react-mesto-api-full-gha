import PopupWithForm from "./PopupWithForm";
import React from "react";
import { useState, useEffect } from "react";

function AddPlacePopup(props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setTitle("");
    setUrl("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title,
      link: url,
    });
  }

  function handleChangeTitle(e) {
    setTitle(e.target.value);
  }

  function handleChangeUrl(e) {
    setUrl(e.target.value);
  }

  return (
    <PopupWithForm
      onClick={props.onClick}
      name="showplace"
      title="Новое место"
      btnName="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <input
          value={title || ""}
          onChange={handleChangeTitle}
          className="popup__input popup__input_type_title"
          type="text"
          name="title"
          placeholder="Название"
          required
          id="popup-title-photo"
          maxLength="30"
          minLength="2"
        />
        <span className="popup-title-photo-error popup__input-error"></span>
        <input
          value={url || ""}
          onChange={handleChangeUrl}
          className="popup__input popup__input_type_url"
          type="url"
          name="url"
          placeholder="Ссылка на картинку"
          required
          id="popup-url-photo"
        />
        <span className="popup-url-photo-error popup__input-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
