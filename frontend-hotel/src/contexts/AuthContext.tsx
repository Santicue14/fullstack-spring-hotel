import { createContext, useState, useContext } from "react";
import type { Usuario } from "../models/Usuario";
import { API_URL } from "../hooks/Api";
import axios from "axios";
import type { AxiosError } from "axios";

interface AuthContextType {
    user: Usuario | null;
    setUser: (user: Usuario | null) => void;
    login: (email: string, contrasena: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<Usuario | null>(JSON.parse(localStorage.getItem("user") || "null"));

    const login = async (email: string, contrasena: string) => {
        try {
            const response = await axios.post(`${API_URL}/usuarios/login`, {
                email, contrasena
            })
            setUser(response.data.usuario);
            localStorage.setItem("user", JSON.stringify(response.data.usuario));
        } catch (error) {
            const axiosError = error as AxiosError;
            const message = axiosError.response?.data as { message: string } | undefined;
            console.log(message);
            console.error(message?.message || "Error al iniciar sesión");
            throw message?.message || "Error al iniciar sesión";
        }
    }

    const logout = async () => {
        setUser(null);
        localStorage.removeItem("user");
        location.reload();
    }

    return <AuthContext.Provider value={{ 
        //States
        user, setUser,

        //Functions
        login,
        logout



    }}>{children}
    
    </AuthContext.Provider>;
}

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthContext, AuthProvider, useAuth };