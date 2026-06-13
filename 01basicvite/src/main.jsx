import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

function Ganesh(){
  return(
    <h1>hello world</h1>
  )
}

const reactelement =(
  <a href='https://www.google.com/' target='_blank' > click me to go to google</a>
)

const username="kaise hoo";
const el=React.createElement(
  'a',
  {href:'https://www.google.com/',target:'_blank'},
  'hello bro come to google',username
)
createRoot(document.getElementById('root')).render(

  // <StrictMode>
  //   <App/>
  //   <Ganesh/>
   
  // </StrictMode>,

  el
)
