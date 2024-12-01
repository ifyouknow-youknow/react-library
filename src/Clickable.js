export function Clickable({ onPress, children }) {
    return <div className="pointer fit-width" onClick={() => onPress !== undefined ? onPress() : console.log("YOU PRESSED ME!")}>
        {children}
    </div>
}