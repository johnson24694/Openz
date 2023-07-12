import { useState } from 'react'
import HouseForm from './components/HouseForm'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ViewAllHouses from './components/ViewAllHouses';
import ViewOneHouse from './components/ViewOneHouse';
import EditForm from './components/EditForm';
import LandingPage from './components/landingPage';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <BrowserRouter>
                <Routes>
                  <Route element={<LandingPage/>} path="/" default />
                  <Route element={<Login/>} path="/login"/>
                  <Route element={<Register/>} path="/register"/>
                  <Route element={<ViewAllHouses/>} path="/dashboard"/>
                  <Route element={<HouseForm/>} path="/houses/new" /> 
                  <Route element={<ViewOneHouse/>} path="/house/:id"/>
                  <Route element={<EditForm/>} path="/house/:id/edit"/>
                </Routes>
          </BrowserRouter>
      </div>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
    </>
  )
}

export default App
