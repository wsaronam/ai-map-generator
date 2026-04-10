import '../styles/RoomNode.css';
import { ROOM_COLORS } from '../utils/MapHelpers.jsx';




export default function RoomNode({room, pos, onClick, isSelected}) {
    const color = ROOM_COLORS[room.type] || '#818181'
    const w = 90;
    const h = 52;

    return (
        <g onClick={onClick} className='roomNode'>
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