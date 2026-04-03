import { 
    ROOM_COLORS, 
    ROOM_RADIUS,
    MAP_WIDTH,
    MAP_HEIGHT,
    CONNECTION_STROKE,
    CONNECTION_WIDTH,
    CONNECTION_DASH,
    getRoomPositions
} from '../utils/MapHelpers.jsx';
import Legend from './Legend.jsx';

import '../styles/DungeonMap.css';




function RoomNode({room, pos, onClick, isSelected}) {
    const color = ROOM_COLORS[room.type]
    const w = 90;
    const h = 52;

    return (
        <g onClick={onClick}>
            {isSelected && (
                <rect 
                    x={pos.x - w / 2 - 6} y={pos.y - h / 2 - 6}
                    width={w + 12} height={h + 12}
                    rx = '10' fill='none'
                    stroke={color} strokeWidth='2' opacity='0.5'
                />
            )}
            <rect
                x={pos.x - w / 2} y={pos.y - h / 2}
                width={w} height={h}
                rx='8'
                fill={isSelected ? color : '#141424'}
                stroke={color} strokeWidth='2'
            />
            <text x={pos.x} y={pos.y - 6} textAnchor='middle'
             fill={isSelected ? '#141424' : color} fontSize='10' fontWeight='bold'>
                {room.type.toUpperCase()}
            </text>
            <text x={pos.x} y={pos.y + 8} textAnchor='middle'
             fill={isSelected ? '#141424' : '#cacaca'} fontSize='9'>
                {room.name.length > 12 ? room.name.slice(0, 12) + '...' : room.name}
            </text>
        </g>
    )
}


function ConnectionLines({rooms, positions}) {
    return rooms.map(room =>
        room.connections.map(targetId => {
            if (targetId <= room.id) {
                return null;
            }
            else {
                const from = positions[room.id];
                const to = positions[targetId];
                if (!from || !to) {
                    return null;
                }
                else {
                    return (
                        <line
                            key={`${room.id}-${targetId}`}
                            x1={from.x} y1={from.y}
                            x2={to.x} y2={to.y}
                            stroke={CONNECTION_STROKE}
                            strokeWidth={CONNECTION_WIDTH}
                            strokeDasharray={CONNECTION_DASH}
                        />
                    )
                }
            }
        })
    )
}


function Tooltip() {
    return (
        <g>
            <rect />
        </g>
    )
}


export default function DungeonMap({mapData, selectedRoom, onRoomClick}) {
    const positions = getRoomPositions(mapData.rooms);


    return (
        <div className='container'>
            <h2>{mapData.title}</h2>
            <p>Click on a room to inspect it</p>

            <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} width='100%' className='svg'>
                <ConnectionLines
                    rooms={mapData.rooms}
                    positions={positions}
                />
                {mapData.rooms.map(room => (
                    <RoomNode 
                        key={room.id}
                        room={room}
                        pos={positions[room.id]}
                        onClick={() => onRoomClick(room, positions[room.id])}
                        isSelected={selectedRoom?.id === room.id}
                    />
                ))}
            </svg>
            <Legend />
        </div>
    )
}