function ImagePopup({onOverlayClose, isOpen, onClose, card}) {

    return (
        <div onClick={onOverlayClose} className={`popup popup_view-post ${isOpen ? 'popup_opened' : ''}`}>
            <figure className="popup__img-container">
                <button onClick={onClose} aria-label="Закрыть модальное окно" type="button" className="popup__close-button"></button>
                <img className="popup__image"
                    src={card?.link ?? '#'}
                    alt={card?.name ?? '#'}
                />
                <figcaption className="popup__img-title">{card?.name ?? ''}</figcaption>
            </figure>
        </div>
    )

}

export default ImagePopup