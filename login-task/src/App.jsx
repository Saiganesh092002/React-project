import React from 'react'
import "./App.css"
import "./index.css"
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import Home from './components/Home'
import Login from './components/login'
import Register from './components/Register';
const App = () => {
  
const isLoggedIn = localStorage.getItem("currentUser");
    return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={ <Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/home" element={ <Home />}  />
    </Routes>
    </BrowserRouter>
);
}


export default App