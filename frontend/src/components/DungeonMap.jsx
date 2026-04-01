import { 
    ROOM_COLORS, 
    ROOM_RADIUS,
    MAP_WIDTH,
    MAP_HEIGHT,
    getRoomPositions
} from '../utils/MapHelpers.jsx';
import Legend from './Legend.jsx';

import '../styles/DungeonMap.css';




function RoomNode({room, pos}) {
    const color = ROOM_COLORS[room.type]
    const w = 90;
    const h = 52;

    return (
        <g>
            <rect
                x={pos.x - w / 2} y={pos.y - h / 2}
                width={w} height={h}
                rx='8'
                fill={color}
                stroke={color} strokeWidth='2'
            />
            <text x={pos.x} y={pos.y - 6} textAnchor='middle'
             fill='color' fontSize='10' fontWeight='bold'>
                {room.type.toUpperCase()}
            </text>
            <text x={pos.x} y={pos.y + 8} textAnchor='middle'
             fill='color' fontSize='9'>
                {room.name}
            </text>
        </g>
    )
}


export default function DungeonMap({mapData, selectedRoom}) {
    const positions = getRoomPositions(mapData.rooms);


    return (
        <div className='container'>
            <h2>{mapData.title}</h2>
            <p>Click on a room in inspect it</p>

            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} width='100%' className='svg'>
                {mapData.rooms.map(room => (
                    <RoomNode 
                        key={room.id}
                        room={room}
                        pos={positions[room.id]}
                    />
                ))}
            </svg>
            <Legend />
        </div>
    )
}