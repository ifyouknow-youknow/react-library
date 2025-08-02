export function Textfield({ id, placeholder, defaultValue, isPassword, classes = '' }) {
    return <input type={isPassword ? 'password' : 'text'} id={id} defaultValue={defaultValue} placeholder={placeholder !== undefined ? placeholder : 'type text here..'} className={`host full-width box no-border ${classes}`} />
}