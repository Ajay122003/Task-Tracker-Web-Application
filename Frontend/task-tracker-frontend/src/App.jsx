import { useState } from 'react'
// import './App.css'
import Home from './Component/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './Component/Navbar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        
      </Routes>
    </>
  )
}

export default App
