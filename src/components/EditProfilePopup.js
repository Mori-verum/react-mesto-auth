import React, { useEffect } from "react";
import { useState } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");

    useEffect(() => {
        setUserName(currentUser.name);
        setUserDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleChangeUserName(evt) {
        setUserName(evt.target.value);
    }

    function handleChangeUserDescription(evt) {
        setUserName(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateUser({
            name: userName,
            about: userDescription
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='edit'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
            title='Редактировать профиль'
            submitText='Сохранить'>
            <section className="popup__form-section">
                <input value={userName || ""} onChange={handleChangeUserName} required placeholder="Введите имя" type="text" name="name"
                    className="popup__input popup__input_margin_big" minLength="2" maxLength="40" />
                <span className="popup__input-error" id="username-error"></span>
            </section>
            <section className="popup__form-section">
                <input value={userDescription || ""} onChange={handleChangeUserDescription} required placeholder="Введите описание" type="text" name="description"
                    className="popup__input" minLength="2" maxLength="200" />
                <span className="popup__input-error" id="description-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditProfilePopup