import { createContext, useState, useEffect, useContext } from "react";

import { loginUser, logoutUser } from "../services/user.service";

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)



    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));

        }

    }, []);




    const login = async (credentials) => {
        const res = await loginUser(credentials)
        if (!res) {
            console.log("user login failed")
            return;
        }

        const user = res?.data?.loggedInUser;
        setUser(user)
        console.log()
        localStorage.setItem("user", JSON.stringify(user))
        return res;




    }

    const logout = async () => {
        await logoutUser();
        setUser(null);
        localStorage.removeItem("user")
    }



    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};