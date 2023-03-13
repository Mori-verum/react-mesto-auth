import logo from '../images/logo.svg'
import { Link, useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    props.handleLogout();
    navigate('/sign-in');
  }

  function renderLink() {
    if(window.location.pathname === '/sign-up') {
      return (
        <Link to="/sign-in" className='header__link'>Вход</Link>
      )
    } else if(window.location.pathname === '/sign-in') {
      return (
        <Link to="/sign-up" className='header__link'>Регистрация</Link>
      )
    }
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      {props.loggedIn ? <ul className="header__nav">
        <li><p className='header__user-email'>{props.userEmail}</p></li>
        <li><button onClick={handleSignOut} className='header__link header__button'>Выйти</button></li>
      </ul> : renderLink()}
    </header>
  )
}

export default Header