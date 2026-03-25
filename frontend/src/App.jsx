import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

import Header from './components/Header'
import ThemeInput from './components/ThemeInput'
import DungeonMap from './components/DungeonMap'




function App() {
  const [status, setStatus] = useState("none yet");
  const [theme, setTheme] = useState('');
  const [loading, setLoading] = useState(false);
  const [mapData, setMapData] = useState(null);


  useEffect(() => {
    axios.get('http://localhost:5000/ping')
      .then(res => setStatus('good'))
      .catch(() => setStatus('bad'))
  }, []);


  async function generateMap() {
    if (!theme.trim()) {
      return;
    }

    setLoading(true);
    setMapData(null);

    try {
      const res = await axios.post('http://localhost:5000/generate-map', {theme});
      const parsed = parseMap(res.data.map);
      if (!parsed) {
        throw new Error('Invalid map data');
      }
      setMapData(parsed);
    }
    catch {
      console.log('Error generating map');
    }
    finally {
      setLoading(false);
    }
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
      {mapData && (
        <DungeonMap 
          mapData={mapData}
        />
      )}
    </div>
  )
}




export default App


// terminal cmd to run
// npm run dev