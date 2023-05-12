# Stage 1: Build the app
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install -g typescript && npm install --production --silent
COPY . .
RUN npm run build

# Stage 2: Run the app
FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --production --silent
EXPOSE 4000
CMD ["npm", "start"]
