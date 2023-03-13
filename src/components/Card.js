import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Card(props) {
  const userData = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner._id === userData._id;
  const isLiked = props.likes.some(i => i._id === userData._id);
  const cardLikeButtonClassName = (
    `element__like-button ${isLiked && 'element__like-button_enabled'}`
  );

  function handleClick() {
    props.onCardClick(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  function handleLikeClick() {
    props.onLikeClick(props.card)
  }

  return (
    <article aria-label="Карточка с фото" className="element" id={props.id}>
      {isOwn && <button className="element__delete-button" aria-label="Удалить пост" type="button" onClick={handleDeleteClick} />}
      <img onClick={handleClick} src={props.link} alt={props.name} className="element__image" />
      <div className="element__container">
        <h2 className="element__description">{props.name}</h2>
        <div className="element__column">
          <button aria-label="Лайк" type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card