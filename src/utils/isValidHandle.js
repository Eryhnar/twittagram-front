export const processHandle = (tag) => {
    tag = tag.replace(/\s/g, "");

    if (tag[0] !== "@") {
        return "@" + tag.toLowerCase();
    }
    return tag.toLowerCase();
}

const regex = /^@[a-z0-9](?!.*[._-]{2})[a-z0-9_.-]{3,20}$/; //4,21
export const isValidHandle = (handle) => regex.test(handle);
