# URL Shortener

## Project Overview

A full-stack URL shortening application with:

- `Backend/` — Express + MongoDB API for creating and redirecting short URLs.
- `Frontend/` — React + Vite UI for shortening URLs, login/register, and managing saved links.

The frontend lets users shorten URLs, view created short links, copy URLs, and see click counts. Logged-in users can use custom slugs and access a protected dashboard.

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
      UserUrl.jsx
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
    store/
      store.js
      slice/
        authSlice.js
    utils/
      axiosInstance.js
      helper.js
```

---

## Backend Overview

### Core Features

- Create short URLs and optionally use a custom slug when authenticated.
- Redirect requests from a short code to the original full URL.
- Track click counts for each short URL.
- JWT cookie-based authentication for user sessions.

### Key Routes

- `POST /api/create`
  - Creates a short URL from `{ url }`.
  - Supports optional `slug` for authenticated users.
- `GET /:shortUrl`
  - Redirects to the original URL.
- `POST /api/auth/register`
  - Creates a new user and issues an `accessToken` cookie.
- `POST /api/auth/login`
  - Logs in a user and issues an `accessToken` cookie.
- `GET /api/auth/logout`
  - Clears the auth cookie.
- `GET /api/auth/me`
  - Returns the current authenticated user.

### Important Backend Files

- `Backend/src/controller/shortUrl.controller.js`
- `Backend/src/controller/auth.controller.js`
- `Backend/src/services/shortUrl.service.js`
- `Backend/src/services/auth.service.js`
- `Backend/src/dao/shortUrl.dao.js`
- `Backend/src/dao/user.dao.js`
- `Backend/src/models/shortUrl.model.js`
- `Backend/src/models/user.model.js`
- `Backend/src/middleware/auth.middleware.js`
- `Backend/src/utils/attachUser.js`
- `Backend/src/config/config.js`

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

## Frontend Overview

### Core Features

- Shorten URLs and display the generated short link.
- Copy generated short links with a button that changes state temporarily.
- Login and registration pages with validation and error display.
- Dashboard with responsive user URL history and click counts.
- Navbar shows `Login` when unauthenticated and `Logout` when authenticated.

### Important Frontend Files

- `Frontend/src/components/Navbar.jsx`
- `Frontend/src/components/UrlForm.jsx`
- `Frontend/src/components/UserUrl.jsx`
- `Frontend/src/components/LoginForm.jsx`
- `Frontend/src/components/RegisterForm.jsx`
- `Frontend/src/pages/HomePage.jsx`
- `Frontend/src/pages/AuthPage.jsx`
- `Frontend/src/pages/DashboardPage.jsx`
- `Frontend/src/utils/axiosInstance.js`
- `Frontend/src/utils/helper.js`
- `Frontend/src/store/slice/authSlice.js`
- `Frontend/src/routing/dashboard.js`

### Routing

- `/` — Home page with hero content and URL shortener form.
- `/auth` — Authentication page for login/register.
- `/dashboard` — Protected dashboard page for authenticated users.

### Frontend Dependencies

- `@reduxjs/toolkit`
- `@tailwindcss/vite`
- `@tanstack/react-query`
- `@tanstack/react-router`
- `axios`
- `react`
- `react-dom`
- `react-redux`
- `redux`
- `tailwindcss`

---

## Setup and Run

### Backend

1. Open the `Backend/` folder.
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

1. Open the `Frontend/` folder.
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

5. Open the app in the browser at `http://localhost:5173`.

---

## Notes and Limitations

- A logout route exists in the backend, and the frontend calls it from the navbar.
- The dashboard and auth flow are implemented, but the UX can be further extended.
- No automated test suite is included in this repo.
- Backend URL validation could be strengthened further.

---

## Summary

This repo is a working URL shortening app with frontend auth, protected dashboard access, responsive UI, and backend redirect handling.

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
