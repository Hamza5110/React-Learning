# Blog Verse

Full-stack blogging app with a React frontend and Express + MongoDB backend. Users can sign up, log in, and create, read, update, and delete blog posts.

## Tech Stack

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| Backend  | Express, Mongoose, JWT, bcryptjs           |
| Database | MongoDB                                    |

## Project Structure

```
blog-verse/
├── React Js/          # Frontend (Vite + React)
│   └── src/
│       ├── api/       # Blog API client
│       ├── components/
│       └── context/   # Auth context
└── backend/           # Express API
    ├── controller/
    ├── models/
    └── routes/
```

## Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

API runs at `http://localhost:5000`.

### 2. Frontend

```bash
cd "React Js"
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Features

- User signup and login (JWT)
- Browse all blogs
- Create, view, edit, and delete blog posts
- Protected routes (login required)

## API Endpoints

### Auth — `/api/auth`

| Method | Path      | Description |
| ------ | --------- | ----------- |
| POST   | `/signup` | Register    |
| POST   | `/login`  | Log in      |

### Blogs — `/api/blog`

| Method | Path      | Description     |
| ------ | --------- | --------------- |
| GET    | `/all`    | List all blogs  |
| GET    | `/:id`    | Get one blog    |
| POST   | `/create` | Create a blog   |
| PUT    | `/:id`    | Update a blog   |
| DELETE | `/:id`    | Delete a blog   |

## Scripts

**Backend**

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start with nodemon       |
| `npm start`     | Start production server  |

**Frontend**

| Command         | Description        |
| --------------- | ------------------ |
| `npm run dev`   | Vite dev server    |
| `npm run build` | Production build   |
| `npm run preview` | Preview build    |
