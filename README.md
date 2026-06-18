# URL Shortener

## Project Overview

This repository contains a URL shortening service split into two folders:
- `Backend/` - Express + MongoDB API for creating and redirecting short URLs
- `Frontend/` - placeholder for the UI (not documented or implemented yet)

> The project is currently incomplete. The backend implementation exists and can create short URLs and redirect users to the original URL. The frontend is not yet completed.

---

## Backend Technical Documentation

### Architecture

The backend follows a modular structure with separate folders for configuration, routes, controllers, services, data access, models, and utilities.

```
Backend/
  package.json
  server.js
  src/
    app.js
    config/
      config.js
      db.js
    controller/
      shortUrl.controller.js
    dao/
      shortUrl.dao.js
    models/
      shortUrl.model.js
    routes/
      shortUrl.routes.js
    services/
      shortUrl.service.js
    utils/
      helper.js
      errorHandler.js
```

### Entry Point

- `Backend/server.js`
  - Imports Express app from `src/app.js`
  - Loads environment configuration from `src/config/config.js`
  - Connects to MongoDB via `src/config/db.js`
  - Starts the HTTP server on the port defined by `PORT`

### Express App

- `Backend/src/app.js`
  - Creates the Express app
  - Registers JSON and URL-encoded parsers
  - Mounts the URL route module at the root path
  - Registers centralized error-handling middleware after routes

### Routing

- `Backend/src/routes/shortUrl.routes.js`
  - `POST /api/create` - Create a new shortened URL
  - `GET /:shortUrl` - Redirect to the original URL if the short code exists

### Controller Layer

- `Backend/src/controller/shortUrl.controller.js`
  - `createShortUrl(req, res)`
    - Validates `url` in the POST request body
    - Calls `createShortUrlWithoutUserService(url)`
    - Returns the generated short URL using the configured `APP_URL`
  - `redirectToFullUrl(req, res)`
    - Reads `shortUrl` from route params
    - Uses DAO to look up the original URL and increment click count
    - Redirects to the original URL or returns 404 if not found

### Service Layer

- `Backend/src/services/shortUrl.service.js`
  - `createShortUrlWithoutUserService(url)`
    - Generates a 7-character nanoid
    - Validates generated short ID and propagates errors
    - Saves the shortened URL via DAO
  - `createShortUrlWithUserService(url, userId)`
    - Similar to the non-user service but includes a `userId` field
    - Also validates generated short ID and propagates errors

### Data Access Layer (DAO)

- `Backend/src/dao/shortUrl.dao.js`
  - `saveShortUrl(url, shortUrl, userId)`
    - Creates a new `ShortUrlModel` document with `fullUrl`, `shortUrl`, and optional `user`
    - Saves it to MongoDB
    - Throws a `ConflictError` when a duplicate short code is detected
  - `findUrlFromShortUrl(shortUrl)`
    - Finds the URL document by its short code
    - Increments the `clicks` counter using `findOneAndUpdate`
    - Throws `NotFoundError` when the code does not exist
    - Returns `fullUrl`

### Mongoose Model

- `Backend/src/models/shortUrl.model.js`
  - Defines the `ShortUrl` schema with fields:
    - `fullUrl` - required string
    - `shortUrl` - required, unique, indexed string
    - `clicks` - number defaulting to `0`
    - `user` - optional ObjectId referencing `User`

### Utilities

- `Backend/src/utils/helper.js`
  - Exposes `generateNanoid(length)` using the `nanoid` package
  - Used by services to create short URL strings
- `Backend/src/utils/errorHandler.js`
  - Defines `AppError` and specialized error classes (`BadRequestError`, `NotFoundError`, `ConflictError`, `UnauthorizedError`)
  - Provides centralized Express error middleware that returns structured JSON error responses

### Configuration

- `Backend/src/config/config.js`
  - Loads environment variables with `dotenv`
  - Validates required values: `PORT`, `MONGO_URI`, `APP_URL`
  - Exports a config object for use by the app
- `Backend/src/config/db.js`
  - Connects to MongoDB with Mongoose using `MONGO_URI`
  - Logs success or exits the process on failure

### Dependencies

- `express` - HTTP server and routing
- `mongoose` - MongoDB ODM
- `dotenv` - Environment variables
- `nanoid` - Short unique ID generation

### Environment Variables

The backend requires the following environment variables:

- `PORT` - port for the Express server
- `MONGO_URI` - MongoDB connection string
- `APP_URL` - public base URL used when returning short links

Example `.env` file:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener
APP_URL=http://localhost:3000
```

### How to Run

From `Backend/`:

```bash
npm install
npm run dev
```

### Current Limitations / Incomplete Areas

- No frontend implementation is documented in this README
- There is no authentication or user management in place
- The `User` reference exists in the schema but no `User` model or user routes are implemented
- There is no validation of URL format beyond presence
- There are no tests, error handling is minimal, and no production deployment documentation is provided

### Future Improvements

- Add frontend UI in `Frontend/`
- Implement user registration/login and authenticated URL creation
- Add URL format validation and duplicate short code handling
- Add rate limiting, logging, and production-ready error handling

---

## Notes

This README documents the current backend modules and their relationships. The application is a work in progress and the structure may expand as user management and frontend features are added.
