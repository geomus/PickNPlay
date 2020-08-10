import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarItem from './SidebarItem.js';

function Sidebar(props) {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

            {/*<!-- Sidebar - Brand -->*/}
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                <div className="sidebar-brand-icon">
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="sidebar-brand-text mx-3">Admin</div>
            </a>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider my-0"/>

            {/*<!-- Nav Item - Dashboard -->*/}
            <NavLink exact to='/dashboard'> <SidebarItem active={true} icon='fa-tachometer-alt' text='Inicio'/></NavLink>

            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider"/>

            {/*<!-- Heading -->*/}
            <div className="sidebar-heading">Menú</div>

            {/*<!-- Nav Item - Pages -->*/}
            <NavLink exact to='/dashboard/providers'> <SidebarItem active={false} icon='fa-fw fa-folder' text='Proveedores'/></NavLink>

            {/*<!-- Nav Item - Tables -->*/}
            <NavLink exact to='/dashboard/products'> <SidebarItem active={false} icon='fas fa-fw fa-table' text='Solo Productos'/></NavLink>


            {/*<!-- Divider -->*/}
            <hr className="sidebar-divider d-none d-md-block"/>
        </ul>

    );
}

export default Sidebar;