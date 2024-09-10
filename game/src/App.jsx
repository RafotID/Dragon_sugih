import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Login from './Pages/login'
import GameComponent from './Pages/after_delay'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
        <Route path='/' element={<GameComponent/>}/> 
          <Route path='/login' element={<Login/>}/>
          
          

         
        </Routes>
      </Router>


    </>
  )
}

export default App
