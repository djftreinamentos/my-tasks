import React from 'react';
import { Link } from 'react-router-dom';
import * as AuthorizationService from '../../services/AuthorizationService';
import * as APIService from '../../services/APIService';
import {MenuList} from './components/MenuList';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menus: []
        }
    }

    async componentDidMount() {
        let menus = await APIService.get('/api/v1/menus') || [];
        this.setState({ menus })
    }


    render() {
        const currentUser = AuthorizationService.getCurrentUser();
        return (
            <MenuList
            menus={this.state.menus}
            />
        )
    }
}

export default HomePage;