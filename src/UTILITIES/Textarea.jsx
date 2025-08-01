export function Textarea({ id, placeholder, defaultValue, minHeight, classes = '' }) {
    return <textarea id={id} defaultValue={defaultValue} placeholder={placeholder !== undefined ? placeholder : 'type text here..'} className={`host full-width box no-border ${classes}`} style={{ minHeight: minHeight !== undefined ? minHeight : 120 }}></textarea>
}