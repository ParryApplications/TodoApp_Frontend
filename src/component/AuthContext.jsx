import { createContext, useContext, useState } from "react";

const context = createContext();

export const useAuth = () => useContext(context);

export default function AuthProvider({ children }) {
    //Defining States:
    const [username, setUsername] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);


    function login(username, password) {
        if ((username === "parry" || username === "barry") && password === "ppp") {
            setUsername(username);
            setAuthenticated(true);
            return true;
        } else {
            setAuthenticated(false);
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <context.Provider value={{ username, login, logout, isAuthenticated }}>
            {children}
        </context.Provider>
    )
}