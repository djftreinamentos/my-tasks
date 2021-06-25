import React from 'react';
import * as APIService from '../../services/APIService';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { PageHeader } from '../../components/page-header/PageHeader';
import {UserForm} from './UserForm';

const DEFAULT_USER =  {
    id:"",
    name:"",
    email:"",
    password:"",
    roles:[]
}

export default class UserFormPage extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentRecord: DEFAULT_USER,
            title:"Usuário: Novo"
        }
    }
    async componentDidMount(){
        const id = parseInt(this.props.match.params.id);
        if(id){
            try {
                const currentRecord = await APIService.get('/api/v1/users/'+id) || DEFAULT_USER;
                this.setState({ currentRecord, title: "Usuário: "+currentRecord.id });
            } catch (err) {
                alert('Não foi possível carregar os dados');
            }
        }else{
            this.setState({ currentRecord:DEFAULT_USER, title:"Usuário: Novo" });
        }
       
    }

    render(){
        return (
            <div className="p-grid">
                 <div className="p-col-12">
                    <PageHeader title={this.state.title} >
                    <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" />
                    <Button icon="pi pi-check" className="p-button-rounded p-button-success" />
                    <Button icon="pi pi-plus" className="p-button-rounded p-button-default" />
                    <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" />
                    </PageHeader>
                </div>
                <div className="p-col-12">
                    <Card>
                        <UserForm
                            record={this.state.currentRecord}
                            onChangeField={()=>{}}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}