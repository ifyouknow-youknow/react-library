export function Spacer({ height }) {
    return <div style={{ height: height !== undefined ? `${height}px` : '10px' }}></div>
}