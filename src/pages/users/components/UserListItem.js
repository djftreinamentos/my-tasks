import React from 'react';

export default function UserListItem(props){
    const user = props.user;
    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.roles.join(", ")}</td>
        </tr>
    )
}