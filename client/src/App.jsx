import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoleSelect from './pages/RoleSelect'
import StudentOnBoard from './pages/StudentOnBoard'
import TeacherCreate from './pages/TeacherCreate'
import TeacherLive from './pages/TeacherLive'
import StudentPoll from './pages/StudentPoll'
import TeacherHistory from './pages/TeacherHistory'
import Kickout from './components/Kickout'

function App() {
  

  return (
    <BrowserRouter>

    <Routes>
      <Route path="/" element={<RoleSelect />} />
      <Route path='/student' element={<StudentOnBoard />} />
      <Route path='/teacher' element={<TeacherCreate />} />
      <Route path='/teacher/live' element={<TeacherLive />} />
      <Route path='/student/poll' element={<StudentPoll />} /> 
      <Route path='/teacher/history' element={<TeacherHistory />} />
      <Route path='/kicked-out' element={<Kickout />} />
    </Routes>

    </BrowserRouter>
  )
}

export default App
