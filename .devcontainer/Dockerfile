# Base image for the container
FROM mcr.microsoft.com/devcontainers/base:ubuntu

# Install Docker CLI and other dependencies
RUN apt-get update && apt-get install -y \
    docker.io \
    docker-compose && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
