import "./CDropdown.css";

export const CDropdown = ({ buttonClass, dropdownClass, title, items, onChangeFunction, disabled }) => {
    return (
        <select className={buttonClass || "default-custom-button"} onChange={onChangeFunction} name={title} defaultValue={""} disabled={disabled}>
            <option value="" disabled> {title} </option>
            {items.map((item, index) => (
                <option key={index} value={item.id} className={dropdownClass}>{item.name}</option>
            ))}
        </select>
    );
}