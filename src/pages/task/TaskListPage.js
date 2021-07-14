import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { PageHeader } from '../../components/page-header/PageHeader';
import * as APIService from '../../services/APIService';
import { TaskList } from './components/TaskList';
import i18n from '../../i18n/pt_br.json';

export default class TaskListPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            tasks: [
                {
                    id:1,
                    title:"título de teste",
                    createdAt: new Date(),
                    status: 'FINISHED'
                }
            ]
        }
    }

    async componentDidMount() {
        try {
            const records = await APIService.get('/api/v1/tasks') || [];
            this.setState({ tasks:records });
        } catch (err) {
            alert('Não foi possível carregar os dados');
        }
    }

    statusTemplate = (rowdata)=>{
        return <span>{i18n[rowdata.status]}</span>
    }
    createdAtTemplate = (rowData)=>{
        return <span>{rowData.createdAt &&  moment(rowData.createdAt).format("DD/MM/YYYY")}</span>
    }
    idTemplate = (rowData)=>{
        return <div style={{width:"100%",textAlign:"center"}}><Link to={'/admin/tasks/'+rowData.id}>{rowData.id}</Link></div>
    }
    newHandler = (event)=>{
        this.props.history.push('/admin/tasks/novo');
    }

    render(){
        const customTemplates = {
            status:this.statusTemplate,
            createdAt:this.createdAtTemplate,
            id:this.idTemplate,
        }
        return (
            <div className="p-grid">
            <div className="p-col-12">
                <PageHeader title="Tarefas">
                <Button icon="pi pi-plus" className="p-button-rounded p-button-primary"  onClick={this.newHandler}/>
                </PageHeader>
            </div>
            <div className="p-col-12">
                <Card style={{marginTop:"10px"}}>
                    <TaskList
                    records={this.state.tasks}
                    customTemplates={customTemplates}
                    />
                </Card>
           
            </div>
            
        </div>
        )
    }
}