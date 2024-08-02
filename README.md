Live Streaming Server with User Authentication
Project Overview
This project is a live streaming server with user authentication. It includes both backend and frontend components:

Backend: Manages user authentication and streaming data.
Frontend: Provides a user interface for logging in, registering, and streaming.


Table of Contents
Features
Setup
Backend
Frontend
Usage
Deployment
Contributing




Features
User Authentication: Register and log in users.
Live Streaming: Stream live video and allow multiple viewers.
Responsive Design: Frontend is responsive and mobile-friendly.



Setup
Backend Setup
Clone the Repository

bash
Copy code
git clone https://github.com/sahyuvraj/Live-Streaming-Server-with-User-Authentication.git
cd Live-Streaming-Server-with-User-Authentication/backend
Install Dependencies

bash
Copy code
npm install
Configure Environment Variables

Create a .env file in the backend directory with the following content:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Start the Server

bash
Copy code
npm start
Frontend Setup
Navigate to the Frontend Directory

bash
Copy code
cd Live-Streaming-Server-with-User-Authentication/frontend
Install Dependencies

bash
Copy code
npm install
Update package.json

Ensure the scripts section of your package.json includes:

json
Copy code
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build && cpx \"build/**/*\" dist",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
Create .env File

Create a .env file in the frontend directory with:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the Frontend

bash
Copy code
npm start
Usage
Register a New User

Go to http://localhost:3000/register to register a new account.
Log In

Go to http://localhost:3000/ to log in with your credentials.
Start Streaming

After logging in, go to http://localhost:3000/streaming to start streaming.
View Stream

Navigate to http://localhost:3000/viewer to watch the live stream.
Deployment
Build the Frontend

bash
Copy code
npm run build
This will create a dist directory for deployment.

Deploy the Backend and Frontend

Deploy the backend and frontend folders to your hosting provider Render.

Contributing
Feel free to submit issues or pull requests if you find bugs or have improvements!

Replace https://github.com/sahyuvraj/Live-Streaming-Server-with-User-Authentication.git with the actual repository URL and adjust any other placeholders as needed.






