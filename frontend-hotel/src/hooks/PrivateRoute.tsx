import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import type { Usuario } from "../models/Usuario";
import { useContext } from "react";
import Sidebar from "../core/components/Sidebar";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const { user } = useContext(AuthContext) as { user: Usuario | null };
    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <Sidebar>
                {children}
            </Sidebar>
        </>
    );
}