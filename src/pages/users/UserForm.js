import React from 'react';
import { InputText } from 'primereact/inputtext';
export function UserForm(props) {
    return (
        <div className="p-grid">
            <div className="p-col-6">
                <div className="p-grid">
                    <div className="p-col-12">
                    <label htmlFor="id" className="p-d-block">Código</label>
                        <InputText name="id" value={props.record.id} readOnly />
                    </div>
                    <div className="p-col-12">
                    <label htmlFor="name" className="p-d-block">Nome</label>
                        <InputText name="name" value={props.record.name} onChange={props.onChangeField} />
                    </div>
                </div>
            </div>
        </div>
    )
}