# URL Shortener

## Project Overview

This repository contains a full stack URL shortening application with:
- `Backend/` - Express + MongoDB API for creating and redirecting short URLs
- `Frontend/` - React + Vite UI for submitting URLs and displaying the shortened link

The application lets users submit a long URL, generates a 7-character short code, stores it in MongoDB, and redirects users to the original URL when the short link is visited.

---

## Repository Structure

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
Frontend/
  package.json
  vite.config.js
  index.html
  .env
  src/
    App.jsx
    main.jsx
    index.css
    api/
      shortUrl.api.js
    components/
      UrlForm.jsx
    pages/
      HomePage.jsx
    utils/
      axiosInstance.js
```

---

## Backend Details

### Entry Point

- `Backend/server.js`
  - Loads environment variables and configuration
  - Connects to MongoDB via `src/config/db.js`
  - Starts the Express server on `PORT`

### Express App

- `Backend/src/app.js`
  - Sets up `cors`, JSON request parsing, and URL-encoded parsing
  - Mounts the URL route module at the application root
  - Applies centralized error-handling middleware

### Routes

- `POST /api/create`
  - Creates a new shortened URL from a JSON body containing `{ url }`
- `GET /:shortUrl`
  - Redirects to the original URL for a given short code

### Controller Layer

- `Backend/src/controller/shortUrl.controller.js`
  - `createShortUrl(req, res)`
    - Validates that `url` is provided
    - Calls the service to generate and save a short code
    - Returns the full shortened URL using `APP_URL`
  - `redirectToFullUrl(req, res)`
    - Looks up the long URL by the short code
    - Redirects the client to the original URL

### Service Layer

- `Backend/src/services/shortUrl.service.js`
  - Generates a 7-character short ID with `nanoid`
  - Calls DAO methods to persist the URL mapping
  - Returns the generated short code

### Data Access Layer

- `Backend/src/dao/shortUrl.dao.js`
  - `saveShortUrl(url, shortUrl, userId)`
    - Creates and saves a `ShortUrl` document
    - Handles duplicate short code conflicts
  - `findUrlFromShortUrl(shortUrl)`
    - Finds the stored URL by code and increments the `clicks` counter
    - Throws a 404-style error if not found

### Model

- `Backend/src/models/shortUrl.model.js`
  - Defines the `ShortUrl` schema with:
    - `fullUrl` (required string)
    - `shortUrl` (required unique string)
    - `clicks` (number, default `0`)
    - `user` (optional `ObjectId` reference to `User`)

### Utilities

- `Backend/src/utils/helper.js`
  - Generates unique short IDs using `nanoid`
- `Backend/src/utils/errorHandler.js`
  - Defines `AppError` and custom error subclasses
  - Provides Express error middleware for structured JSON responses

### Configuration

- `Backend/src/config/config.js`
  - Loads environment variables with `dotenv`
  - Requires `PORT`, `MONGO_URI`, and `APP_URL`
- `Backend/src/config/db.js`
  - Connects to MongoDB using Mongoose
  - Logs connection success or exits on failure

### Backend Dependencies

- `express`
- `mongoose`
- `dotenv`
- `cors`
- `nanoid`

---

## Frontend Details

### Frontend Stack

- React
- Vite
- Tailwind CSS
- Axios
- `@tanstack/react-query`

### UI Components

- `Frontend/src/pages/HomePage.jsx`
  - Displays the URL shortener page and renders `UrlForm`
- `Frontend/src/components/UrlForm.jsx`
  - Accepts a URL input
  - Uses `Frontend/src/api/shortUrl.api.js` to call the backend
  - Displays the created short URL with copy support

### Frontend API Layer

- `Frontend/src/api/shortUrl.api.js`
  - Exposes `createShortUrl(url)`
  - Uses a shared axios instance for HTTP requests
- `Frontend/src/utils/axiosInstance.js`
  - Configures `baseURL` from `import.meta.env.VITE_BACKEND_URL`
  - Includes response interceptors for common HTTP error handling

### Frontend Behavior

- Uses React Query via `Frontend/src/main.jsx` to provide a `QueryClient` context
- Submits a long URL to the backend using the configured axios instance
- Receives `{ shortUrl }` and renders a clickable shortened link
- Supports copying the shortened link to clipboard

---

## Running the Project

### Backend

1. Open `Backend/`
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/url_shortener
APP_URL=http://localhost:3000
```

4. Start the backend:

```bash
npm run dev
```

### Frontend

1. Open `Frontend/`
2. Install dependencies:

```bash
npm install
```

3. Create or verify `.env` with the backend URL:

```env
VITE_BACKEND_URL=http://localhost:3000
```

4. Start the frontend:

```bash
npm run dev
```

5. Open the Vite-hosted app in the browser (usually `http://localhost:5173`)

---

## Current Limitations

- No authentication or user account flow is implemented
- URL validation is only enforced by the frontend input type and not fully validated on the backend
- The `user` field exists on the URL model but there is no `User` model or user routes yet
- No test suite is included
- Production deployment, logging, and rate limiting are not implemented

---

## Notes

This README now reflects the current project state with both backend API and frontend UI implemented. The backend can create short URLs, redirect them, and the frontend can submit a URL and display the resulting short link.
