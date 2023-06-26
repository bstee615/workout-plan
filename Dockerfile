# Use an official Node.js runtime as the build stage
FROM node:14 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container
COPY . .

# Build the app
RUN npm run build

# Use an official .NET runtime for the runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:5.0 AS runtime-stage

WORKDIR /app

# Copy the build output from the build stage
COPY --from=build-stage /app/build ./build

# Run the app
ENTRYPOINT ["dotnet", "run"]
