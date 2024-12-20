# Wallet and Transaction Management System
proof of concept to evaluate development skills in building a full-stack application.

This project is wallet and transaction management system built with:
- Backend: NestJS SQL PostgreSQL, and MongoDB.
- Frontend: Vue.js

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Prerequisites
### Frontend:
- Node.js (v16+)
- npm 

#### Key Dependencies
   1. Vue.js (vue): Main framework.
    2. Vue Router (vue-router): For routing in the app.
    3. Vuex (vuex): State management.
    3. Axios: For making HTTP requests.
    4. Chart.js & Vue-Chart.js: For rendering charts.
    5. JWT Decode (jwt-decode): To decode JWT tokens.
    6. Tailwind CSS: For styling.
    7. @vue/cli-service: Vue CLI for building and serving the app.
    8. PostCSS and Autoprefixer: For CSS processing.
    9. ESLint and Prettier: For code linting and formatting.

## Installation
1. Clone the repository:
   ```bash
   git clone 
   cd repo-name

2. Front-end installation:
- Go to the front-end directory `cd /wallet-app` 
- Install dependencies: ` npm install` 
- Run the development server: `npm run serve` 
- Access login page from: `http://localhost:8080/signin`
- Access signup page from: `http://localhost:8080/signup`
- Access dashboard page from: `http://localhost:8080/dashboard`
- Access transactions page from: `http://localhost:8080/transactons`

Note to be able to test you need to have the backend server and redis up and running

## features
- this allows User to:
1. signup
2. signin
3. create a new wallet, with different currrancies. 
4. send money to other wallets with real time currancy convertion rates.
5. View Incoming, and Outoging Transactions.
6. dashboard with the following features:
- Calcaulate Available Balance of all wallets IN USD.
- Calcaulate Incoming of this Month in USD.
- Calcaulate Outgoing of this Month in USD.
- an interactive financial graph shows the Incoming and Outgoing for the last 7 days.
- a Quick look into recent Transactions.



