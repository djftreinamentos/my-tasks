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
    roles:[],
}

export default class UserFormPage extends  React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentRecord: DEFAULT_USER,
            roles:[],
            title:"Usuário: Novo"
        }
    }
    async componentDidMount(){
        const id = parseInt(this.props.match.params.id);
        if(id){
            try {
                const currentRecord = await APIService.get('/api/v1/users/'+id) || DEFAULT_USER;
                const userRoles = currentRecord.roles || [];
                let roles = await APIService.get('/api/v1/roles') || []
                roles = roles.map(role => role.name);
                roles = roles.filter(role =>{
                    const current = userRoles.find(uRule => uRule === role);
                    return  current == null

                })
                this.setState({ currentRecord, title: "Usuário: "+currentRecord.id ,roles});
            } catch (err) {
                alert('Não foi possível carregar os dados');
            }
        }else{
            this.setState({ currentRecord:DEFAULT_USER, title:"Usuário: Novo" });
        }
       
    }

    onChangeFieldHandler = (event)=>{
        const target = event.target;
        const key = target.name;
        const value = target.value;
        let currentRecord = {...this.state.currentRecord,[key]:value}
        this.setState({currentRecord});
    }
    onChangeRolesdHandler = (event)=>{
        const roles = event.source;
        const userRoles = event.target;
        let currentRecord = {...this.state.currentRecord,roles:userRoles};
        this.setState({currentRecord,roles});

    }

    onSaveHandler = async (event)=>{
        try{
            const record = this.state.currentRecord;
            if(record.id){
                //update
                const result = await APIService.put('/api/v1/users/'+record.id, record);
                if(result.ok){
                    alert('Registro atualizado com sucesso');
                }else{
                    alert('Não foi possível atualizar o registro');
                }
            }else{
                const currentRecord = await APIService.post('/api/v1/users', record);
                const userRoles = currentRecord.roles || [];
                let roles = await APIService.get('/api/v1/roles') || []
                roles = roles.map(role => role.name);
                roles = roles.filter(role =>{
                    const current = userRoles.find(uRule => uRule === role);
                    return  current == null

                })
                this.setState({ currentRecord, title: "Usuário: "+currentRecord.id ,roles});
            }
        }catch(err){
            alert('Não foi possível realizar a operação solicitada');
        }
    }
    onNewHandler = async()=>{
        try{
            //buscar novamente a listagem de roles
            let roles = await APIService.get('/api/v1/roles') || []
            roles = roles.map(role => role.name);
            //atualizar o current Record com os dados vazios
            this.setState({currentRecord:DEFAULT_USER,roles, title:"Usuário: Novo" })
        }catch(err){
            alert('Não foi possível carregar a lista de perfis');
        }
    }
    onRemoveHandler = async()=>{

    }

    onListHandler = ()=>{
        this.props.history.push("/admin/users");
    }

    render(){
        return (
            <div className="p-grid">
                 <div className="p-col-12">
                    <PageHeader title={this.state.title} >
                        <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" onClick={this.onListHandler}/>
                        <Button icon="pi pi-check" className="p-button-rounded p-button-success"  onClick={this.onSaveHandler}/>
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-default" onClick={this.onNewHandler} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={this.onRemoveHandler}/>
                    </PageHeader>
                </div>
                <div className="p-col-12">
                    <Card>
                        <UserForm
                            roles = {this.state.roles}
                            record={this.state.currentRecord}
                            onChangeField={this.onChangeFieldHandler}
                            onChangeRoles={this.onChangeRolesdHandler}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}