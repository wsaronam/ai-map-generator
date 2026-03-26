import { ROOM_COLORS, ROOM_RADIUS } from '../utils/MapHelpers.jsx';
import Legend from './Legend.jsx';

import '../styles/DungeonMap.css';




export default function DungeonMap({mapData}) {
    return (
        <div className='container'>
            <h2>Map Title Goes Here</h2>
            <p>Click on a room in inspect it</p>


            <Legend />
        </div>
    )
}