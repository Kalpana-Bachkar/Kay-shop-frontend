const BASE_URL = process.env.REACT_APP_SERVER_URL;
// const BASE_URL = ""

export const registerUser = async (credentials) => {
    const res = await fetch(`${BASE_URL}/api/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
        credentials: "include"

    });

    return res.json();
};

export const loginUser = async (credentials) => {
    const res = await fetch(`${BASE_URL}/api/user/login`, {
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
    const res = await fetch(`${BASE_URL}/api/user/logout`, {
        method: "POST",
        credentials: "include"

    });

    return res.json();
};
