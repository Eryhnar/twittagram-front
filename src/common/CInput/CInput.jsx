import "./CInput.css"

export const CInput = ({className, type, placeholder, name, disabled, value, onChangeFunction, min}) => {
    return (
        <input 
            className={className || "default-custom-input"}
            type={type}
            placeholder={placeholder}
            name={name}
            disabled={disabled}
            value={value}
            onChange={onChangeFunction} 
            min={min}
        />
    )
}