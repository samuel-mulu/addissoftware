# 🎵 Addis Software Full Stack Test Project - MERN Stack

Welcome! This is my submission for the Full Stack Developer assessment from Addis Software. The project is a fully functional **MERN stack application** to manage and analyze songs, packaged with Docker and deployed online.

## 📌 Features

- 🎶 **Songs CRUD** – Create, read, update, and delete songs
- 📊 **Live Statistics** – Total songs, artists, albums, genres, and more
- 🔎 **search by Genre, songs, artists, albums** – Instantly filter songs by selected genre
- 🔁 **Real-time UI Updates** – UI refreshes automatically after any changes
- 🐳 **Dockerized Backend** – Easily portable, production-ready backend
- 🚀 **Fully Deployed** – Live on Vercel (frontend) and Render (backend)

---

## 🛠 Tech Stack

### 🔧 Backend
- Node.js + Express
- MongoDB + Mongoose
- RESTful API Design
- Docker (packaged and ready for deployment)

### 🎨 Frontend
- ReactJS with TypeScript
- Redux Toolkit for global state
- Redux-Saga for async side effects (API calls)
- Emotion + Styled System for styling

---

## 📈 Statistics Page

The statistics page dynamically shows:
- Total counts of songs, artists, albums, genres
- Song distribution by genre (Pie chart)
- Songs per artist / albums (Bar chart)
- More insights...

---

## 🌐 Live Demo

- **Frontend**: [View on Vercel](https://your-frontend-link.vercel.app)
- **Backend API**: [Live API on Render](https://your-backend-api.onrender.com/api/songs)

> Note: You can create and manage songs from the UI. All data updates in real time using Redux-Saga.

---

## 🧪 How to Run Locally

### 📦 Backend (Node + MongoDB)

```bash
cd backend
cp .env.example .env
# Fill MONGO_URI inside .env

# Run using Docker
docker compose up --build
