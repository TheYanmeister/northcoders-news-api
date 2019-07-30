# northcoders-news-api

## Getting Started

Link to the hosted version: https://a-real-spiffing-ncnews.netlify.com  
Link to the hosted back-end api: https://the-best-nc-news-app.herokuapp.com/api  
Link to the front-end repository: https://github.com/TheYanmeister/FEND-nc-news-react-app  
Link to the back-end repository: https://github.com/TheYanmeister/northcoders-news-api

## Endpoints Breakdow

"/" will just respond with a message of "ok"  
"/articles" will take a GET or POST request  
"/articles/:article_id" will take a GET or PATCH request  
"/articles/:article_id/comments" will take a GET or POST request

"/comments/:comment_id" will take a PATCH or DELETE request

"/topics" will take a GET request

"/users/:username" will take a GET request

## Prerequisite

You must have node and Postgresql installed.

## Installing

Navigate to where you want to clone the repo to and run

```
git clone https://github.com/TheYanmeister/northcoders-news-api.git
```

followed by

```
cd northcoders-news-api
```

and

```
npm install
```

you will then need to add a knexfile.js to the root directory by running

```
touch knexfile.js
```

you will then need to open it and input the necessary details, it should look something like this:

```
const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";

const baseConfig = {
  client: "",
  migrations: {
    directory: "./db/migrations"
  },
  seeds: {
    directory: "./db/seeds"
  }
};

const customConfigs = {
  development: {
    connection: {
      database: ""
    }
  },
  test: {
    connection: {
      database: ""
    }
  },
  production: { connection: `${DB_URL}?ssl=true` }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

## Running a Local Version

After following the instruction for the installation run the scripts:

```
npm run setup-dbs
```

```
npm run seed
```

```
npm run dev
```

## Available Scripts

Create development and test databases locally:

```bash
npm run setup-dbs
```

Create a new migration file:

```bash
npm run migrate-make <filename>
```

Run all migrations:

```bash
npm run migrate-latest
```

Rollback all migrations:

```bash
npm run migrate-rollback
```

Run tests:

```bash
npm run app-test
```

```bash
npm run utils-test
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```

# Author

Yannick van der Heiden
