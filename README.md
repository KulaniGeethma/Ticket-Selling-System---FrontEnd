# TicketSellingSystem-UI
A ticket selling system.
# Ticket System Simulation

A multithreaded ticket system simulation built using Java and Spring Boot. The application simulates vendors adding tickets to a ticket pool and customers retrieving them, showcasing concurrency management in a shared resource.

## Features

- **Multithreading**: Uses separate threads for vendors and customers.
- **Concurrency Management**: Handles shared resources (`TicketPool`) using synchronized methods and `wait/notify`.
- **Spring Boot Integration**: Provides REST APIs to control the ticket system.
- **Logging**: Maintains a log of all system activities.
- **Customizable Parameters**: Configurable number of tickets, vendors, customers, and rates.

## Technologies Used

- **Java**: Core language for business logic.
- **Spring Boot**: Backend framework for REST API development.
- **JPA (Java Persistence API)**: To save configuration details to the database.
- **H2 Database**: Lightweight in-memory database for development/testing.
- **Maven**: For dependency management and building the project.

## System Design

1. **Vendor**: Adds tickets to the shared `TicketPool` at a specified rate.
2. **Customer**: Retrieves tickets from the `TicketPool` at a specified rate.
3. **TicketPool**: Manages tickets with a maximum capacity, using `wait` and `notify` to handle full or empty states.

### Key Classes

- `Ticket`: Represents a single ticket.
- `TicketPool`: Shared resource for managing tickets.
- `Vendor`: Adds tickets to the pool (runs in its thread).
- `Customer`: Removes tickets from the pool (runs in its thread).
- `TicketSystemService`: Manages the lifecycle of the system.
- `TicketSystemController`: Provides REST APIs to control the system.

## Installation

### Prerequisites

- Java 17 or higher
- Maven 3.8+
- Spring Boot

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ticket-system-simulation.git
   cd ticket-system-simulation
