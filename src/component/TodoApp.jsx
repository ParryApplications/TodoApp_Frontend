import LoginComponent from "./LoginComponent";
import HeaderComponent from "./HeaderComponent";
import FooterCompoenent from "./FooterComponent";
import WelcomeComponent from "./WelcomeComponent";
import TodoListComponent from "./TodoListComponent";
import ErrorComponent from "./ErrorComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider, { useAuth } from "./AuthContext";
import LogoutComponent from "./LogoutComponent";
import AddUpdateTodoComponent from "./AddUpdateTodoComponent";

function RouteAuthCheck({ children }) {
    const authContext = useAuth();

    if (authContext.isAuthenticated) {
        // console.log("Auth context is authenticated");
        return children;
    }
    // console.log("Auth context redirecting to login");
    return <Navigate to="/login" />
}

export default function TodoApp() {

    return (
        <div className="TodoApp">

            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />

                        <Route path="/welcome" element={
                            <RouteAuthCheck>
                                <WelcomeComponent />
                            </RouteAuthCheck>
                        } />

                        <Route path="/todos" element={
                            <RouteAuthCheck>
                                <TodoListComponent />
                            </RouteAuthCheck>
                        } />

                        <Route path="/logout" element={
                            // <RouteAuthCheck>
                            <LogoutComponent />
                            // </RouteAuthCheck>
                        } />

                        <Route path="/todos/:id" element={
                            <RouteAuthCheck>
                                <AddUpdateTodoComponent />
                            </RouteAuthCheck>
                        } />

                        <Route path="*" element={<ErrorComponent />} />
                    </Routes>
                    <FooterCompoenent />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}