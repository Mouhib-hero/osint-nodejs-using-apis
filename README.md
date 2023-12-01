# DevOps Project & OSINT Cybersecurity Project README

This project is a DevOps exercise that involves Kubernetes, Docker, and a Node.js application. It demonstrates how to containerize and deploy a Node.js application using Kubernetes.

## Application Files
- `app.js`: Node.js application code for the web service.
- `apitest.py`: Python script for testing APIs.
- `netlas_api.py`: Python script to interact with the Netlas API.
- `reverse_image_search.py`: Python script to perform reverse image searches.
- `whois_api.py`: Python script to fetch WHOIS information.

## API Keys
API keys are stored in a JSON file: `API_keys.json`. You can update the API keys by running the application and using the `/modify-api-keys` route.

## Dockerfile
A Dockerfile named `Dockerfile` is provided for containerizing the Node.js application. It uses Node.js 14 as the base image and installs application dependencies. The application runs on port 3090.

## Building the Docker Image
To build the Docker image, use the following command:

```bash
docker build -t my-node-app .
```

## Running the Docker Container
To run a container from the Docker image, use:

```bash
docker run -p 3090:3090 my-node-app
```
The Node.js application will be accessible at http://localhost:3090 in your web browser.

## Kubernetes Deployment (Future Steps)

This README provides the setup for containerization and local testing. The next steps involve deploying the application on a Kubernetes cluster. Detailed instructions for creating a Kubernetes deployment configuration and deploying the application will be provided in subsequent documentation.

## Contact
For any questions or assistance, please contact me.
