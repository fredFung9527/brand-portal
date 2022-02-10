## this is the stage one , also know as the build step

FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build

## this is stage two , where the app actually runs

FROM node:16-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install --only=production
COPY --from=0 /usr/src/app/.next ./.next
CMD npm start