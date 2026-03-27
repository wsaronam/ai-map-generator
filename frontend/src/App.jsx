import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'

import Header from './components/Header'
import ThemeInput from './components/ThemeInput'
import DungeonMap from './components/DungeonMap'
import { parseMap } from './utils/MapHelpers'




function App() {
  const [status, setStatus] = useState("none yet");
  const [theme, setTheme] = useState('');
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState (null);
  


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
    setError(null);

    try {
      const res = await axios.post('http://localhost:5000/generate-map', {theme});
      console.log('raw: ' + res.data);
      console.log("raw read: " + JSON.stringify(res.data))
      const parsed = parseMap(res.data.map);
      console.log('parsed: ' + parsed);
      if (!parsed) {
        throw new Error('Invalid map data');
      }
      setMapData(parsed);
    }
    catch (err) {
      console.log("error caught: " + err.message)
      setError('Error generating map.  Please try again.');
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
      {error && <p className='error-message'>{error}</p>}
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