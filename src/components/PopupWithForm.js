function PopupWithForm(props) {

    return (
        <div onMouseDown={props.onOverlayClose} className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form name={props.name} className="popup__form" onSubmit={props.onSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button type="submit" className="popup__submit popup__submit_delete">{props.submitText}</button>
                </form>
                <button aria-label="Закрыть модальное окно" type="button" className="popup__close-button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm