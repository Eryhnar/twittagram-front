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
    console.log("parsedResponse", parsedResponse);
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