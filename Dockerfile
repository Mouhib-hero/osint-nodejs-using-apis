# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy all application files to the working directory
COPY . .

# Expose the port your application will run on
EXPOSE 3090

# Define the command to start your application
CMD [ "node", "app.js" ]
