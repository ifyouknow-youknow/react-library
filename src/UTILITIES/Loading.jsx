export function Loading({ text = "one moment please...", backgroundColor = 'black', color = 'white' }) {
    return <div className="fixed top left right bottom white host p-h" style={{ zIndex: 2000, backgroundColor: backgroundColor }}>
        <div className="p">
            <h1 style={{ color: color }} className="normal text-size12">{text}</h1>
        </div>
    </div>
}