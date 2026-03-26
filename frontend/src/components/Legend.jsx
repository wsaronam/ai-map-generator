import {ROOM_COLORS} from '../utils/MapHelpers.jsx';

import '../styles/Legend.css'




export default function Legend() {
    return (
        <div className="legend">
            {Object.entries(ROOM_COLORS).map(([type, color]) => (
                <div key={type} className="legend-item">
                    <div className='legend-dot' style={{background: color}} />
                    <span className="legend-label">{type}</span>
                </div>
            ))}
        </div>
    )
}