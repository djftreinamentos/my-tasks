import React from 'react';
import {LoginForm} from './LoginForm';
import * as AuthorizationService from '../../services/AuthorizationService';
import './LoginPage.css';


class LoginPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            messageError:"",
            credential:{
                login:"",
                password:""
            }
        }
    }

    handleLoginForm =(event)=>{
        const target = event.target;
        const name = target.name;
        const value = target.value;
        const credential = {...this.state.credential, [name]:value};
        this.setState({credential});

    }

    handleSign = async(event)=>{
        let authenticated =false;
        try{
            authenticated = await AuthorizationService.authenticate(this.state.credential)
            if(authenticated){
                this.setState({messageError:""});
                this.props.history.push('/');
            }else{
                this.setState({messageError:"login ou senha inválido"});
            }
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return (
            <div className="login-page">
                <LoginForm 
                messageError={this.state.messageError}
                credential={this.state.credential}
                onLoginForm={this.handleLoginForm}
                onSign={this.handleSign}
                />
            </div>
        )
    }
}

export default LoginPage;