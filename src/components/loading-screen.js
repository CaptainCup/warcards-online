import React from 'react';

export default function LoadingScreen() {
    return (
        <div className="welcome">
            <h1 className="welcome-text">WarCards</h1>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}