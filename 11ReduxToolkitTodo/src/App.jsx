import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddTodo from './Components/AddTodo'
import Todos from './Components/Todos'

function App() {


  return (
    <>
      <div>hello hero</div>
      <AddTodo />
      <Todos />
    </>
  )
}

export default App
