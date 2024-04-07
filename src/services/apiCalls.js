const root = "http://localhost:4000/api/";

export const RegisterService = async (user) => {
    try {
        const response = await fetch(root + "auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        return await response.json();
    } catch (error) {
        throw error;
    }
}