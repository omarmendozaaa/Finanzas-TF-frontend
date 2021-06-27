import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import MainBody from '../MainBody/MainBody';

function DashBody({user, showError, logout}) {
    return (
        <div className="container-body">
            <Sidebar/>
            <MainBody user={user} showError={showError} logout={logout}/>
        </div>
    );
}

export default DashBody;