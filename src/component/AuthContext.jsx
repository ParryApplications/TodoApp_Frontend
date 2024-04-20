import { createContext, useContext, useState } from "react";

const context = createContext();

export const useAuth = () => useContext(context);

export default function AuthProvider({ children }) {
    //Defining States:
    const [username, setUsername] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [response, setResponse] = useState("");


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

    function setResp(res) {
        setResponse(res);
    }

    function logout() {
        setAuthenticated(false);
    }

    return (
        <context.Provider value={{ username, login, logout, isAuthenticated, response, setResp }}>
            {children}
        </context.Provider>
    )
}