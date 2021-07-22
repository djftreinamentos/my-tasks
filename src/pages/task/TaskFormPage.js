import React from 'react';
import * as APIService from '../../services/APIService';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { PageHeader } from '../../components/page-header/PageHeader';
import { TaskForm } from './components/TaskForm';

const EMPTY_TASK = {
    id: "",
    title: '',
    description: '',
    createdAt: new Date(),
    priority: 'NOT_PRIORIZED',
    planningType: 'PLANNED',
    duration: 0,
    predictedTime: 0,
    history: [],
    deliveryForecast: null,
    deliveredAt: null,
    status: '',
    user: null,
    type: ""
}
export default class TaskFormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Tasks',
            currentHistory:{
                description:'',
                user:{
                    name:""
                },
                createdAt:null
            },
            activityTypes : [
                {label:"Selecione uma atividade", value:""},
                {label:"Desenvolvimento", value:"DEVELOPMENT"},
                {label:"Análise", value:"ANALISYS"},
                {label:"Projeto", value:"PROJECT"},
                {label:"Correção de erro", value:"BUG"},
            ],
            statusList:[
                {label:"Selecione um status", value:""},
                {label:"Novo", value:"NEW"},
                {label:"Em execução", value:"INPROGRESS"},
                {label:"Parado", value:"STOPED"},
                {label:"Finalizado", value:"FINISHED"}
            ],
            priorityList:[
                {label:"Alta", value:"HIGH"},
                {label:"Média",value:"MEDIUM"},
                {label:"Baixa",value:"LOW"},
                {label:"Não priorizada",value:"NOT_PRIORIZED"}
            ],
            planningTypeList:[
                {label:"Planejado", value:"PLANNED"},
                {label:"Não planejado",value:"NOT_PLANNED"}
            ],
            currentRecord: EMPTY_TASK,
            lookupUser: {
                show: false,
                selectedUser: null,
                records: []
            }
        }
    }

    onLookupUserShow = () => {
        const lookupUser = { ...this.state.lookupUser, show: true }
        this.setState({ lookupUser })
    }
    onLookupUserHide = () => {
        const lookupUser = { ...this.state.lookupUser, show: false, selectedUser: null }
        this.setState({ lookupUser })
    }
    onUserSelected = () => {
        const lookupUser = { ...this.state.lookupUser, show: false, selectedUser: null }
        const currentRecord = { ...this.state.currentRecord, user: this.state.lookupUser.selectedUser }
        this.setState({ lookupUser ,currentRecord})
    }

    onUserSelectionChange = (event) => {
        const lookupUser = { ...this.state.lookupUser, selectedUser: event.value }
        this.setState({ lookupUser });
    }

    onChangeField = (event)=>{
        const target = event.target;
        const key = target.name;
        const value = target.value;
        const currentRecord = {...this.state.currentRecord,[key]:value};
        this.setState({currentRecord})
    }

    onAddHistoryHandler = (event)=>{
        this.setState({
            showHistoryDialog:true
        })
    }

    onHideHistoryDialogHandler = (event)=>{
        this.setState({
            showHistoryDialog:false
        })
    }

    onChangeCurrentHistoryHandler = (event)=>{
        const target = event.target;
        const value = target.value;
        const currentHistory = {...this.state.currentHistory, description:value};
        this.setState({currentHistory});

    }

    onConfirmHistoryHandler = (event)=>{
        let currentHistory = this.state.currentHistory;
        let currentRecord = this.state.currentRecord;
        let history = []
        if(currentHistory.id){
            //já existe, só preciso atualizar a lista
            history = currentRecord.history.map(item =>{
                if(item.id != currentHistory.id){
                    return item
                }else{
                    return currentHistory
                }
            })
        }else{
            //não existe e eu preciso incluir na lista
            currentHistory.createdAt = new Date();
            currentHistory.id = new Date().getTime();
            history = [...currentRecord.history, currentHistory];
        }

       
        
        currentRecord = {...currentRecord, history};
        currentHistory = {
            createdAt:null,
            user:null,
            description:""
        }
        const showHistoryDialog = false;
        this.setState({
            currentHistory,
            currentRecord,
            showHistoryDialog
        })


    }

    onCancelHistoryHandler = ()=>{
        const currentHistory = {
            createdAt:null,
            user:null,
            description:""
        }
        const showHistoryDialog = false;
        this.setState({
            currentHistory,
            showHistoryDialog
        })
    }

    onRemoveHistoryHandler = (historyItem) =>{
        const history = this.state.currentRecord.history.filter( it => it.id !== historyItem.id);
        const currentRecord = {...this.state.currentRecord, history};
        this.setState({currentRecord})
    }

    onEditHistoryHandler = (historyItem)=>{
        this.setState({
            currentHistory:historyItem,
            showHistoryDialog:true
        });
    }

    render() {
       
        const lookupSelectionUserFooter = (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button style={{ width: "50px" }} icon="pi pi-check" className="p-button p-button-success" onClick={this.onUserSelected} disabled={!this.state.lookupUser.selectedUser} />
                <Button style={{ width: "50px" }} icon="pi pi-times" className="p-button p-button-danger" onClick={this.onLookupUserHide} />
            </div>
        )
        const lookupUser = {
            show: this.state.lookupUser.show,
            selection: this.state.lookupUser.selectedUser,
            onShow: this.onLookupUserShow,
            onHide: this.onLookupUserHide,
            onSelectionChange: this.onUserSelectionChange,
            records: [
                { id: 1, name: "João" },
                { id: 2, name: 'Maria' },
                { id: 3, name: 'Ana' },
                { id: 4, name: 'Fernanda' },
                { id: 5, name: 'Carlos' },
                { id: 6, name: 'Orlando' },
                { id: 7, name: 'Jenifer' },
                { id: 8, name: 'Antônio' },
                { id: 9, name: 'Cláudio' },
                { id: 10, name: 'Juliana' }],
            footer: lookupSelectionUserFooter
        }
        return (
            <div className="p-grid p-justify-center">
                <div className="p-col-10">
                    <PageHeader title={this.state.title} >
                        <Button icon="pi pi-search" className="p-button-rounded p-button-secondary" onClick={this.onListHandler} />
                        <Button icon="pi pi-check" className="p-button-rounded p-button-success" onClick={this.onSaveHandler} />
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-default" onClick={this.onNewHandler} />
                        <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={this.onRemoveHandler} />
                    </PageHeader>
                </div>
                <div className="p-col-10">
                    <Card>
                        <TaskForm
                            record={this.state.currentRecord}
                            lookupUser={lookupUser}
                            activityTypes={this.state.activityTypes}
                            statusList={this.state.statusList}
                            priorityList={this.state.priorityList}
                            planningTypeList={this.state.planningTypeList}
                            onChangeField={this.onChangeField}
                            onAddHistory={this.onAddHistoryHandler}
                            showHistoryDialog={this.state.showHistoryDialog}
                            onHideHistoryDialog={this.onHideHistoryDialogHandler}
                            currentHistory={this.state.currentHistory}
                            onChangeCurrentHistory={this.onChangeCurrentHistoryHandler}
                            onConfirmHistory = {this.onConfirmHistoryHandler}
                            onCancelHistory = {this.onCancelHistoryHandler}
                            onRemoveHistory = {this.onRemoveHistoryHandler}
                            onEditHistory = {this.onEditHistoryHandler}
                        />
                    </Card>
                </div>
            </div>
        )
    }
}