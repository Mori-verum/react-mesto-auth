import Header from './Header.js'
import Main from './Main.js';
import Footer from './Footer.js';
import { useEffect, useState } from 'react';
// import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import AddPlacePopup from './AddPlacePopup.js'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute.js';
import Login from './Login.js'
import Register from './Register.js'
import InfoTooltip from './InfoTooltip.js'
import * as auth from '../auth.js';

function App() {
  const [infoTooltipState, setInfoTooltipState] = useState({isSuccess: null, text: ''})
  // const [isSuccessful, setIsSuccessful] = useState(null);
  // const [textForInfoTooltip, setTextForInfoTooltip] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');
  const [cards, setCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);
  // const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState({
    isEditAvatarPopupOpen: false,
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isImagePopupOpen: false,
    isInfoTooltipPopupOpen: false,
  })
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

useEffect(() => {
  checkToken();
}, [])

useEffect(() => {
  if (loggedIn) {
    api
      .getDataProfile()
      .then((dataUser) => {
        setCurrentUser(dataUser)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}, [loggedIn])

useEffect(() => {
  if (loggedIn) {
    api
      .getAllCards()
      .then((dataCards) => {
        setCards(dataCards)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}, [loggedIn])

useEffect(() => {
  document.addEventListener('keydown', handleEscClose);

  return () => {
    document.removeEventListener('keydown', handleEscClose);
  }
}, [])

function handleEditAvatarClick() {
  setIsOpenPopup({ isEditAvatarPopupOpen: true });
}

function handleEditProfileClick() {
  setIsOpenPopup({ isEditProfilePopupOpen: true });
}

function handleAddPlaceClick() {
  setIsOpenPopup({ isAddPlacePopupOpen: true });
}

function handleCardClick(data) {
  setIsOpenPopup({ isImagePopupOpen: true });
  setSelectedCard(data);
}

function handleEscClose(evt) {
  if (evt.keyCode === 27) {
    closeAllPopups();
  }
}

function handleOverlayClose(evt) {
  if (evt.target === evt.currentTarget) {
    closeAllPopups();
  }
}

function closeAllPopups() {
  for (let prop in isOpenPopup) {
    setIsOpenPopup({ prop: false });
  }
}

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  api
    .changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleDeleteCard(card) {
  api
    .deleteCard(card._id)
    .then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleUpdateUser(data) {
  api
    .setUserInfo(data)
    .then((data) => {
      setCurrentUser(data);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleUpdateAvatar(data) {
  api
    .setUserAvatar(data.avatar)
    .then(data => {
      setCurrentUser(data);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleCardSubmit(data) {
  api
    .addCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
    })
    .then(() => {
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleLogin(formValue) {
  auth.authorize(formValue.email, formValue.password)
    .then((data) => {
      if (data.token) {
        setUserEmail(formValue.email);
        setLoggedIn(true);
      }
    })
    .then((res) => {
      navigate('/', { replace: true });
    })
    .catch(err => {
      setInfoTooltipState({isSuccess: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      setIsOpenPopup({ isInfoTooltipPopupOpen: true });
    });
}

function handleLogout() {
  setLoggedIn(false);
}

function handleRegister(formValue) {
  auth.register(formValue)
    .then((res) => {
      if (res.data) {
        setInfoTooltipState({isSuccess: true, text: 'Вы успешно зарегистрировались!'});
      } else {
        setInfoTooltipState({isSuccess: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
      }
    })
    .catch((err) => {
      setInfoTooltipState({isSuccess: false, text: 'Что-то пошло не так! Попробуйте ещё раз.'});
    })
}

function checkToken() {
  const token = localStorage.getItem('token');
  if (token) {
    auth.checkToken(token)
      .then((res) => {
        if (res) {
          setUserEmail(res.data.email);
          setLoggedIn(true);
          navigate('/', { replace: true })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header
        handleLogout={handleLogout}
        loggedIn={loggedIn}
        userEmail={userEmail} />
      <Routes>
        <Route
          path="/sign-up"
          element={<Register onRegister={handleRegister} isRegistered={infoTooltipState.isSuccess} setInfoTooltipState={setInfoTooltipState} setIsOpenPopup={setIsOpenPopup} />}
        />
        <Route
          path="/sign-in"
          element={<Login onLogin={handleLogin} setUserEmail={setUserEmail} />}
        />
        <Route exact path="/" element={<ProtectedRoute
          element={Main}
          loggedIn={loggedIn}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          cards={cards}
        />} />
      </Routes>
      <Footer />
      <InfoTooltip
      infoTooltipState={infoTooltipState}
      setInfoTooltipState={setInfoTooltipState}
        onClose={closeAllPopups}
        isOpen={isOpenPopup.isInfoTooltipPopupOpen}
      />

      {/* <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          cards={cards}
        /> */}

      <ImagePopup
        isOpen={isOpenPopup.isImagePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        card={selectedCard}
      />

      <EditAvatarPopup
        isOpen={isOpenPopup.isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
        onUpdateAvatar={handleUpdateAvatar}
      />

      <EditProfilePopup
        onUpdateUser={handleUpdateUser}
        isOpen={isOpenPopup.isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
      />

      <AddPlacePopup
        onAddCard={handleCardSubmit}
        isOpen={isOpenPopup.isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onOverlayClose={handleOverlayClose}
      />

      {/* <PopupWithForm
        name='delete'
        isOpen={isDeletePopupOpen}
        title='Вы уверены?'
        submitText='Да' />  */}

    </div>
  </CurrentUserContext.Provider >
);
}

export default App;
