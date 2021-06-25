import React from "react";
import { Redirect, Route } from "react-router-dom";
import * as AuthorizationService from "../../services/AuthorizationService";
import logo from "../../Settings.gif";

class PrivateRoute extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            loading:true,
            authorizated:false
        }
    }

    async componentDidMount(){
        const roles = this.props.roles;
        const authorizated = await AuthorizationService.hasAuthorization(roles);
        this.setState({loading:false,authorizated})
    }

    render(){
        const {component: Component, roles, ...rest } = this.props;
        if(this.state.loading){
            return (<div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}><h1><img src={logo}/> Carregando</h1></div>);
        }else if(this.state.authorizated){
            return (
                <Route {...rest} render={(props)=>(<Component {...props}/>)}/>
            )
        }else{
            return <Route {...rest} render={(props) => (
                <Redirect to='/login' />
               )} />
        }
    }
}

export default PrivateRoute;
