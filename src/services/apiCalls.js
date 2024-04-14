const root = "http://localhost:4000/api/";

export const RegisterService = async (user) => {
    const response = await fetch(root + "auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const parsedResponse = await response.json();

    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }

    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export const LoginService = async (credentials) => {
    const response = await fetch(root + "auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });

    const parsedResponse = await response.json();

    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }

    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }

    return parsedResponse;
}

export const getTimelineService = async (token) => {
    const response = await fetch(root + "posts/timeline", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const getProfileService = async (token, handle) => {
    const response = await fetch(root + `users/${handle}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const getUsersService = async (token) => {
    const response = await fetch(root + "users", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const getPostsService = async (token) => {
    const response = await fetch(root + "posts", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const getCommentsService = async (token) => {
    const response = await fetch(root + "comments", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const toggleLikeService = async (token, postId) => {
    const response = await fetch(root + "posts/like", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: postId }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const toggleSaveService = async (token, postId) => {
    const response = await fetch(root + "posts/save", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ postId: postId }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const toggleFriendService = async (token, userId) => {
    const response = await fetch(root + "users/friends", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId: userId }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const toggleFollowService = async (token, userId) => {
    const response = await fetch(root + "users/follow", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ targetUserId: userId }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const createPostService = async (token, post) => {
    const response = await fetch(root + "posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            image: post.imageUrl,
            visibility: post.visibility,
            tags: post.tags,
            caption: post.caption,
        }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 201) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const updateProfileService = async (token, profile) => {
    const response = await fetch(root + "users/profile", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const suspendAccountService = async (token, password) => {
    const response = await fetch(root + "users/profile/deactivate", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password: password }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const changePasswordService = async (token, password) => {
    const response = await fetch(root + "users/profile/password", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
            oldPassword: password.oldPassword,
            newPassword: password.newPassword,
            newPasswordRepeat: password.confirmPassword }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const editPostService = async (token, post) => {
    const response = await fetch(root + "posts", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            postId: post.postId,
            visibility: post.visibility,
            tags: post.tags,
            caption: post.caption,
        }),
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const deletePostService = async (token, postId) => {
    const response = await fetch(root + `posts/${postId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}

export const savedPostsService = async (token) => {
    const response = await fetch(root + "users/saved", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const parsedResponse = await response.json();
    if (response.status === 404) {
        throw new Error("Could not connect to server");
    }
    if (response.status !== 200) {
        throw new Error(parsedResponse.message);
    }
    return parsedResponse;
}