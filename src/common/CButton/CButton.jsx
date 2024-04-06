import "./CButton.css";

export const CButton = ({ className, title, onClickFunction }) => {
    return (
        <div className={className || "default-custom-button"} onClick={onClickFunction}>
            {title}
        </div>
    )
}