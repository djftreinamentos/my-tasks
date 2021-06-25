import React from 'react';
import './LoginForm.css';

export function LoginForm(props){

    let error = null;
    if(props.messageError){
        error = (<p className="error-message">{props.messageError}</p>)
    }

    return (
        <div className="login-form">
            <h3>MY-TASKS</h3>
            <label>Login</label>
            <input name="login" value={props.credential.login} onChange={props.onLoginForm}/>
            <label>Senha</label>
            <input name="password" value={props.credential.password} type="password" onChange={props.onLoginForm}/>
            {error}
            <button onClick={props.onSign}>Entrar</button>
        </div>
    )
}