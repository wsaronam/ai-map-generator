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
import RoomNode from './RoomNode.jsx';
import ConnectionLines from './ConnectionLines.jsx';
import Tooltip from './Tooltip.jsx';

import '../styles/DungeonMap.css';




export default function DungeonMap({mapData, selectedRoom, onRoomClick, tooltip}) {
    const positions = getRoomPositions(mapData.rooms);

    return (
        <div className='container'>
            <h2 className='title'>{mapData.title}</h2>
            <p className='hint'>Click on a room to inspect it</p>

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