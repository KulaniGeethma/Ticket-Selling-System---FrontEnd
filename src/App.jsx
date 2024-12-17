import React, { useState, useEffect } from 'react';
import ConfigurationForm from './components/ConfigurationForm';
import TicketDisplay from './components/TicketDisplay';
import ControlPanel from './components/ControlPanel';
import LogDisplay from './components/LogDisplay';
import axios from 'axios';
import "./App.css";
import "./components/ConfigurationForm.css";
import "./components/LogDisplay.css";
import "./components/TicketDisplay.css";

const App = () => {
    const [ticketConfig, setTicketConfig] = useState(null);
    const [availableTickets, setAvailableTickets] = useState(0);
    const [logs, setLogs] = useState([]);
    const [isRunning, setIsRunning] = useState(false);

    const handleConfigSubmit = (config) => {
        setTicketConfig(config);
        setAvailableTickets(config.totalTickets);
        setLogs((prevLogs) => [...prevLogs, "Configuration updated."]);
    };

    const handleStartSystem = () => {
        if (!ticketConfig) {
            setLogs((prevLogs) => [...prevLogs, "Please configure the system before starting."]);
            return;
        }

        axios.post('http://localhost:8080/api/ticket-system/start', null, {
            params: {
                totalTickets: ticketConfig.totalTickets,
                ticketReleaseRate: ticketConfig.ticketReleaseRate,
                customerRetrievalRate: ticketConfig.customerRetrievalRate,
                maxTicketCapacity: ticketConfig.maxCapacity,
                noOfVendors: ticketConfig.numVendors,
                noOfCustomers: ticketConfig.numCustomers
            }
        }).then(() => {
            setIsRunning(true);
            setLogs((prevLogs) => [...prevLogs, "System started successfully."]);

            // Fetch logs from backend
            axios.get('http://localhost:8080/api/ticket-system/logs')
                .then((response) => {
                    setLogs(response.data);
                })
                .catch((error) => {
                    setLogs((prevLogs) => [...prevLogs, "Error fetching logs: " + error.message]);
                });
        }).catch((error) => {
            setLogs((prevLogs) => [...prevLogs, "Error starting the system: " + error.message]);
        });
    };

    const handleStopSystem = () => {
        axios.post('http://localhost:8080/api/ticket-system/stop')
            .then(() => {
                setIsRunning(false);
                setLogs((prevLogs) => [...prevLogs, "System stopped successfully."]);
            })
            .catch((error) => {
                setLogs((prevLogs) => [...prevLogs, "Error stopping the system: " + error.message]);
            });
    };

    const fetchData = () => {
        if (ticketConfig && isRunning) {
            axios.get('http://localhost:8080/api/tickets/status')
                .then((response) => {
                    setAvailableTickets(response.data.availableTickets);
                    setLogs((prevLogs) => [...prevLogs, "Ticket status updated."]);
                })
                .catch((error) => {
                    setLogs((prevLogs) => [...prevLogs, "Error fetching ticket status: " + error.message]);
                });
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchData, 5000); // Polling every 5 seconds
        return () => clearInterval(interval);
    }, [ticketConfig, isRunning]);

    return (
        <div className="container">
            <h1 className="my-4">Ticket Management System</h1>
            <ConfigurationForm onSubmit={handleConfigSubmit} onStartSystem={handleStartSystem} />
            <TicketDisplay availableTickets={availableTickets} maxCapacity={ticketConfig?.maxCapacity} />
            <ControlPanel onStart={handleStartSystem} onStop={handleStopSystem} isRunning={isRunning} />
            <LogDisplay logs={logs} />
        </div>
    );
};

export default App;
