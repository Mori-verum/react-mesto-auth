import logo from '../images/logo.svg'
import { Link, useNavigate, Routes, Route } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  function handleSignOut() {
    localStorage.removeItem('token');
    props.handleLogout();
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <img src={logo} alt="Логотип Место Россия" className="header__logo" />
      <Routes>
        <Route exact path="/" element={
          <ul className="header__nav">
            <li><p className='header__user-email'>{props.userEmail}</p></li>
            <li><button onClick={handleSignOut} className='header__link header__button'>Выйти</button></li>
          </ul>
        }>
        </Route>
        <Route path="/sign-up" element={<Link to="/sign-in" className='header__link'>Вход</Link>}>
        </Route>
        <Route path="/sign-in" element={<Link to="/sign-up" className='header__link'>Регистрация</Link>}>
        </Route>
      </Routes>
    </header>
  )
}

export default Header