# Translation Game

## Table of Contents
- [Installation & Setup](#installation--setup)
- [Starting the Application](#starting-the-application)
- [Technical Choices](#technical-choices)
- [Improvements](#improvements)
- [Development Time](#development-time)

## Installation & Setup

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)

### Clone the repository
    ```bash
   git clone https://github.com/your-username/translation-game.git 
       ```
### Backend Setup

1. Navigate to the server directory:
    ```bash
   cd backend
    ```
2. Install the dependencies:
    ```bash
   npm i
    ```

### Frontend Setup
1. Navigate to the client directory:
    ```bash
   cd frontend
   ```
2. Install the dependencies:
    ```bash
   npm i
   ```

## Starting the application

1. Ensure that the backend server is running:
    ```bash
   cd backend
   npm run dev
   ```
The server will run on http://localhost:7000
2. In a separate terminal, start the frontend:
    ```bash
   cd frontend
   npm start
       ```

The client will run on http://localhost:3000

3. Open your web browser and navigate to http://localhost:3000.

## Technical Choices

### Backend

1. Express: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

2. Socket.io: Enables real-time bidirectional event-based communication. It was used to manage real-time updates for player connections and turns.

3. Mongoose: An ODM (Object Data Modeling) library for MongoDB and Node.js. It provides a straightforward, schema-based solution to model application data.


### Frontend
1. React: A JavaScript library for building user interfaces. It allows for the creation of reusable UI components.

2. Socket.io-client: The client-side library for Socket.io, enabling real-time communication with the server.

### Why these choices?

1. Ease of Development: Using Express, React, and Socket.io together simplifies the development of real-time applications.

2. Scalability: This stack is scalable and suitable for building real-time applications with interactive user interfaces.

3. Community and Support: All chosen technologies have large communities and good documentation, which helps in finding solutions to any issues quickly.

## Improvements

### Current limitations

1. Scalability: As the number of players grows, the server might face performance issues.

2. Error Handling: Improved error handling and validation are needed both on the server and client sides.

3. Game Logic: Currently, the game logic is simplistic. More complex rules and features can be added.

### Suggested Improvements
1. Unit Tests: Add unit tests to ensure the reliability of both backend and frontend code.

2. UI/UX Enhancements: Improve the user interface and experience with better design and usability features.

3. Security: Implement authentication and authorization to secure player data and game sessions.

## Development Time
It took approximately 25 hours to build this application. The time was spent on the following tasks:

1. Backend Development: 6 hours
2. Frontend Development: 11 hours
3. Testing and Debugging: 5 hours
4. Documentation: 3 hours
