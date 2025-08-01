export function Dropdown({ id, items, onChange, classes = '' }) {
    return (
        <select
            id={id}
            className={`host full-width no-border ${classes}`}
            onChange={(e) => {
                const value = e.target.value;
                onChange ? onChange(value) : console.log(value);
            }}
        >
            {items.map((item, i) => (
                <option key={i} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}