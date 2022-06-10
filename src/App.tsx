import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
// import AsteroidId from './components/AsteroidId'
// import Home from './components/Home'
import Home from './components/Home'
import Random from './components/Random'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        {/* <Route path='/asteroid/:number' element={<AsteroidId />} /> */}
        <Route path='/random' element={<Random />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App