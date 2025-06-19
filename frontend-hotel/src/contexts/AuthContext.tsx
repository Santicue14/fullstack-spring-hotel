import { createContext, useState } from "react";
import type { Usuario } from "../models/Usuario";
import { API_URL } from "../hooks/Api";
import axios from "axios";
import type { AxiosError } from "axios";

const AuthContext = createContext({});

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

export { AuthContext, AuthProvider };