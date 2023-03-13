import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as auth from '../auth'

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    });

    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    useEffect(() => {
        if(props.isRegistered!==null) {
            props.setIsOpenPopup({ isInfoTooltipPopupOpen: true })
        }
    }, [props.isRegistered])

    function handleSubmit(evt) {
        evt.preventDefault();
        auth.register(formValue)
            .then((res) => {
              if(res.data) {
                  props.setIsRegistered(true);
                  console.log(props.isRegistered);
              } else {
                  props.setIsRegistered(false);
                  console.log(res);
              }
              
            })
            .catch((err) => {
              console.log(err);
              props.setIsRegistered(false);
            })
        
    }

    return (
        <main>
            <section className="auth">
                <h1 className="auth__title">Регистрация</h1>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input name="email" type="email" value={formValue.email} className="auth__input auth__input_margin_big" onChange={handleChange} placeholder="Email"></input>
                    <input autoComplete="off" name="password" type="password" value={formValue.password} className="auth__input" onChange={handleChange} placeholder="Пароль"></input>
                    <button type="submit" className="auth__form-submit">Зарегистрироваться</button>
                </form>
                <p className="auth__subtitle">Уже зарегистрированы? <Link to="/sign-in" className="auth__link">Войти</Link></p>
            </section>
        </main>
    )
}

export default Register;