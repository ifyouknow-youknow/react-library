export function Clickable({ onPress, children }) {
    return <div onClick={() => {
        onPress !== undefined ? onPress() : console.log("NOTHING BAGEL")
    }} className="pointer">
        {children}
    </div>
}