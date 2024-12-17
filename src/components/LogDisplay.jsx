import React from 'react';

const LogDisplay = ({ logs }) => {
    return (
      <div className="card-header-container">
        <div className="card-body-box">
          <h3>System Log</h3> 
          <ul className="list-group">
            {logs.map((log, index) => (
              <li key={index} className="list-group-item">{log}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  
  export default LogDisplay;
  

