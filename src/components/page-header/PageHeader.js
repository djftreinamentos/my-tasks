import React from "react";
import { Card } from 'primereact/card';
import { Divider } from 'primereact/divider';
import './PageHeader.css';

export function PageHeader(props) {
    return (
        <div className="page-header">
            <Card>
                <div className="p-grid">
                    <div className="p-col-12">
                        <h1>{props.title}</h1>
                    </div>
                    <Divider />
                    <div className="p-col-12 toolbar">
                        {props.children}
                    </div>
                </div>
            </Card>
        </div>
    )
}
