# :telephone_receiver: Phonebook
Basic personal adress book.

## :scroll: Dependencies
* Node.js (>= 8.8.0)
* npm (>= 5.4.2)
* PostgreSQL (>= 9.6)

## Installation

### Prerequisites
* Node.js & npm: https://nodejs.org/en/download/
* PostgreSQL: https://www.postgresql.org/download/
* Clone this repo

### Setup
* Run `npm install` in the repo directory.
* Create database in PostgreSQL.
* App is configured via environment variables contained in a file named `.env`.
Use the `.env.example` file as a template: `cp .env.example .env` and enter
configuration details.
* App database is running on [ElephantSQL](https://www.elephantsql.com/). 
Create [account](https://customer.elephantsql.com/login) and enter `DB_URL` 
`.env` variable which is given after registration. 
* For local database setup change configuration manually in: `server/database/index.js`

## :rocket: Launch

### Development
* Server: `npm run dev:server`
* Client (webpack dev server): `npm run dev:client`

### Production
* Bundle client by issuing `npm run build`
* `npm run start`

### Deployment
* App is deployed on Heroku.
* App preview: [Personal-phonebook](https://personal-phonebook.herokuapp.com/#/)

## Frameworks:
Express.js / Vue.js
