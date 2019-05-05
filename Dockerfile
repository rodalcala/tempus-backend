# Load node server
FROM node:10

# Change working dir to /app
WORKDIR /app

# Add files from current to /app
COPY package.json ./

# Install node packages
RUN npm install

# Copy all other server files
COPY . .

# Install nodemon
RUN npm install nodemon -g

# Run the build
CMD [ "npm", "start" ];

# Expose the port
EXPOSE 4000