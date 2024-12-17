import React, { useState } from 'react';
import axios from 'axios';

const ConfigurationForm = ({ onSubmit, onStartSystem }) => {
    const [totalTickets, setTotalTickets] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [retrievalRate, setRetrievalRate] = useState('');
    const [releaseRate, setReleaseRate] = useState('');
    const [numVendors, setNumVendors] = useState('');
    const [numCustomers, setNumCustomers] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            totalTickets,
            maxCapacity,
            retrievalRate,
            releaseRate,
            numVendors,
            numCustomers
        });
    };

    const handleStart = () => {
        // Call the backend API to start the system
        axios.post('http://localhost:8080/api/ticket-system/start', null, {
            params: {
                totalTickets,
                ticketReleaseRate: releaseRate,
                customerRetrievalRate: retrievalRate,
                maxTicketCapacity: maxCapacity,
                noOfVendors: numVendors,
                noOfCustomers: numCustomers
            }
        })
        .then((response) => {
            // Fetch the logs after the system starts
            axios.get('http://localhost:8080/api/ticket-system/logs')
                .then((logResponse) => {
                    onStartSystem(logResponse.data); // Pass logs to the parent
                })
                .catch((error) => {
                    console.error('Error fetching logs', error);
                });
        })
        .catch((error) => {
            console.error('Error starting the system', error);
        });
    };
    
    const handleStop = () => {
        // Call the backend API to stop the system (similar to the start system)
        axios.post('http://localhost:8080/api/ticket-system/stop')
            .then((response) => {
                onStartSystem(response.data); // Pass the log message to the parent
            })
            .catch((error) => {
                console.error('Error stopping the system', error);
            });
    };

    return (
        <div className="card">
            <div className="card-header"><h2>Configuration Settings</h2></div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    {/* Configuration fields */}
                    <div className="form-group">
                        <label>Total Tickets :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={totalTickets}
                            onChange={(e) => setTotalTickets(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Maximum Ticket Capacity :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={maxCapacity}
                            onChange={(e) => setMaxCapacity(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Customer Retrieval Rate :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={retrievalRate}
                            onChange={(e) => setRetrievalRate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Ticket Releasing Rate :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={releaseRate}
                            onChange={(e) => setReleaseRate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Vendors :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={numVendors}
                            onChange={(e) => setNumVendors(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Number of Customers :</label>
                        <input
                            type="number"
                            className="form-control"
                            value={numCustomers}
                            onChange={(e) => setNumCustomers(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className='Buttons'>
                        <button type="submit" className="submit">Submit</button>
                        <button type="button" className="start" onClick={handleStart}>Start</button>
                        <button type="button" className="stop" onClick={handleStop}>Stop</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
};

export default ConfigurationForm;
