import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

import Header from './components/Header'
import ThemeInput from './components/ThemeInput'




function App() {
  const [status, setStatus] = useState("none yet");
  const [theme, setTheme] = useState('')
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    axios.get('http://localhost:5000/ping')
      .then(res => setStatus('good'))
      .catch(() => setStatus('bad'))
  }, []);


  async function generateMap() {
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    console.log("Waiting...");
    setLoading(true);
    await wait(5000);
    console.log("5 seconds have passed!");
    setLoading(false);
  };
  

  return (
    <div className="app">
      <Header />
      <ThemeInput 
        theme={theme}
        setTheme={setTheme}
        onGenerate={generateMap}
        loading={loading}
      />
    </div>
  )
}




export default App


// terminal cmd to run
// npm run dev