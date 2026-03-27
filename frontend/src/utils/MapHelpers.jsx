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