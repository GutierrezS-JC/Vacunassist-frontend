import { useAuth } from "./useAuth"
import { Navigate, Outlet } from "react-router-dom";

export const RequireAuth = () => {
    const auth = useAuth();
    return auth.user ? <Outlet/> : <Navigate to="/login" />
}