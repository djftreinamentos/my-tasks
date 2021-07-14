import React from 'react';
import {Switch,Route,Router,Link} from 'react-router-dom';
import history from '../history';
import HomePage from '../pages/home/HomePage';
import LoginPage from '../pages/login/LoginPage';
import UserListPage from '../pages/users/UserListPage';
import PrivateRoute from '../components/private-route/PrivateRoute';
import TestPage from '../pages/tests/TestPage';
import UserFormPage from '../pages/users/UserFormPage';
import TaskListPage from '../pages/task/TaskListPage';
import TaskFormPage from '../pages/task/TaskFormPage';


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
                    <PrivateRoute path="/admin/tasks" exact={true} component={TaskListPage} />
                    <PrivateRoute path="/admin/tasks/:id" component={TaskFormPage} />
                </Switch>
            </Router>
        )
    }
}

export default MainLayout;

