import { createContext, useContext, useState } from "react";
import { authentication } from "../restApis/AddUpdateTodoComponentApi";
import { jwtDecode } from "jwt-decode";

const context = createContext();

export const useAuth = () => useContext(context);

export default function AuthProvider({ children }) {
    //Defining States:
    const [username, setUsername] = useState("");
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [response, setResponse] = useState("");


    async function login(username, password) {
        //Authentication Processing:
        const authToken = (await authentication(username, password)).data;
        // console.log("Authentication: "+username, password);
        if (authToken !== null && authToken.jwtToken !== null && authToken.jwtToken !== undefined) {
            //Checking for expiration time (Decoding auth token):
            console.log(authToken)
            const decodedToken = jwtDecode(authToken.jwtToken);
            if (decodedToken.exp * 1000 <= Date.now()) {
                setAuthenticated(false);
                setResp("Session is expired, Please login again");
                return false;
            }

            //This LOCs executed is expiration time not crossed current time:
            setAuthenticated(true);
            localStorage.setItem("authToken", authToken.jwtToken);//Storing session token in localStorage
            setUsername(username);
            return true;
        } else {
            setAuthenticated(false);
            setResp("Error while Login, Please try again");
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