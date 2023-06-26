# Workout tracker

This is a simple workout app for tracking sets with a partner.
Written with ChatGPT 4.

# Workout Tracker Web App

The Workout Tracker Web App is a web application built for tracking reps and sets during workouts. It allows users to track their progress and synchronize their data in real-time.

## Architecture

The application consists of two main components:

1. **Frontend**: The frontend is built using React and provides the user interface for tracking reps and sets. It uses WebSocket communication to sync data with the backend.

2. **Backend**: The backend is built using .NET Core and provides the server-side functionality for handling WebSocket connections and syncing data between clients. It uses the SignalR library for real-time communication.

## Prerequisites

To run the Workout Tracker Web App, you need to have the following installed:

- Node.js (v14 or later)
- .NET Core SDK (v5.0 or later)
- Docker (optional, for containerized deployment)

## Getting Started

Follow these steps to get the application up and running:

```bash
# Clone the repository:
git clone https://github.com/your-username/workout-tracker.git
cd workout-tracker

# Install frontend dependencies:
cd workout-tracker
npm install

# Install backend dependencies:
cd ..
dotnet restore

# Build the frontend and backend:
cd ClientApp
npm run build
cd ..
dotnet build

# Run the application:
dotnet run
```

## Docker Deployment (optional)

To deploy the application using Docker, make sure you have Docker installed on your machine. Then, follow these steps:

```bash
# Build the Docker image:
docker build -t workout-tracker .

# Run the Docker container:
docker run -p 8080:80 workout-tracker
```

The application will be accessible at http://localhost:8080.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.
License

This project is licensed under the MIT License.
