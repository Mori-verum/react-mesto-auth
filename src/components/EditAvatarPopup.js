import React, { useEffect } from "react";
import { useRef } from "react"
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
    const linkInput = useRef();

    useEffect(() => {
        linkInput.current.value = "";
    }, [props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onUpdateAvatar({
            avatar: linkInput.current.value,
        });
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='edit-avatar'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
            title='Обновить аватар'
            submitText='Сохранить'>
            <section className="popup__form-section">
                <input
                    ref={linkInput}
                    required
                    placeholder="Ссылка на картинку"
                    type="url" name="link"
                    className="popup__input popup__input_margin_big" />
                <span className="popup__input-error" id="link--avatar-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default EditAvatarPopup