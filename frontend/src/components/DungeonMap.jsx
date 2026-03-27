import { 
    ROOM_COLORS, 
    ROOM_RADIUS,
    MAP_WIDTH,
    MAP_HEIGHT
} from '../utils/MapHelpers.jsx';
import Legend from './Legend.jsx';

import '../styles/DungeonMap.css';




function RoomNode({room}) {
    const color = ROOM_COLORS[room.type]

    return (
        <div>
            {color}
        </div>
    )
}


export default function DungeonMap({mapData}) {
    return (
        <div className='container'>
            <h2>Map Title Goes Here</h2>
            <p>Click on a room in inspect it</p>

            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} width='100%' className='svg'>
                {mapData.rooms.map(room => (
                    <RoomNode 
                        key={room.id}
                        room={room}
                    />
                ))}
            </svg>
            <Legend />
        </div>
    )
}