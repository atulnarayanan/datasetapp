# FROM nginx:1.21-alpine

# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx/conf.d

# build environment
FROM node:13.12.0-alpine as builder
WORKDIR /app/frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY ./frontend/package.json ./
COPY ./frontend/package-lock.json ./
RUN npm ci --silent
# RUN npm install react-scripts@3.4.1 -g --silent
COPY ./frontend/ ./
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/frontend/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]    
