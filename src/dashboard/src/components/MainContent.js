import React from 'react';
import NavBar from './NavBar'
import DivCont from './DivCont'



function MainContent(props) {
    return (
        <div id='content'>
            <NavBar/>
            <DivCont/>
        </div>
    );
}

export default MainContent;