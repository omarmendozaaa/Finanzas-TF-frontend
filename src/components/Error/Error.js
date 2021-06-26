import React from 'react';


export default function Error({ message, hideError }) {
  if (!message) {
    return null;
  }

  return (
    <div className="ErrorContainer" role="alert">
        <h1>Error</h1>
    </div>
  )
}