import { useEffect } from "react";
import { useAuth } from "./AuthContext";

export default function FooterComponent() {
    const auth = useAuth();

    useEffect(() => showResponse(), [auth.response]);

    function showResponse() {
        setTimeout(() => {
            auth.setResp("");
        }, 2000);
    }

    return (
        <>
            {
                auth.response !== ""
                &&
                <div className="container m-5">
                    <p className="alert alert-danger">{auth.response}</p>
                </div>
            }

            <footer className="py-3 my-2">
                <hr />
                <p className="text-body-secondary">© 2024 ParryApplications, Inc.</p>
            </footer>
        </>
    )
}