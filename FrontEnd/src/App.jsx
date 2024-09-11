import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import GameComponent from './Pages/after_delay'
import Signin from './Pages/signin';
import Signup from './Pages/signup';
import Privasi from './Pages/Privasi';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route>
            <Route path='/' element={<GameComponent />} />
          </Route>
        </Routes>

        <Routes>

          <Route path='/Privasi' element={<Privasi />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />




        </Routes>

      </Router>


    </>
  )
}

export default App
