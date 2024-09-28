import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import GameComponent from './Pages/after_delay'
import Signin from './Pages/signin';
import Signup from './Pages/signup';
import Privasi from './Pages/Privasi';
import Sidhimantra from './Pages/sidhimantra';
import ManikAngkeran from './Pages/ManikAngkeran';
import NagaBasugih from './Pages/NagaBasugih';
import Scenario from './Pages/scenario';
import Level1 from './levels/level1';
import LoadingBar from './Pages/LoadingBar';
import Story from './Pages/story';


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
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/LoadingBar' element={<LoadingBar />} />
          <Route path='/Privasi' element={<Privasi />} />
          <Route path='/sidhimantra' element={<Sidhimantra />} />
          <Route path='/ManikAngkeran' element={<ManikAngkeran />} />
          <Route path='/NagaBasugih' element={<NagaBasugih />} />
          <Route path='/scenario' element={<Scenario />} />
          <Route path='/story' element={<Story/>} />
          <Route path='/level1' element={<Level1 />} />
        </Routes>

      </Router>


    </>
  )
}

export default App
