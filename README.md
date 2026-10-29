# Blog Verse

Full-stack learning platform with a React frontend and Express + MongoDB backend. Users can sign up, log in, manage blog posts, browse and enroll in courses, and manage their profile. Access is role-based (`student`, `instructor`, `admin`).

## Tech Stack

| Layer    | Stack                                      |
| -------- | ------------------------------------------ |
| Frontend | React 19, Vite, React Router, Tailwind CSS |
| Backend  | Express, Mongoose, JWT, bcryptjs           |
| Database | MongoDB                                    |

## Project Structure

```
blog-verse/
├── React Js/                 # Frontend (Vite + React)
│   └── src/
│       ├── api/              # API client
│       ├── components/       # Pages & UI
│       └── context/          # Auth context
└── backend/                  # Express API
    ├── controller/
    ├── middleware/           # JWT protect + role authorize
    ├── models/
    ├── routes/
    ├── scripts/              # One-off migrations
    └── utils/
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

If you have older courses without slugs:

```bash
npm run migrate:slugs
```

### 2. Frontend

```bash
cd "React Js"
npm install
npm run dev
```

App runs at `http://localhost:5173`.

## Features

- User signup and login (JWT)
- Roles: student, instructor, admin
- Browse, create, view, edit, and delete blog posts
- Courses with slug URLs
- Instructors/admins can create and update courses
- Students can enroll / unenroll
- Profile page
- Protected routes (login required)

## Frontend Routes

| Path             | Description        | Auth |
| ---------------- | ------------------ | ---- |
| `/login`         | Log in             | No   |
| `/signup`        | Sign up            | No   |
| `/`              | Home / blogs       | Yes  |
| `/blogs/new`     | Create blog        | Yes  |
| `/blogs/:id`     | Blog detail        | Yes  |
| `/courses`       | Course list        | Yes  |
| `/courses/new`   | Create course      | Yes  |
| `/courses/:slug` | Course detail      | Yes  |
| `/profile`       | User profile       | Yes  |

## API Endpoints

### Auth — `/api/auth`

| Method | Path      | Description |
| ------ | --------- | ----------- |
| POST   | `/signup` | Register    |
| POST   | `/login`  | Log in      |

### Blogs — `/api/blog`

| Method | Path      | Description    |
| ------ | --------- | -------------- |
| GET    | `/all`    | List all blogs |
| GET    | `/:id`    | Get one blog   |
| POST   | `/create` | Create a blog  |
| PUT    | `/:id`    | Update a blog  |
| DELETE | `/:id`    | Delete a blog  |

### Courses — `/api/course`

| Method | Path             | Access                 | Description        |
| ------ | ---------------- | ---------------------- | ------------------ |
| GET    | `/`              | Public                 | List courses       |
| GET    | `/:slug`         | Public                 | Get course by slug |
| POST   | `/`              | instructor, admin      | Create course      |
| PUT    | `/:slug`         | instructor, admin      | Update course      |
| DELETE | `/:slug`         | admin                  | Delete course      |
| POST   | `/:slug/enroll`  | student                | Enroll             |
| POST   | `/:slug/unenroll`| student                | Unenroll           |

### Users — `/api/user`

| Method | Path   | Access | Description     |
| ------ | ------ | ------ | --------------- |
| GET    | `/`    | admin  | List all users  |
| GET    | `/:id` | auth   | Get one user    |
| PUT    | `/:id` | auth   | Update user     |
| DELETE | `/:id` | admin  | Delete user     |

## Scripts

**Backend**

| Command               | Description             |
| --------------------- | ----------------------- |
| `npm run dev`         | Start with nodemon      |
| `npm start`           | Start production server |
| `npm run migrate:slugs` | Backfill course slugs |

**Frontend**

| Command           | Description      |
| ----------------- | ---------------- |
| `npm run dev`     | Vite dev server  |
| `npm run build`   | Production build |
| `npm run preview` | Preview build    |
| `npm run lint`    | Run oxlint       |
