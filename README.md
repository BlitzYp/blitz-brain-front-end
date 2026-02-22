# Blitz Brain Front End

React client for the Blitz Brain face detection app. Users can register/sign in, submit an image URL or upload an image, and the app calls the backend + Clarifai face detection flow to draw a face box and track submission count.

## Features

- User registration and sign in
- Face detection from image URL
- Face detection from local file upload (converted to base64)
- Submission counter (`entries`) per user
- React UI with particles background and Tachyons styling

## Tech Stack

- React (Create React App)
- `react-scripts` 3.x
- Tachyons
- Clarifai integration via backend API
- Backend API (Express/Node) deployed separately

## Project Structure

- `src/App.js` - main app state, routing, image submit flow, face box calculation
- `src/Components/Signin/Signin.js` - sign in form
- `src/Components/Register/Register.js` - register form
- `src/Components/FaceRecognition/*` - image preview + face box UI

## API / Backend

This frontend currently calls the deployed backend directly using hardcoded URLs:

- `https://blitz-brain-backend.onrender.com/signin`
- `https://blitz-brain-backend.onrender.com/register`
- `https://blitz-brain-backend.onrender.com/image`
- `https://blitz-brain-backend.onrender.com/imageurl`

If you deploy your own backend, update those URLs in:

- `src/App.js`
- `src/Components/Signin/Signin.js`
- `src/Components/Register/Register.js`

## Local Development

Requirements:

- Node.js 20 (recommended via `nvm`)
- npm

Install and run:

```bash
npm install
npm start
```

Build for production:

```bash
npm run build
```

## Available Scripts

- `npm start` - starts CRA dev server
- `npm run build` - creates production build in `build/`
- `npm test` - runs tests
- `npm run start:prod` - serves the built app locally using `serve`

## Deployment (Vercel)

This project can be deployed to Vercel as a static React app.

Typical flow:

1. Push the frontend repo to GitHub.
2. Import the repo into Vercel.
3. Framework preset: `Create React App` (or let Vercel detect it).
4. Build command: `npm run build`
5. Output directory: `build`
6. Deploy.

Important:

- Make sure the backend is deployed and reachable over HTTPS (for example on Render).
- If you change backend URL, update the frontend fetch URLs before deploying.

## Notes

- This project uses `NODE_OPTIONS=--openssl-legacy-provider` in scripts to support the older CRA/react-scripts version on newer Node versions.
- `react-scripts` permission errors in WSL are usually fixed by restoring execute permissions in `node_modules/.bin` after install.
