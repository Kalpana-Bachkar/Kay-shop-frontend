const BASE_URL = "http://localhost:5000/api/user";

export const registerUser = async (credentials) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include"

    });

    return res.json();
};

export const loginUser = async (credentials) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"

        },


        body: JSON.stringify(credentials),
        credentials: "include"



    }

    );


    return res.json();
};

export const logoutUser = async () => {
    const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include"

    });

    return res.json();
};
