import React from 'react';
import { Link } from 'react-router-dom';

export function MenuItem(props) {
    const { path, image, name } = props.menu;
    return (
        <Link to={path}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "10px" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                    <path d={image} />
                </svg>
                <p>{name}</p>
            </div>
        </Link>
    )
}