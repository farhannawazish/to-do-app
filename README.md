# Full-Stack To-Do & Task Manager

A modern, responsive full-stack task management application built with the **MERN** stack (MongoDB, Express, React, Node.js), powered by **Vite** and styled with **Tailwind CSS**.

---

## Features

- **Full CRUD Operations**:
  -  Create new tasks quickly with validation.
  -  Read and view all current tasks with real-time updates.
  - **Inline Editing**: Edit task text directly in the list with keyboard shortcut support (`Enter` to save, `Esc` to cancel).
  - **Status Toggle**: Mark tasks as completed or pending with visual feedback.
  -  Delete tasks with a single click.
- **Modern & Responsive UI**: Clean, minimalist design with smooth animations built using Tailwind CSS v4 and React Icons.
- **Robust Database Connectivity**: Configured to connect to MongoDB Atlas with an automatic fallback to local MongoDB if the remote connection fails.
- **Full-Stack Production Ready**: Express backend serves the optimized Vite production bundle when `NODE_ENV=production`.

---

## Tech Stack

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Bundler / Dev Server**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database ODM**: [Mongoose](https://mongoosejs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas / Local)
- **Utilities**: `dotenv`, `cors`, `nodemon`

---

## 📁 Project Structure

```text
to-do/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection & fallback setup
│   ├── models/
│   │   └── todo.model.js       # Mongoose Todo schema and model
│   ├── routes/
│   │   └── todo.route.js       # API routes for CRUD endpoints
│   └── server.js              # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── assets/            # Static assets and icons
│   │   ├── App.jsx            # Main React task manager component
│   │   ├── App.css            # Component styles
│   │   └── main.jsx           # React DOM root render
│   ├── index.html             # Frontend HTML template
│   ├── vite.config.js         # Vite configuration with API proxy
│   └── package.json           # Frontend dependencies and scripts
├── .env                       # Environment variables (ignored by Git)
├── .gitignore                 # Files ignored by Git
├── package.json               # Root scripts and backend dependencies
└── README.md                  # Project documentation
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
NODE_ENV=development
```

> **Note:** If `MONGO_URI` is omitted or unavailable, the backend automatically attempts to connect to `mongodb://127.0.0.1:27017/to-do-app`.

---

##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.x or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas account)
- `npm` (bundled with Node.js)

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd to-do

# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
cd ..
```

---

## Running the Application

### Option A: Development Mode (Recommended for Development)

Run the backend and frontend development servers in separate terminals:

**Terminal 1 (Backend):**
```bash
npm run dev
```
> Runs the Express backend with `nodemon` on `http://localhost:3000`.

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
> Runs the Vite development server on `http://localhost:5173`. API calls to `/api` are automatically proxied to port 3000.

---

### Option B: Production Mode

Build the frontend and serve everything through the Express backend:

```bash
# 1. Build the frontend and install dependencies
npm run build

# 2. Run the production server
npm start
```
> The application will be accessible at `http://localhost:3000`.

---

## API Endpoints

All backend routes are prefixed with `/api/todos`:

| Method   | Endpoint          | Description                    | Request Body                                  |
|----------|-------------------|--------------------------------|-----------------------------------------------|
| `GET`    | `/api/todos`      | Fetch all todos                | _None_                                        |
| `POST`   | `/api/todos`      | Create a new todo              | `{ "text": "Task description" }`              |
| `PATCH`  | `/api/todos/:id`  | Update task text and/or status | `{ "text": "...", "completed": true/false }`  |
| `DELETE` | `/api/todos/:id`  | Delete a todo by ID            | _None_                                        |

### Example JSON Responses

**Create / Read Todo (`POST` / `GET`):**
```json
{
  "_id": "673f1a2b3c4d5e6f7a8b9c0d",
  "text": "Finish Node.js assignment",
  "completed": false,
  "createdAt": "2026-11-04T10:00:00.000Z",
  "updatedAt": "2026-11-04T10:00:00.000Z",
  "__v": 0
}
```


