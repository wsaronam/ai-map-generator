import '../styles/Tooltip.css'
import {
    TOOLTIP_WIDTH,
    TOOLTIP_HEIGHT,
    TOOLTIP_FLIP_X,
    TOOLTIP_FLIP_Y,
    TOOLTIP_OFFSET_X,
    TOOLTIP_OFFSET_Y,
    TOOLTIP_WORDS_PER_LINE} from '../utils/MapHelpers.jsx';




export default function Tooltip({tooltip}) {
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
                className='box'
            />
            <text x={tx + 10} y={ty + 26} fill="#ffd900" fontSize='11' fontWeight='bold' className='title'>
                {tooltip.room.name}
            </text>
            <text x={tx + 10} y={ty + 44} fill='#a5a5a5' fontSize='9' className='text'>{line1}</text>
            {line2 && <text x={tx + 10} y={ty + 56} fill='#a5a5a5' fontSize='9' className='text'>{line2}</text>}
            {line3 && <text x={tx + 10} y={ty + 68} fill='#a5a5a5' fontSize='9' className='text'>{line3}</text>}
        </g>
    )
}