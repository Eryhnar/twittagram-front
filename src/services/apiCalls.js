const root = "http://localhost:4000/api/";

export const RegisterService = async (user) => {
    // try {
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
    // } catch (error) {
        // throw error;
    // }
}