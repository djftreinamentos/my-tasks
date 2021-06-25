import React from 'react';
import {Calendar} from 'primereact/calendar';
import {Button} from 'primereact/button';
import { PageHeader } from '../../components/page-header/PageHeader';

export default class TestPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }
    changeDateHandler = (event)=>{
        this.setState({date:event.value});
    }

    render(){
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <PageHeader title="Página Teste">
                        <Button icon="pi pi-plus" className="p-button-rounded p-button-primary" />
                    </PageHeader>
                </div>
                <div className="p-col-3">
                    <Calendar dateFormat="dd/mm/yy DD"  value={this.state.date} onChange={this.changeDateHandler} showIcon />
                </div>
            </div>
        )
    }
}
