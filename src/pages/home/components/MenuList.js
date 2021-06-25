import React from 'react';
import {MenuItem} from './MenuItem';
import  './MenuList.css';

export function MenuList(props){
    const {menus} = props;
    const items = menus.map(menu => <MenuItem key={menu.id} menu={menu}/>)
    return (
        <div>
            <h1 style={{textAlign:"center"}}>MENU</h1>
            <div className="menu-list">
                {items}
            </div>
        </div>
    )
}