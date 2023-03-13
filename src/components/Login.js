import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../auth.js'

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();

    function handleChange(evt) {
        const {name, value} = evt.target;
    
        setFormValue({
          ...formValue,
          [name]: value
        });
      }

      function handleSubmit(evt) {
        evt.preventDefault();
        if(!formValue.email || !formValue.password) {
            return;
        }
        auth.authorize(formValue.email, formValue.password)
        .then((data) => {
            if(data.token) {
                props.setUserEmail(formValue.email);
                setFormValue({email: '', password: ''})
                props.handleLogin();
            }
        })
        .then((res) => {
            navigate('/', {replace:true});
        })
        .catch(err => console.log(err));
      }

    return(
        <main>
        <section className="auth">
            <h1 className="auth__title">Вход</h1>
            <form onSubmit={handleSubmit} className="auth__form">
                <input type="email" name="email" value={formValue.email} onChange={handleChange} className="auth__input auth__input_margin_big" placeholder="Email"></input>
                <input  autoComplete="off" type="password" name="password" value={formValue.password} onChange={handleChange} className="auth__input" placeholder="Пароль"></input>
                <button type="submit" className="auth__form-submit">Войти</button>
            </form>
        </section>
        </main>
    )
}

export default Login;