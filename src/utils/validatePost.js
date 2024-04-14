const validatePost = (post) => {
    if (post.imageUrl === "") {
        return "Please upload an image";
    }
    if (post.visibility === "") {
        return "Please select a visibility option";
    }
}

export default validatePost;