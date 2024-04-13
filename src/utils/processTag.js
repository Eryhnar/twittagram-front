const processTag = (tag) => {
    tag = tag.replace(/\s/g, "");

    if (tag[0] !== "#") {
        return "#" + tag.toLowerCase();
    }
    return tag.toLowerCase();
}

export default processTag;