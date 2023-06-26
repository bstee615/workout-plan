# Use an official Node.js runtime as the build stage
FROM node:14 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY workout-tracker/package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY workout-tracker .

ENV PUBLIC_URL http://home.benjijang.com/workout/

# Build the app
RUN npm run build

# build dotnet part
# Use the .NET SDK as the build stage
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-dotnet-stage

WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build the application
RUN dotnet build -c Release --no-restore

# Publish the application
RUN dotnet publish -c Release --no-restore --output ./build

# Use an official .NET runtime for the runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime-stage

WORKDIR /app

COPY --from=build-stage /app/build ./wwwroot
COPY --from=build-dotnet-stage /app/build ./build

# Set the command to run the application
CMD ["dotnet", "./build/WorkoutTrackerBackend.dll"]
