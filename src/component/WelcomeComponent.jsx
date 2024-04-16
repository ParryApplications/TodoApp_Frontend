import { Link } from "react-router-dom"
import { useAuth } from "./AuthContext";

export default function WelcomeComponent() {
    const authContext = useAuth();
    return (
        <div className="container">
            <b>Welcome {authContext.username}</b>
            <p>My Todos, Click <Link to="/todos">here</Link>.</p>
        </div>
    )
}