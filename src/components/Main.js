import React from "react"
import Card from "./Card.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js"

function Main(props) {

  const userData = React.useContext(CurrentUserContext);

  const cardElements = props.cards.map(card => (
    <Card card={card} onLikeClick={props.onCardLike} onCardDelete={props.onCardDelete} onCardClick={props.onCardClick} key={card._id} id={card._id} name={card.name} link={card.link} likes={card.likes} />
  ))

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <div className="profile__avatar-icon" onClick={props.onEditAvatar}>
            <div aria-label="Изменить аватар" className="profile__avatar-edit"></div>
          </div>
          <img src={userData.avatar} alt="Аватар" className="profile__avatar-img" />
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{userData.name}</h1>
          <button aria-label="Изменить описание профиля" type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
          <p className="profile__about">{userData.about}</p>
        </div>
        <button aria-label="Добавить пост" type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements" aria-label="Посты">
        {cardElements}
      </section>
    </main>
  )
}

export default Main