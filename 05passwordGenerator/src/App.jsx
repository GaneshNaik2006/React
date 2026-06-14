import { useState, useCallback ,useEffect,useRef} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length,setlength]= useState(8);
  const [charAllowed,setcharAllowed]=useState(false);
  const [numAllowed,setnumAllowed]=useState(false);
  const [copied,setCopied]=useState("Copy");
  const passwordRef=useRef(null);
  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(charAllowed){
      str+="!@#$%^&*()_+";
    }
    if(numAllowed){
      str+="0123456789"
    }

    
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()*str.length)+1
      pass+=str[char];
    }
    
    setPassword(pass);
  },[length,charAllowed,numAllowed,setPassword])

  const copytoclipboard=useCallback(()=>{
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setCopied("Copied");
    setTimeout(()=>{
      setCopied("Copy");
    },1000)

  },[password])
  useEffect(()=>{
    passwordGenerator();
  },[length,charAllowed,numAllowed,passwordGenerator])

  return (
    <>
     <div className="w-full   max-w-lg text-orange-500 mx-auto 
      rounded-lg px-4 my-8 bg-gray-800 py-6 ">
      <h1 className="text-2xl font-bold mb-4 text-white text-center my-3">Password Generator</h1>
          <div className= "flex shadow rounded-lg overflow-hidden mb-4">
            <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="w-full px-4 py-2 focus:outline-none text-gray-800 bg-amber-200"
            ></input>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 shrink-0"
            onClick={copytoclipboard}>
              {copied}
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input 
              type="range"
              min="6"
              max="100"
              value={length}
              onChange={(e) => setlength(e.target.value)}
              
              className="w-full cursor-pointer px-4 py-2 focus:outline-none text-gray-800"
              ></input>
              <label> Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setnumAllowed(prev=>!prev);
              }}
              />
              <label htmlFor="numberInput"> Numbers</label>
              
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
                setcharAllowed(prev=>!prev);
              }}
            />
            <label htmlFor="characterInput"> Special Characters</label>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
