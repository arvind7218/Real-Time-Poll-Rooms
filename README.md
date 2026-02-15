# 🗳️ Live Polling System (Teacher–Student)

A **real-time polling application** where teachers can create live polls and students can vote instantly, chat, and see live results.  
Built with **MERN Stack + Socket.IO** with persistent storage.

---

## 📖 Context / About the Project
This is a **Full-Stack Assignment: Real-Time Poll Rooms**.  
The goal is to allow users to **create polls, share via link, and collect votes in real-time**, while ensuring fairness and preventing abuse.  
Demonstrates **React, Node.js, MongoDB, and Socket.IO** skills along with real-time event handling.

---

## 🚀 Features

**Teacher**
- Create polls with multiple options  
- Set poll duration  
- View live results and poll history  
- Chat with students  
- Kick out participants  

**Student**
- Join via shareable link  
- Submit single vote per poll  
- View live results  
- Chat with teacher and other students  
- Automatically redirected if kicked out  

---

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, Socket.IO Client, React Router  
- **Backend:** Node.js, Express.js, MongoDB + Mongoose, Socket.IO  

---

## 🔄 Real-Time Events (Socket.IO)

| Event | Description |
|-------|------------|
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

## ✅ Fairness / Anti-Abuse Mechanisms
1. **One vote per student** – prevents multiple votes using unique session/user ID checks  
2. **Kick-out & session validation** – prevents unauthorized users from voting; kicked-out users are redirected immediately  

---

## 🔹 Edge Cases Handled
- Students joining late still see current poll and live results  
- Votes submitted after poll ends are rejected  
- Poll options with 0 votes are still displayed  
- Kicked-out students cannot vote or rejoin  

---

## ⚠️ Known Limitations / Future Improvements
- No IP-based duplicate vote prevention  
- Limited analytics and visualization  
- No authentication; anyone with link can join  

---

## 🌐 Deployment and Links
- **Deployed App:** [https://real-time-poll-rooms-f.onrender.com](https://real-time-poll-rooms-f.onrender.com)  
- **GitHub Repository:** [https://github.com/arvind7218/Real-Time-Poll-Rooms](https://github.com/arvind7218/Real-Time-Poll-Rooms)  
- **Demo Video:** [Optional](https://drive.google.com/file/d/16GKr0R2qUsVAb-CTL-ZmNBmpWBR-c2GZ/view?usp=sharing)  

---

## 🧪 How to Run Locally

**Backend**
```bash
cd backend
npm install
npm run dev

**Frontend**

cd frontend
npm install
npm run dev



Author: Arvind Chauhan
