# 🗳️ Live Polling System (Teacher–Student)

A real-time polling application where a **teacher can create live polls** and **students can participate instantly**, chat, and view results.  
Built using **MERN Stack + Socket.IO** with real-time updates.

---

## 🚀 Features

### 👩‍🏫 Teacher
- Create live polls with multiple options
- Set poll duration
- View real-time voting results
- View poll history with result analytics
- Chat with students
- Kick out students from the session

### 👨‍🎓 Student
- Join ongoing polls (even if joined late)
- Submit votes (one vote per poll)
- View live results after voting
- Chat with teacher and other students
- Automatically redirected if kicked out

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Socket.IO Client
- React Router

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- Socket.IO
- REST APIs

---

## 🔄 Real-Time Events (Socket.IO)

| Event | Description |
|------|------------|
| `create_poll` | Teacher creates a poll |
| `poll_started` | Broadcasts active poll |
| `submit_vote` | Student submits vote |
| `poll_results` | Live result updates |
| `join_poll` | Student joins poll |
| `participants_update` | Updates participant list |
| `kick_student` | Teacher removes a student |
| `kicked_out` | Student redirected |
| `poll_ended` | Ends poll session |

---

## 📊 Poll History
- Displays **all past polls**
- Shows **all options**, even those with `0%` votes
- Percentage calculated based on total votes
- Sorted by most recent poll first

---

## 🌐 API Endpoints

### Poll APIs

GET /api/poll/active
GET /api/poll/history
POST /api/poll/create
POST /api/poll/vote


---

## ⚙️ Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string

Frontend

Ensure Socket.IO connects to backend:

io("https://your-backend-url.onrender.com")

🧪 How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🚀 Deployment

Backend: Render

Frontend: Vercel

Auto-deploy enabled via GitHub

✅ Assignment Requirements Covered

Real-time polling ✔️

Late join handling ✔️

One vote per student ✔️

Live chat ✔️

Poll history ✔️

Kick-out feature ✔️

Clean UI aligned with design ✔️


Author
Niranjan C B
