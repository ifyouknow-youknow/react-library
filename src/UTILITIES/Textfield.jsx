export function Textfield({ id, placeholder, defaultValue, classes = '' }) {
    return <input type="text" id={id} defaultValue={defaultValue} placeholder={placeholder !== undefined ? placeholder : 'type text here..'} className={`host full-width box no-border ${classes}`} />
}