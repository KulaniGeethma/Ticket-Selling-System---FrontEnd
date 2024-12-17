// TicketDisplay.jsx
import React from 'react';
import './TicketDisplay.css'; // Import CSS for custom styling

const TicketDisplay = ({ availableTickets, maxCapacity }) => {
    return (
        <div className="ticket-display-container">
            <div className="ticket-display-box">
                <h2>Ticket Availability</h2>
                <p>Total Tickets : {availableTickets}</p>
                <p><>Max Capacity: </>{maxCapacity}</p>
                <p><>Status: </>{availableTickets > 0 ? "Tickets Available" : "Availability" }</p>
            </div>
        </div>
    );
};

export default TicketDisplay;
