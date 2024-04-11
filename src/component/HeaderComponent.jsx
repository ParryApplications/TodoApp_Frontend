import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function HeaderComponent() {
    const authContext = useAuth();
    const navigateTo = useNavigate();

    return (
        < header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom" >
            {console.log(authContext.isAuthenticated)}
            <div className="col-md-3 mb-2 mb-md-0">
                <a href="https://www.google.com/search?q=parryapplications&rlz=1C1ONGR_enIN1042IN1042&oq=parryapplications&aqs=chrome..69i57j69i60l3j69i65l2j69i60l2.2749j0j7&sourceid=chrome&ie=UTF-8" className="d-inline-flex link-body-emphasis text-decoration-none">
                    ParryApplications
                </a>
            </div>

            {authContext.isAuthenticated &&
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to={"/welcome"} className="nav-link px-2">Home</Link></li>
                    <li><Link to="/todos" className="nav-link px-2">Todos</Link></li>
                </ul>
            }

            <div className="col-md-3 text-end  me-2">

                {!authContext.isAuthenticated &&
                    < button type="button" className="btn btn-outline-primary me-2" onClick={() => navigateTo("/login")}>Login</button>
                }

                {authContext.isAuthenticated &&
                    <button type="button" className="btn btn-primary" onClick={() => {
                        authContext.logout();
                        navigateTo("/logout");
                    }}>Logout</button>
                }
            </div>

        </header >
    )
}