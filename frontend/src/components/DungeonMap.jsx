import { 
    ROOM_COLORS, 
    ROOM_RADIUS,
    MAP_WIDTH,
    MAP_HEIGHT,
    CONNECTION_STROKE,
    CONNECTION_WIDTH,
    CONNECTION_DASH,
    TOOLTIP_WIDTH,
    TOOLTIP_HEIGHT,
    TOOLTIP_FLIP_X,
    TOOLTIP_FLIP_Y,
    TOOLTIP_OFFSET_X,
    TOOLTIP_OFFSET_Y,
    TOOLTIP_WORDS_PER_LINE,
    getRoomPositions,
    
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


function Tooltip({tooltip}) {
    if (!tooltip) return null;
    const words = tooltip.room.description.split(' ');
    const line1 = words.slice(0, TOOLTIP_WORDS_PER_LINE).join(' ');
    const line2 = words.slice(TOOLTIP_WORDS_PER_LINE, TOOLTIP_WORDS_PER_LINE * 2).join(' ');
    const line3 = words.slice(TOOLTIP_WORDS_PER_LINE * 2).join(' ');
    // tx and ty calculates if the tooltip will fall of the right side of the graph or the bottom of the graph
    // it will move the tooltip left and/or up if it does fall off
    const tx = tooltip.x > TOOLTIP_FLIP_X ? tooltip.x - TOOLTIP_WIDTH - 20 : tooltip.x + TOOLTIP_OFFSET_X;
    const ty = tooltip.y > TOOLTIP_FLIP_Y ? tooltip.y - 100 : tooltip.y + TOOLTIP_OFFSET_Y;

    return (
        <g>
            <rect
                x={tx} y={ty}
                width={TOOLTIP_WIDTH}
                height={line3 ? 90 : line2 ? 74 : 58}
                rx='8'
                fill="#151f3a"
                stroke="#ffd900"
                strokeWidth="1"
            />
            <text x={tx + 10} y={ty + 18} fill="#ffd900" fontSize='11' fontWeight='bold'>
                {tooltip.room.name}
            </text>
            <text x={tx + 10} y={ty + 34} fill='#a5a5a5' fontSize='9'>{line1}</text>
            {line2 && <text x={tx + 10} y={ty + 46} fill='#a5a5a5' fontSize='9'>{line2}</text>}
            {line3 && <text x={tx + 10} y={ty + 58} fill='#a5a5a5' fontSize='9'>{line3}</text>}
        </g>
    )
}


export default function DungeonMap({mapData, selectedRoom, onRoomClick, tooltip}) {
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
                <Tooltip tooltip={tooltip} />
            </svg>
            <Legend />
        </div>
    )
}