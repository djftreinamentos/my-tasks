import React from 'react';
import { HistoryListItem } from './HistoryListItem';
export function HistoryList(props) {
    const items = props.history.map(item =>{
        return (
            <HistoryListItem 
                key={item.id} 
                item={item}
                onEditHistory={props.onEditHistory}
                onRemoveHistory={props.onRemoveHistory}
            />
        )
    })
    return (
        <div className="p-grid">
            <div className="p-col-12">
                {items}
            </div>
        </div>
    )
}
 