import "./CCard.css";

export const CCard = ({ className, title, content, image }) => {
    return (
        <div className={className || "default-custom-card"}>
            <h2>{title}</h2>
            {image && <img src={image} alt="image not found" />}
            <div>{content}</div> {/* TODO consider turning it into a p or a div -> p */}
        </div>
    )
}