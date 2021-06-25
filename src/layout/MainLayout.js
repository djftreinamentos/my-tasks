import React from 'react';
import {Switch,Route,Router,Link} from 'react-router-dom';
import history from '../history';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import UserListPage from '../pages/users/UserListPage';
import PrivateRoute from '../components/private-route/PrivateRoute';
import TestPage from '../pages/tests/TestPage';
import UserFormPage from '../pages/users/UserFormPage';

function Tarefas(props){
    return (
        <h1>Página de gerenciamento de Tarefas</h1>
    )
}

class Formulario extends React.Component{
    render(){
    return (
        <h1>Formulário de usuários</h1>
    )
    }
}


class MainLayout extends React.Component{

    render(){
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/teste" component={TestPage}/>
                    <PrivateRoute path="/" exact={true} component={HomePage} />
                    <PrivateRoute path="/admin/users" exact={true} component={UserListPage} />
                    <PrivateRoute path="/admin/users/:id" exact={true} component={UserFormPage} />
                    <PrivateRoute path="/admin/tasks" component={Tarefas} />
                </Switch>
            </Router>
        )
    }
}

export default MainLayout;

