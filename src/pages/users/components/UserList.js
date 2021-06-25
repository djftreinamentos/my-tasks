import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


export default function UserList(props) {
    const users = props.users || [];
   
    return (
        <DataTable value={users}>
            <Column field="id"  header="Code" style={{with:"100%",textAlign:"center"}} body={props.customTemplates && props.customTemplates['id']}/>
            <Column field="name"  header="Nome" body={props.customTemplates && props.customTemplates['name']}/>
            <Column field="email"  header="Email" body={props.customTemplates && props.customTemplates['email']}/>
            <Column field="roles"  header="Grupos" body={props.customTemplates && props.customTemplates['roles']}/>
        </DataTable>

    )
}