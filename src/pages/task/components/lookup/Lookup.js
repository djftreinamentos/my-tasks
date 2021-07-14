import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export function Lookup(props) {
    return (
        <React.Fragment>
            <div className="p-grid">
                <div className="p-col-12" style={{display:"flex"}}>
                <InputText readOnly value={props.value} style={{flexGrow:"1"}}/>
                <Button onClick={props.onShow}>...</Button>
            </div>
            </div>

            <Dialog 
            header={props.header}
            visible={props.show} 
            style={{ width: '50vw' }} 
            footer={props.footer} 
            onHide={props.onHide}>
                {props.children}
            </Dialog>

        </React.Fragment>
    )
}