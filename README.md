# URL Shortener

## Project Overview

This repository contains a full-stack URL shortening application.

- `Backend/` - Express + MongoDB API for creating short URLs, redirecting them, and handling JWT cookie authentication.
- `Frontend/` - React + Vite UI for submitting URLs, showing shortened links, and login/register flows.

Users can shorten a URL through the frontend, receive a short link, and the backend redirects visitors from the short code to the original full URL.

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
  package-lock.json
  vite.config.js
  index.html
  src/
    App.jsx
    main.jsx
    index.css
    api/
      shortUrl.api.js
      user.api.js
    components/
      Navbar.jsx
      UrlForm.jsx
      LoginForm.jsx
      RegisterForm.jsx
    pages/
      HomePage.jsx
      AuthPage.jsx
      DashboardPage.jsx
    routing/
      auth.route.js
      dashboard.js
      homepage.js
      routeTree.js
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
  - Attaches user info from the JWT cookie via `Backend/src/utils/attachUser.js`.
  - Mounts short URL and auth routes.
  - Uses centralized error handling.

### Routes

- `POST /api/create`
  - Creates a new shortened URL from `{ url }`.
  - If a logged-in user provides `slug`, it can be used as a custom short code.
- `GET /:shortUrl`
  - Redirects to the original URL for the given short code.
- `POST /api/auth/register`
  - Registers a new user and sets an `accessToken` cookie.
- `POST /api/auth/login`
  - Authenticates a user and sets an `accessToken` cookie.
- `GET /api/auth/me`
  - Returns the authenticated user when a valid JWT cookie is present.

### Controller Layer

- `Backend/src/controller/shortUrl.controller.js`
  - `createShortUrl(req, res)` validates URL input, creates a short URL, and returns the full shortened link.
  - `redirectToFullUrl(req, res)` finds the original URL and redirects the client.
- `Backend/src/controller/auth.controller.js`
  - `register(req, res)` registers a user, issues a JWT cookie, and returns a success message.
  - `login(req, res)` authenticates a user, issues a JWT cookie, and returns user data.
  - `getCurrentUser(req, res)` returns the logged-in user object.

### Service Layer

- `Backend/src/services/shortUrl.service.js`
  - `createShortUrlWithoutUserService(url)` generates a random short code.
  - `createShortUrlWithUserService(url, userId, slug)` creates a user-linked short URL with optional custom slug support.
- `Backend/src/services/auth.service.js`
  - Registers users with hashed passwords.
  - Validates login credentials.
  - Signs JWT tokens with payload `{ id: user._id }`.

### Data Access Layer

- `Backend/src/dao/shortUrl.dao.js`
  - Saves short URLs to MongoDB and links them to a user when provided.
  - Looks up a short code and increments its click count.
- `Backend/src/dao/user.dao.js`
  - Finds users by email or by MongoDB `_id`.
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
  - `avatar` (optional string with a default image URL)

### Middleware

- `Backend/src/utils/attachUser.js`
  - Reads `accessToken` cookie, verifies JWT, and sets `req.user`.
- `Backend/src/middleware/auth.middleware.js`
  - Protects routes and rejects unauthorized requests with `401`.

### Utilities

- `Backend/src/utils/helper.js`
  - Generates unique nanoid values for short URLs.
- `Backend/src/utils/errorHandler.js`
  - Provides custom error classes and Express error-handling middleware.

### Configuration

- `Backend/src/config/config.js`
  - Loads and validates required environment variables.
  - Exports `APP_URL`, `MONGO_URI`, `PORT`, `JWT_SECRET`, and `CLIENT_URL`.
- `Backend/src/config/db.js`
  - Connects to MongoDB via Mongoose.

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
- `@tanstack/react-router`

### UI Components

- `Frontend/src/components/Navbar.jsx`
  - Renders the app title and login navigation.
- `Frontend/src/components/UrlForm.jsx`
  - Submits long URLs and displays shortened links.
- `Frontend/src/components/LoginForm.jsx`
  - Sends login requests to the backend.
- `Frontend/src/components/RegisterForm.jsx`
  - Sends registration requests to the backend.

### Pages

- `Frontend/src/pages/HomePage.jsx`
  - Shows the URL shortener form.
- `Frontend/src/pages/AuthPage.jsx`
  - Toggles between login and registration forms.
- `Frontend/src/pages/DashboardPage.jsx`
  - Placeholder protected dashboard page.

### Routing

- `Frontend/src/routing/routeTree.js`
  - Defines the root route and child routes.
- `Frontend/src/routing/homepage.js`
  - `/` route for the home page.
- `Frontend/src/routing/auth.route.js`
  - `/auth` route for authentication.
- `Frontend/src/routing/dashboard.js`
  - `/dashboard` protected route guarded by auth.

### API Layer

- `Frontend/src/api/shortUrl.api.js`
  - Calls `POST /api/create` to generate short URLs.
- `Frontend/src/api/user.api.js`
  - Calls `POST /api/auth/login` and `POST /api/auth/register`.
  - Calls `GET /api/auth/me` to retrieve the current user.
  - Includes `logoutUser()` helper, but no matching backend logout route is implemented.
- `Frontend/src/utils/axiosInstance.js`
  - Configures the backend base URL from `VITE_BACKEND_URL`.
  - Enables `withCredentials` for cookie auth.

### Behavior

- Uses React Query in `Frontend/src/main.jsx`.
- Uses `@tanstack/react-router` for client-side routing.
- The dashboard route is guarded and redirects unauthenticated users to `/auth`.

---

## Setup and Run

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

5. Open the app in the browser (usually `http://localhost:5173`).

---

## Known Limitations

- `logoutUser()` exists in the frontend, but the backend logout endpoint is not implemented.
- Dashboard page content is still a placeholder.
- No automated tests are included.
- URL validation should be reinforced on the backend side.

---

## Notes

This README now matches the current project implementation and structure for the URL shortener application.

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

- Login and register UI exist, but protected route handling and post-login redirects are not fully wired.
- URL validation is still primarily frontend-side and should be reinforced on the backend.
- The dashboard route exists, but the dashboard feature is not fully implemented.
- No test suite is included.

---

## Notes

This README now reflects the current project state with backend auth routes and frontend auth UI. The backend can create and redirect short URLs and supports JWT cookie authentication; the frontend renders the shortener form, auth page, and navbar navigation.
