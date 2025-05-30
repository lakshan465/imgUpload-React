# Dockerfile for React frontend

#use node base img
FROM node:18-alpine AS build 

#setting working directory
WORKDIR /app 

#copy al files to /app directory
COPY . .

#innstall dependancy base on pkg.jsom
RUN npm install


ARG REACT_APP_BACKEND_URL
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL


#build the react app
RUN npm run build

# Use nginx to serve the built React app
FROM nginx:alpine

# result fo the npm run build command will be in /app/build
# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Remove default nginx config and use a custom one
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

