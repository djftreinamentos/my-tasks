import React from 'react';
import moment from 'moment';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';

export function HistoryListItem(props) {

    return (
        <div className="list-history-container">
            <div className="list-history-header">
                <div className="list-history-header-left">
                    <p>
                        {props.item && props.item.createdAt ? moment(props.item.createdAt).format('DD/MM/YYYY hh:mm') : ""}
                    </p>
                    <p>
                        {props.item && props.item.user ? props.item.user.name : ""}
                    </p>
                </div>
                <div className="list-history-header-right">
                    <Button style={{ width: "50px" }} icon="pi pi-pencil" className="p-button p-button-primary" onClick={()=>props.onEditHistory && props.onEditHistory(props.item)} />
                    <Button style={{ width: "50px" }} icon="pi pi-trash" className="p-button p-button-danger" onClick={()=>props.onRemoveHistory && props.onRemoveHistory(props.item)} />
                </div>
            </div>
            <div className="list-history-content">
                <InputTextarea style={{ width: "100%" }} name="title" value={props.item ? props.item.description : ""} disabled />
            </div>
        </div>
    )
}