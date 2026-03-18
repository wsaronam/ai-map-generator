import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'




function App() {
  const [status, setStatus] = useState("none yet");


  useEffect(() => {
    axios.get('http://localhost:5000/ping')
      .then(res => setStatus('good'))
      .catch(() => setStatus('bad'))
  }, []);
  

  return (
    <div>
      Test
      Backend status: {status}
    </div>
  )
}




export default App


// terminal cmd to run
// npm run dev