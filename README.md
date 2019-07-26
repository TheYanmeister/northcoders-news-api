# northcoders-news-api

## Getting Started

Link to the hosted version: https://a-real-spiffing-ncnews.netlify.com  
Link to the front-end repository: https://github.com/TheYanmeister/FEND-nc-news-react-app  
Link to the back-end repository: https://github.com/TheYanmeister/northcoders-news-api

# Prerequisite

You must have npm and Postgresql installed.

## Installing

Go to the github repo via the link and copy the clone link.
Navigate to where you want to clone the repo to and run

```
git clone url-here
```

followed by

```
npm install
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

Rollback, migrate -> latest, then start inserting data into the database:

```bash
npm run seed
```

Run the server with `nodemon`, for hot reload:

```bash
npm run dev
```

Run the server with `node`:

```bash
npm start
```
