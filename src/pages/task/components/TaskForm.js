import React from 'react';
import moment from 'moment';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';

import { Lookup } from './lookup/Lookup';
import './TaskForm.css';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { HistoryList } from './history-list/HistoryList';


export function TaskForm(props) {

    const footerHistoryDialog = (
        <div className="p-grid">
            <div className="p-col-12 p-justify-end">
                <Button style={{ width: "50px" }} icon="pi pi-plus" className="p-button p-button-success" onClick={props.onConfirmHistory} />
                <Button style={{ width: "50px" }} icon="pi pi-times" className="p-button p-button-danger" onClick={props.onCancelHistory} />
            </div>
        </div>
    )

    return (
        <div className="p-grid task-form p-justify-center">
            <div className="p-col-6">
                <div className="p-grid">
                    <div className="p-col-4" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Código</label>
                        <InputText value={props.record.id} readOnly name="id" />
                    </div>
                    <div className="p-col-8" style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="icon">Data de criação</label>
                        <Calendar name="createdAt" id="icon" value={props.record.createdAt} onChange={props.onChangeField} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-col-12">
                        <label>Usuário</label>
                        <Lookup
                            value={props.record.user && props.record.user.name ? props.record.user.name : ""}
                            show={props.lookupUser && props.lookupUser.show}
                            onShow={props.lookupUser && props.lookupUser.onShow}
                            onHide={props.lookupUser && props.lookupUser.onHide}
                            header={props.lookupUser && props.lookupUser.header}
                            footer={props.lookupUser && props.lookupUser.footer}
                        >
                            <div style={{ width: "100%", maxHeight: "400px", overflow: "auto" }}>
                                <DataTable value={props.lookupUser.records}
                                    selection={props.lookupUser.selection}
                                    onSelectionChange={props.lookupUser.onSelectionChange}
                                >
                                    <Column selectionMode="single" headerStyle={{ width: '3em' }}></Column>
                                    <Column field="id" header="Code" style={{ with: "100%", textAlign: "center" }} />
                                    <Column field="name" header="Nome" />
                                </DataTable>
                            </div>

                        </Lookup>
                    </div>

                    <div className="p-col-12" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Título</label>
                        <InputText name="title" value={props.record.title || ""} onChange={props.onChangeField} />
                    </div>
                    <div className="p-col-12" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Descrição</label>
                        <InputTextarea name="description" value={props.record.description || ""} onChange={props.onChangeField} />
                    </div>

                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="deliveryForecast">Data previsão de entrega</label>
                        <Calendar name="deliveryForecast" id="deliveryForecast" value={props.record.deliveryForecast} onChange={props.onChangeField} showIcon dateFormat="dd/mm/yy" />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label htmlFor="deliveredAt">Data de entrega</label>
                        <Calendar name="deliveredAt" id="deliveredAt" value={props.record.deliveredAt} onChange={props.onChangeField} showIcon dateFormat="dd/mm/yy" />
                    </div>

                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Tempo Previsto</label>
                        <InputNumber name="predictedTime" value={props.record.predictedTime || ""} onChange={(e) => { const event = { target: { value: e.value, name: "predictedTime" } }; props.onChangeField(event) }} mode="decimal" minFractionDigits={1} maxFracionDigits={1} step={0.5} min={0} showButtons />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Tempo utilizado</label>
                        <InputNumber name="duration" value={props.record.duration || ""} onChange={(e) => { const event = { target: { value: e.value, name: "duration" } }; props.onChangeField(event) }} mode="decimal" minFractionDigits={1} maxFracionDigits={1} step={0.5} min={0} showButtons />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Tipo de atividade</label>
                        <Dropdown name="type" value={props.record.type || ""} onChange={props.onChangeField} options={props.activityTypes} />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Situação</label>
                        <Dropdown name="status" value={props.record.status || ""} onChange={props.onChangeField} options={props.statusList} />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Prioridade</label>
                        <Dropdown name="priority" value={props.record.priority || ""} onChange={props.onChangeField} options={props.priorityList} />
                    </div>
                    <div className="p-col-6" style={{ display: "flex", flexDirection: "column" }}>
                        <label>Planejamento</label>
                        <Dropdown name="planningType" value={props.record.planningType || ""} onChange={props.onChangeField} options={props.planningTypeList} />
                    </div>
                    <div className="p-col-12">
                        <Button icon="pi pi-plus" className="p-button p-button-primary" onClick={props.onAddHistory} />
                        <Dialog
                            header={"Novo histórico"}
                            visible={props.showHistoryDialog}
                            style={{ width: '50vw' }}
                            footer={footerHistoryDialog}
                            onHide={props.onHideHistoryDialog}>
                            <div className="p-grid">
                                <div className="p-col-12">
                                    <div className="p-grid">
                                        <div className="p-col-4" style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Data</label>
                                            <InputText name="title" value={props.currentHistory && props.currentHistory.createdAt ? moment(props.currentHistory.createdAt).format('DD/MM/YYYY hh:mm') : ""} readOnly />
                                        </div>
                                    </div>
                                    <div className="p-grid">
                                        <div className="p-col-4" style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Usuário</label>
                                            <InputText name="title" value={props.currentHistory && props.currentHistory.user ? props.currentHistory.user.name: ""} readOnly />
                                        </div>
                                    </div>
                                    <div className="p-grid">
                                        <div className="p-col-12" style={{ display: "flex", flexDirection: "column" }}>
                                            <label>Descrição</label>
                                            <InputTextarea name="title" value={props.currentHistory ? props.currentHistory.description : ""} onChange={props.onChangeCurrentHistory} />
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </Dialog>
                    </div>
                    <div className="p-col-12">
                        <HistoryList
                            history={props.record.history}
                            onEditHistory={props.onEditHistory}
                            onRemoveHistory={props.onRemoveHistory}
                        />
                    </div>
                </div>

            </div>
        </div>
    )
}