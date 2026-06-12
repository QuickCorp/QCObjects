# QCObjects Docker Image Overview

The QCObjects Docker image (qcobjects/qcobjects) provides a streamlined environment for developing and deploying applications using the QCObjects framework. This image includes all necessary dependencies and tools to get started quickly.
Key Features:
- Base Images: Utilizes alpine/git, alpine/openssl, certbot/certbot, and docker/extension-npm-installer for a lightweight and secure foundation.
- Node.js Environment: Built on node:lts-alpine to ensure compatibility with the latest long-term support version of Node.js.
- QCObjects Tools: Pre-installed with qcobjects, qcobjects-sdk, and qcobjects-cli for seamless development.
How to Run:
- Pull the Image:

```sh
docker pull qcobjects/qcobjects
```

- Run a Container:

```sh
docker run -it qcobjects/qcobjects
```


This setup ensures a consistent and efficient development experience, making it easier to build and deploy enterprise applications with QCObjects.

## Instructions to Create Your Own Docker Image `qcobjects_newapp`

Based on the provided Dockerfile, here are the steps to create your own Docker image `qcobjects_newapp` using the QCObjects Docker image (`qcobjects/qcobjects`):

1. **Create a Dockerfile:**
   Create a new file named `Dockerfile` in your project directory with the following content:

   ```dockerfile
   FROM qcobjects/qcobjects:latest

   USER root

   ENV XDG_RUNTIME_DIR $(id -u)
   ENV container docker
   ENV LC_ALL C
   ENV DEBIAN_FRONTEND noninteractive

   LABEL MAINTAINER "Jean Machuca <jean@qcobjects.com>"
   LABEL Author "Jean Machuca <jean@qcobjects.com>"
   LABEL org.opencontainers.image.authors="Jean Machuca <jean@qcobjects.com>"
   ENV container docker

   RUN npm i -g qcobjects qcobjects-sdk qcobjects-cli

   # Configure the internal user permissions
   RUN mkdir -p /home/qcobjects/app && chown -R qcobjects:qcobjects /home/qcobjects/app

   # Setting the work directory
   WORKDIR /home/qcobjects/app
   ENV DOCUMENT_ROOT /home/qcobjects/app/
   ENV DATA_PATH $DOCUMENT_ROOT/data/
   COPY package*.json ./

   # Run the initial install init scripts for jasmine and cache verify
   # RUN jasmine init
   RUN npm cache verify
   RUN npm i

   # Bundle app source
   COPY --chown=qcobjects:qcobjects . .

   USER qcobjects

   EXPOSE 8080:8080
   EXPOSE 8443:8443

   CMD [ "npm", "start" ]
   ```

2. **Build the Docker Image:**
   Open a terminal in your project directory and run the following command to build your Docker image:

   ```sh
   docker build -t qcobjects_newapp .
   ```

3. **Run the Docker Container:**
   Once the image is built, you can run a container using the following command:

   ```sh
   docker run -it -p 8080:8080 -p 8443:8443 qcobjects_newapp
   ```

This will start your application using the QCObjects framework within a Docker container, making it easy to develop and deploy your enterprise applications.

## Instructions to Use Docker Compose with QCObjects Docker Image

Based on the provided `docker-compose` file, here are the steps to use Docker Compose to create and build your own Docker image `qcobjects_newapp`:

1. **Create a Dockerfile:**
   Ensure you have a `Dockerfile` in your project directory with the following content:

   ```dockerfile
   FROM qcobjects/qcobjects:latest

   USER root

   ENV XDG_RUNTIME_DIR $(id -u)
   ENV container docker
   ENV LC_ALL C
   ENV DEBIAN_FRONTEND noninteractive

   LABEL MAINTAINER "Jean Machuca <jean@qcobjects.com>"
   LABEL Author "Jean Machuca <jean@qcobjects.com>"
   LABEL org.opencontainers.image.authors="Jean Machuca <jean@qcobjects.com>"
   ENV container docker

   RUN npm i -g qcobjects qcobjects-sdk qcobjects-cli

   # Configure the internal user permissions
   RUN mkdir -p /home/qcobjects/app && chown -R qcobjects:qcobjects /home/qcobjects/app

   # Setting the work directory
   WORKDIR /home/qcobjects/app
   ENV DOCUMENT_ROOT /home/qcobjects/app/
   ENV DATA_PATH $DOCUMENT_ROOT/data/
   COPY package*.json ./

   # Run the initial install init scripts for jasmine and cache verify
   # RUN jasmine init
   RUN npm cache verify
   RUN npm i

   # Bundle app source
   COPY --chown=qcobjects:qcobjects . .

   USER qcobjects

   EXPOSE 8080:8080
   EXPOSE 8443:8443

   CMD [ "npm", "start" ]
   ```

2. **Create a `docker-compose.yml` File:**
   Create a `docker-compose.yml` file in your project directory with the following content:

   ```yaml
   version: '3'
   services:
     qcobjects:
       image: qcobjects_newapp:latest
       hostname: qcobjects_newapp
       command: ["npm", "run", "start"]
       privileged: true
       build:
         context: ./
         dockerfile: Dockerfile
       volumes:
         - ./letsencrypt:/etc/letsencrypt/live/newapp.qcobjects.dev
         - ./data:/home/qcobjects/app/data
       expose:
         - 8080:8080
         - 8443:8443
         - 10300:10300
       ports:
         - 8080:8080
         - 8443:8443
         - 10300:10300
       env_file:
         - ./.env
   ```

3. **Environment Variables:**
   Create a `.env` file in your project directory to define environment variables. This file might include variables such as:

   ```env
   NODE_ENV=production
   PORT=8080
   SSL_PORT=8443
   ```

4. **Build and Run the Docker Compose Setup:**
   Open a terminal in your project directory and run the following commands:

   ```sh
   # Build the Docker image
   docker-compose build

   # Start the services
   docker-compose up
   ```

## Explanation of Environment Variables and Settings:

- **`NODE_ENV`**: Specifies the environment in which the application is running (e.g., `development`, `production`).
- **`PORT`**: The port on which the application will run (default is `8080`).
- **`SSL_PORT`**: The port for SSL connections (default is `8443`).

## Volumes:
- **`./letsencrypt:/etc/letsencrypt/live/newapp.qcobjects.dev`**: Maps the local `letsencrypt` directory to the container's directory for SSL certificates.
- **`./data:/home/qcobjects/app/data`**: Maps the local `data` directory to the container's data directory.

## Ports:
- **`8080:8080`**: Maps port `8080` on the host to port `8080` in the container.
- **`8443:8443`**: Maps port `8443` on the host to port `8443` in the container.
- **`10300:10300`**: Maps port `10300` on the host to port `10300` in the container.

These steps will help you set up and run your QCObjects application using Docker Compose, ensuring a consistent and efficient development environment.