import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import * as APIService from '../../services/APIService';
import UserList from './components/UserList';
import { PageHeader } from '../../components/page-header/PageHeader';


export default class UserListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        try {
            const users = await APIService.get('/api/v1/users') || [];
            this.setState({ users });
        } catch (err) {
            alert('Não foi possível carregar os dados');
        }
    }

    rolesTemplate = (rowData)=>{
        return <span>{rowData.roles && rowData.roles.join(', ')}</span>
    }
    idTemplate = (rowData)=>{
        return <div style={{width:"100%",textAlign:"center"}}><Link to={'/admin/users/'+rowData.id}>{rowData.id}</Link></div>
    }

    newHanlder = (event)=>{
        this.props.history.push('/admin/users/novo');
    }


    render() {
        let data = null;
        if (this.state.users.length > 0) {
            data = this.state.users[0].name;
        }
       const customTemplates = {
           roles:this.rolesTemplate,
           id:this.idTemplate
       }
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <PageHeader title="Usuários">
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-primary"  onClick={this.newHanlder}/>
                    </PageHeader>
                </div>
                <div className="p-col-12">
                    <Card style={{marginTop:"10px"}}>
                    <UserList
                    users={this.state.users}
                    customTemplates = {customTemplates}
                />
                    </Card>
               
                </div>
                
            </div>


        )
    }
}