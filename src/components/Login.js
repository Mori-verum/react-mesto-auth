import { useState } from "react";

function Login(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    function handleChange(evt) {
        const { name, value } = evt.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        props.onLogin(formValue);
    }

    return (
        <main>
            <section className="auth">
                <h1 className="auth__title">Вход</h1>
                <form onSubmit={handleSubmit} className="auth__form">
                    <input type="email" name="email" value={formValue.email} onChange={handleChange} className="auth__input auth__input_margin_big" placeholder="Email"></input>
                    <input autoComplete="off" type="password" name="password" value={formValue.password} onChange={handleChange} className="auth__input" placeholder="Пароль"></input>
                    <button type="submit" className="auth__form-submit">Войти</button>
                </form>
            </section>
        </main>
    )
}

export default Login;