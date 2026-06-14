import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Chaii from './componenets/chaii.jsx'
function App() {
  

  return (
    <>

      <div className="bg-blue-500 text-white p-4">Hello, Tailwind!</div>
      <Chaii username="ganesh"/>
    </>
  )
}

export default App
