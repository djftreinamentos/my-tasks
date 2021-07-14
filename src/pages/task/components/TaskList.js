import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column'

export function TaskList(props){
    const records = props.records || [];
    return (
        <DataTable value={records}>
            <Column field="id"  header="Code" style={{with:"100%",textAlign:"center"}} body={props.customTemplates && props.customTemplates['id']}/>
            <Column field="title"  header="Título" body={props.customTemplates && props.customTemplates['title']}/>
            <Column field="createdAt"  header="Data de Criação" body={props.customTemplates && props.customTemplates['createdAt']}/>
            <Column field="status"  header="Situação" body={props.customTemplates && props.customTemplates['status']}/>
        </DataTable>

    )
} 
