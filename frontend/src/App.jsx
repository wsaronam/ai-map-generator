import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

import Header from './components/Header'
import ThemeInput from './components/ThemeInput'




function App() {
  const [status, setStatus] = useState("none yet");


  useEffect(() => {
    axios.get('http://localhost:5000/ping')
      .then(res => setStatus('good'))
      .catch(() => setStatus('bad'))
  }, []);
  

  return (
    <div className="app">
      <Header />
      <ThemeInput />
    </div>
  )
}




export default App


// terminal cmd to run
// npm run dev