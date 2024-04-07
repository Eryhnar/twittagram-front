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

        if (parsedResponse.status === 404) {
            throw new Error("Could not connect to server");
        }

        if (parsedResponse.status !== 200) {
            throw new Error(parsedResponse.message);
        }

        return parsedResponse;
    // } catch (error) {
        // throw error;
    // }
}