import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Register from './components/Register'
import Chats from './components/Chats'
import Login from './components/Login'
import './index.css'
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chats/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}
