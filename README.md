# URL Shortener

## Project Overview

This repository contains a full-stack URL shortening application.

- `Backend/` - Express + MongoDB API for creating short URLs, redirecting them, and handling JWT cookie auth.
- `Frontend/` - React + Vite UI for submitting URLs and displaying shortened links.

The app lets users submit a long URL, generates a 7-character short code, stores it in MongoDB, and redirects visitors to the original URL when the short code is accessed.

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
      auth.controller.js
      shortUrl.controller.js
    dao/
      shortUrl.dao.js
      user.dao.js
    middleware/
      auth.middleware.js
    models/
      shortUrl.model.js
      user.model.js
    routes/
      auth.routes.js
      shortUrl.routes.js
    services/
      auth.service.js
      shortUrl.service.js
    utils/
      attachUser.js
      helper.js
      errorHandler.js
Frontend/
  package.json
  vite.config.js
  index.html
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
  - Loads environment variables and starts the application.
  - Connects to MongoDB via `Backend/src/config/db.js`.

### Express App

- `Backend/src/app.js`
  - Configures CORS with `CLIENT_URL` and credentials support.
  - Parses JSON and URL-encoded bodies.
  - Uses `cookie-parser`.
  - Attaches user info from the JWT cookie using `Backend/src/utils/attachUser.js`.
  - Mounts short URL and auth routes.
  - Uses centralized error handling.

### Routes

- `POST /api/create`
  - Creates a new shortened URL from `{ url }`.
  - If a logged-in user sends an optional `slug`, it will be used as a custom short code.
- `GET /:shortUrl`
  - Redirects to the original URL for the given short code.
- `POST /api/auth/register`
  - Registers a new user and sets an `accessToken` cookie.
- `POST /api/auth/login`
  - Authenticates a user and sets an `accessToken` cookie.

### Controller Layer

- `Backend/src/controller/shortUrl.controller.js`
  - `createShortUrl(req, res)`
    - Validates required `url` input.
    - Chooses user-specific or anonymous short URL creation based on `req.user`.
    - Returns the full shortened URL using `APP_URL`.
  - `redirectToFullUrl(req, res)`
    - Looks up the long URL by code.
    - Redirects the client.
- `Backend/src/controller/auth.controller.js`
  - `register(req, res)`
    - Registers a user, issues JWT cookie, and sends a success message.
  - `login(req, res)`
    - Verifies credentials, issues JWT cookie, and sends a success message.

### Service Layer

- `Backend/src/services/shortUrl.service.js`
  - `createShortUrlWithoutUserService(url)` generates a new short code and saves it.
  - `createShortUrlWithUserService(url, userId, slug)` supports user-linked short URLs and optional custom slugs.
- `Backend/src/services/auth.service.js`
  - Creates users with hashed passwords.
  - Signs JWTs with payload `{ id: user._id }`.
  - Validates login credentials.

### Data Access Layer

- `Backend/src/dao/shortUrl.dao.js`
  - Saves short URLs to MongoDB and links them to a user if present.
  - Finds stored URLs by short code and increments click counts.
- `Backend/src/dao/user.dao.js`
  - Finds users by email or by raw MongoDB `_id`.
  - Creates new users.

### Models

- `Backend/src/models/shortUrl.model.js`
  - `fullUrl` (required string)
  - `shortUrl` (required unique string)
  - `clicks` (number, default `0`)
  - `user` (optional `ObjectId` reference to `User`)
- `Backend/src/models/user.model.js`
  - `name` (required string)
  - `email` (required unique string)
  - `password` (required string)
  - `avatar` (optional string with default image URL)

### Middleware

- `Backend/src/utils/attachUser.js`
  - Reads `accessToken` cookie.
  - Verifies JWT and loads the matching user.
  - Sets `req.user` when a valid token is present.
- `Backend/src/middleware/auth.middleware.js`
  - Verifies JWT and rejects unauthorized requests with `401`.

### Utilities

- `Backend/src/utils/helper.js`
  - Generates unique nanoid values for short URLs.
- `Backend/src/utils/errorHandler.js`
  - Provides custom errors and Express error middleware.

### Configuration

- `Backend/src/config/config.js`
  - Loads environment variables and validates required keys.
  - Exports `APP_URL`, `MONGO_URI`, `PORT`, and `JWT_SECRET`.
- `Backend/src/config/db.js`
  - Connects to MongoDB with Mongoose.

### Backend Dependencies

- `bcryptjs`
- `cookie-parser`
- `cors`
- `dotenv`
- `express`
- `jsonwebtoken`
- `mongoose`
- `nanoid`

---

## Frontend Details

### Stack

- React
- Vite
- Tailwind CSS
- Axios
- `@tanstack/react-query`

### UI Components

- `Frontend/src/pages/HomePage.jsx`
  - Displays the URL shortener page.
- `Frontend/src/components/UrlForm.jsx`
  - Accepts a long URL and submits it to the backend.
  - Renders the returned shortened link.

### API Layer

- `Frontend/src/api/shortUrl.api.js`
  - Sends URL creation requests to the backend.
- `Frontend/src/utils/axiosInstance.js`
  - Configures the backend base URL from `VITE_BACKEND_URL`.

### Behavior

- Uses React Query in `Frontend/src/main.jsx`.
- Submits URLs and displays shortened links.
- Supports clipboard copy for generated links.

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
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
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

3. Create or verify `.env` with:

```env
VITE_BACKEND_URL=http://localhost:3000
```

4. Start the frontend:

```bash
npm run dev
```

4. Start the frontend:

```bash
npm run dev
```

5. Open the Vite-hosted app in the browser (usually `http://localhost:5173`)

---

## Current Limitations

- Frontend does not yet implement authentication flows for register/login
- URL validation is only enforced by the frontend input type and not fully validated on the backend
- User-linked URL creation is available in the backend service layer, but not currently used by the public create endpoint
- No test suite is included
- Production deployment, logging, and rate limiting are not implemented

---

## Notes

This README now reflects the current project state with both backend API and frontend UI implemented. The backend can create and redirect short URLs and includes backend auth-ready routes; the frontend submits a URL and displays the resulting short link.
