import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { PickList } from 'primereact/picklist';

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
                    <div className="p-col-12">
                        <label htmlFor="email" className="p-d-block">Email</label>
                        <InputText name="email" type="email" value={props.record.email} onChange={props.onChangeField} />
                    </div>
                    <div className="p-col-12">
                        <label htmlFor="password" className="p-d-block">Senha</label>
                        <Password name="password" value={props.record.password} onChange={props.onChangeField} />
                    </div>
                    <div className="p-col-12">
                        <PickList
                        source={props.roles}
                        target={props.record.roles} 
                        showSourceControls={false}
                        showTargetControls={false}
                        sourceHeader="Perfís disponíveis" targetHeader="Perfís selecionados"
                        sourceStyle={{ height: '342px' }} targetStyle={{ height: '342px' }}
                        onChange={props.onChangeRoles}></PickList>
                    </div>
                </div>
            </div>
        </div>
    )
}