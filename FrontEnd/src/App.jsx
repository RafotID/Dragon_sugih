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
import Scenario from './Pages/Scenario';
import Level1 from './levels/level1';
import LoadingBar from './Pages/LoadingBar';
import Story from './Pages/story';
import { Battle, Battle2, Battle3, Battle4, Battle5 } from './Pages/battle';
import Caracter from './Pages/Caracter';
import { Penghubung } from './components/Penghubung';
import PercakapanNaga from './Pages/PercakapanNaga';
import PercakapanDewaApi from './Pages/PercakapanDewaApi';

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
          <Route path='/Caracter' element={<Caracter />} />

          <Route path='/sidhimantra' element={<Sidhimantra />} />
          <Route path='/ManikAngkeran' element={<ManikAngkeran />} />
          <Route path='/NagaBasugih' element={<NagaBasugih />} />
          <Route path='/Scenario/:id' element={<Scenario />} />
          <Route path='/story/:id' element={<Story />} />
          <Route path='/battle/:id' element={<Battle />} />
          <Route path='/battle2/:id' element={<Battle2 />} />
          <Route path='/battle3/:id' element={<Battle3 />} />
          <Route path='/battle4/:id' element={<Battle4 />} />
          <Route path='/battle5/:id' element={<Battle5 />} />
          <Route path='/level1' element={<Level1 />} />
          <Route path='/penghubung/:id' element={<Penghubung />} />
          <Route path='/PercakapanNaga/:id' element={<PercakapanNaga />} />
          <Route path='/PercakapanDewaApi' element={<PercakapanDewaApi />} />
        </Routes>

      </Router>


    </>
  )
}

export default App
