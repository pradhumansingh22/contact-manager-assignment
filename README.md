# 📇 Contact Manager – Full Stack Project

A simple Contact Manager application where users can create, view, update, and delete contacts.

**Built with:**

- **Backend:** Node.js, Express, Prisma, PostgreSQL
- **Frontend:** React, Vite, Tailwind CSS

## ✨ Features

- Create, Read, Update, Delete contacts
- Form validation (required fields, email format, phone length)
- Clean and minimal UI
- Clear error messages (e.g. duplicate email)

## 🛠️ Prerequisites

Make sure you have installed:

- Node.js (v18+)
- npm
- PostgreSQL

## ⚙️ Backend Setup (Node + Express + Prisma)

### 1️⃣ Go to backend folder

```bash
cd backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Setup environment variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/contactdb"
```

### 4️⃣ Run Prisma migrations

```bash
npx prisma migrate dev
```

### 5️⃣ Build backend

```bash
npm run build
```

### 6️⃣ Run backend (dev)

```bash
npm run dev
```

**Backend runs on:** http://localhost:3000

## 🔌 Backend API Endpoints

| Method | Endpoint            | Description       |
| ------ | ------------------- | ----------------- |
| POST   | `/api/contacts`     | Create contact    |
| GET    | `/api/contacts`     | Get all contacts  |
| GET    | `/api/contacts/:id` | Get contact by id |
| PUT    | `/api/contacts/:id` | Update contact    |
| DELETE | `/api/contacts/:id` | Delete contact    |

## 🎨 Frontend Setup (React + Vite + Tailwind)

### 1️⃣ Go to frontend folder

```bash
cd frontend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start frontend

```bash
npm run dev
```

**Frontend runs on:** http://localhost:5173

## 🧪 Validation Rules

- **Name:** required
- **Email:** valid email format
- **Phone:** minimum 7 characters
