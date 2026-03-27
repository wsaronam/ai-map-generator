import '../styles/ThemeInput.css'




export default function ThemeInput({
    theme,
    setTheme,
    onGenerate,
    loading
}) {
    return (
        <div className='input-row'>
            <input
                type='text'
                className='theme-input'
                value={theme}
                onChange={e => setTheme(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && onGenerate()}
                placeholder='e.g. haunted mansion, ice cavern, volcanic swamps...'
            />
            <button
                className='generate-btn'
                onClick={onGenerate}
                disabled={loading || !theme.trim()}
            >
                {loading ? 'Generating...' : 'Generate'}
            </button>
        </div>
    )
}