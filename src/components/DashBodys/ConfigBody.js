import React from 'react';
import Header from "../Header/Header";
function ConfigBody({showError, logout }) {
    return (
        <div className="main-body">
        <Header showError={showError} logout={logout} />
      </div>
    );
}

export default ConfigBody;