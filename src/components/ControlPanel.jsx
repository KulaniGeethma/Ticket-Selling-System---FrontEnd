import React, { useState } from 'react';

const ControlPanel = ({ onStart, onStop }) => {
    const [isRunning, setIsRunning] = useState(false);

    const handleStart = () => {
        onStart();
        setIsRunning(true);
    };

    const handleStop = () => {
        onStop();
        setIsRunning(false);
    };

    
};

export default ControlPanel;
