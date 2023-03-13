import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm"

function AddPlacePopup(props) {
    const [cardName, setCardName] = useState("");
    const [cardLink, setCardLink] = useState("");

    useEffect(() => {
        setCardName("");
        setCardLink("");
    }, [props.isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        props.onAddCard({
            name: cardName,
            link: cardLink
        })
    }

    function handleChangeCardName(evt) {
        setCardName(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setCardLink(evt.target.value);
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            name='add-post'
            isOpen={props.isOpen}
            onClose={props.onClose}
            onOverlayClose={props.onOverlayClose}
            title='Новое место'
            submitText='Сохранить'>
            <section className="popup__form-section">
                <input value={cardName} onChange={handleChangeCardName} required placeholder="Название" type="text" name="name"
                    className="popup__input popup__input_margin_big" minLength="2" maxLength="30" />
                <span className="popup__input-error" id="post-text-error"></span>
            </section>
            <section className="popup__form-section">
                <input value={cardLink} onChange={handleChangeCardLink} type="url" required placeholder="Ссылка на картинку" name="link"
                    className="popup__input" />
                <span className="popup__input-error" id="link-error"></span>
            </section>
        </PopupWithForm>
    )
}

export default AddPlacePopup