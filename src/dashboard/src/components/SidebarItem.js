import React from 'react';

function SidebarItem(props) {
    return (
    <li className={`nav-item ${props.active ? 'active' : ''}`}>
        <a className="nav-link" href={props.url}>
            <i className={`fas ${props.icon}`}></i>
        <span>{props.text}</span></a>
    </li>
    );
}

export default SidebarItem;