import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function LoginComponent() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginError, setLoginErrorFlag] = useState(false);
    const navigateTo = useNavigate();

    //AuthContext:
    const authContext = useAuth();

    async function loginHandler() {
        if (await authContext.login(username, password)) {
            setLoginErrorFlag(false);
            navigateTo(`/welcome`);
        } else {
            setLoginErrorFlag(true);
        }
    }

    return (
        <div className="container p-5 border border-info-subtle rounded-4 w-50">
            <div>
                <div className="m-2">
                    <input type="text" name="username" placeholder="Username" className="form-control" required="required" value={username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className="m-2  pt-2">
                    <input type="password" name="password" placeholder="Password" className="form-control" required="required" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>

                <div className="m-2 pt-4">
                    <button className="btn btn-primary form-control" name="login" onClick={loginHandler}>Login</button>
                </div>
            </div>

            {isLoginError &&
                <div className="alert alert-danger m-3">
                    Invalid Credentials! Please try again
                </div>
            }
        </div>
    )
}