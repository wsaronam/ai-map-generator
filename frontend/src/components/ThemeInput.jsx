import '../styles/ThemeInput.css'




export default function ThemeInput() {
    return (
        <div>
            <input
                type='text'
                className='theme-input'
                placeholder='e.g. haunted mansion, ice cavern, volcanic swamps...'
            />
            <button
                className='generate-btn'
            >
                Temp
            </button>
        </div>
    )
}