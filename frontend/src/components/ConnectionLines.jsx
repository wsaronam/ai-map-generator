import '../styles/ConnectionLines.css';
import { CONNECTION_STROKE, CONNECTION_WIDTH, CONNECTION_DASH } from '../utils/MapHelpers.jsx';




export default function ConnectionLines({rooms, positions}) {
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
                            className='line'
                        />
                    )
                }
            }
        })
    )
}