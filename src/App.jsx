import './App.css'
import Home from './page/home'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cart from './page/cart'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart/>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
