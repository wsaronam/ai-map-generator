export const ROOM_COLORS = {
    entrance: "#4a9eff",
    boss: "#ff4a4a",
    treasure: "#ffd700",
    trap: "#ff8c00",
    rest: "#4aff91",
    combat: "#cc44ff"
}


// Map layout
export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 600;
export const MAP_CENTER_X = 400;
export const MAP_CENTER_Y = 300;


// Room nodes
export const ROOM_RADIUS = 28


// Connections
export const CONNECTION_STROKE = '#ffffff'
export const CONNECTION_WIDTH = 2
export const CONNECTION_DASH = '6 3'




export function parseMap(raw) {
    try {
        const clean = raw
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
        return JSON.parse(clean);
    }
    catch (err) {
        return null;
    }
}

// WIP
export function getRoomPositions(rooms) {
    const positions = {};
    const cols = 3;
    const cellW = MAP_WIDTH / cols;
    const cellH = MAP_HEIGHT / 2;
    rooms.forEach((room, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        positions[room.id] = {
            x: cellW * col + cellW / 2,
            y: cellH * row + cellH / 2
        }
    })
    return positions;
}