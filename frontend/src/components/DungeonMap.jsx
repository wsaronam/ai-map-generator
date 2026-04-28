import { 
    MAP_WIDTH,
    MAP_HEIGHT,
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