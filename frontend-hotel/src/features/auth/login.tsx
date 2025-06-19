import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { login } = useContext(AuthContext) as { login: (email: string, password: string) => Promise<void> };
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        setError("");
        const email = (e.target as HTMLFormElement).email.value;
        const contrasena = (e.target as HTMLFormElement).contrasena.value;
        if (!email || !contrasena) {
            setError("Por favor, complete todos los campos");
            return;
        }
        e.preventDefault();
        
        login(email, contrasena)
        .then(() => {
            navigate("/");
        })
        .catch((error: string) => {
            setError(error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-4 rounded-md w-full max-w-md shadow-md">
            <h1 className="text-3xl font-bold  text-center">Gestor de Reservas para Hotel</h1>
            <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
            <input type="email" placeholder="ejemplo@gmail.com" name="email" className="border-2 border-gray-300 rounded-md p-2 w-full" />
            <label htmlFor="contrasena" className="text-sm font-medium">Contraseña</label>
            <input type="password" placeholder="Contraseña" name="contrasena" className="border-2 border-gray-300 rounded-md p-2 w-full" />
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white rounded-md p-2 w-full hover:bg-blue-600 transition-colors">
                <span className="loading-spinner"></span>
                {isLoading ? "Cargando..." : "Login"}
            </button>
            {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded-md border border-red-300">{error}</p>}
        </form>
    )
}