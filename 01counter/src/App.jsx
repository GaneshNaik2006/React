import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  
  
  let [counter,setcounter]=useState(15);
  let addvalue =()=>{
    if(counter<=19){
      counter=counter+1;
    }
    
    setcounter(counter);
  }
  let removeval=()=>{
    if(counter>0){
      counter=counter-1;
    }
    
    setcounter( counter)
  }
  return (
    <>
     <h1>this is counter: {counter} </h1>
     <button onClick={addvalue}> add value {counter} </button>
      <button onClick={removeval}> Remove value {counter} </button>
    </>
  )
}

export default App
