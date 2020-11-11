FROM node:14 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:14 AS deps
WORKDIR /app
COPY .npmrc .
COPY package*.json ./
RUN npm install --only=production

FROM  node:14-alpine
ENV NODE_ENV production
WORKDIR /usr/src/app
# COPY --from=deps /app/node_modules/ ./node_modules/
COPY --from=build /app/package.json .
COPY --from=build /app/build/ ./
ENTRYPOINT [ "node", "app.js" ]
