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
   git clone https://github.com/amal-ouerfelli/MadBox.git
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

## Some screenshots & explanations

It's about a race between two players, that's why two players should connect from two differents browsers.

 This is the first screen when the player should input his username to start the game:
<img width="905" alt="Capture1" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/d7526844-73e2-44eb-923d-595fd6d51f7c">

When connecting, we have this screen displaying total points and list of connected players...
The player who connect first will start playing
<img width="917" alt="Capture2" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/5aafc4cf-22d1-4dec-adfe-85e8cdd19032">

The other player should wait his turn that's why the input zone is disabled and the play button is not clickable:
<img width="901" alt="Capture3" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/1cf7a73c-cb2b-4170-a1e9-3869d328a7d8">

Total points updates in real time as well as total of good and wrong answers:
<img width="870" alt="Capture4" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/680ab504-65ce-4e56-93bf-0a46bef7f780">

When the player click on the total points, the answers history is displayed:
<img width="865" alt="Capture5" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/9f34874c-9cf1-4082-8335-54fc1bb98ba7">

When one player's score reached 0 or 20, the game will end and a modal displaying the winner is displayed.

When a user navigate to a page different to http://localhost:3000, a page 404 not found is displayed:
<img width="918" alt="Capture6" src="https://github.com/amal-ouerfelli/MadBox/assets/72826619/75b68cee-d6e9-4927-89b5-89c6180b50db">
