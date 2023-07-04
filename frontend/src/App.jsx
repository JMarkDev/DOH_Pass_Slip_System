import { useState } from 'react'
import './App.css'
import Pagenotfound from './components/Pagenotfound'
import PassSlip from './components/PassSlip'
import Dashboard from './components/dashboard/Dashboard'
import { Route, Routes } from 'react-router-dom'
import Request from './components/dashboard/Request'
import Verifier from './components/Verifier/Verifier'
import Archives from './components/dashboard/Archives'
import Register from './Register'
import Login from './Login'

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  // const handleSidebarToggle = () => {
  //   setShowSidebar(!showSidebar);
  //   document.body.classList.toggle("hide-sidebar")
  // }

  return (
    <>
    <Routes>
      <Route path="/" element={<PassSlip />}/>
      <Route path="/pass-slip" element={<PassSlip />}/>
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path='/request' element={<Request />}/>
      <Route path='/verifier' element={<Verifier/>}/>
      <Route path='/archives' element={<Archives />}/>
      <Route path="*" element={<Pagenotfound />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/login' element={<Login />}/>
    </Routes>
    </>
  )
}

export default App
