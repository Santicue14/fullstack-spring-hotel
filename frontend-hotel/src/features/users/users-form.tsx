import { createPortal } from "react-dom";
import { useHotel } from "../../contexts/HotelContext";
import { useEffect, useState } from "react";
import type { Usuario } from "../../models/Usuario";
import type { Rol } from "../../models/Rol";

interface UsersFormProps {
    handleClose: () => void;
    userToEdit?: Usuario | null;
}

export const UsersForm = ({ handleClose, userToEdit }: UsersFormProps) => {
    const { createUsuario, updateUsuario, fetchRoles } = useHotel();
    const [roles, setRoles] = useState<Rol[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        fetchRoles()
        .then((roles) => {
            setRoles(roles);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const nombre = formData.get('nombre') as string;
        const email = formData.get('email') as string;
        const contrasena = formData.get('contrasena') as string;
        const rolId = formData.get('rol') as string;

        const rol = roles.find((rol) => rol.id_rol === Number(rolId));

        if (!rol) {
            setError('Rol no encontrado');
            return;
        }

        const usuarioData: any = {
            nombre,
            email,
            id_rol: rol.id_rol,
            rol
        };

        // Solo incluir contraseña si se proporciona una nueva
        if (contrasena && contrasena.trim() !== '') {
            usuarioData.contrasena = contrasena;
        }

        if (userToEdit) {
            // Actualizar usuario existente
            updateUsuario(userToEdit.id_usuario!, usuarioData)
            .then(() => {
                handleClose();
                location.reload();
            })
            .catch((error) => {
                setError(error.message);
            });
        } else {
            // Crear nuevo usuario - la contraseña es obligatoria
            if (!contrasena || contrasena.trim() === '') {
                setError('La contraseña es obligatoria para crear un nuevo usuario');
                return;
            }
            usuarioData.contrasena = contrasena;
            
            createUsuario(usuarioData)
            .then(() => {
                handleClose();
                location.reload();
            })
            .catch((error) => {
                setError(error.message);
            });
        }
    };

    return createPortal(
        <>
            <div className="fixed inset-0 bg-gray-500 opacity-30 flex justify-center items-center" onClick={handleClose}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl w-96" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-2xl font-bold mb-4">
                    {userToEdit ? 'Editar Usuario' : 'Crear Usuario'}
                </h1>
                
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            defaultValue={userToEdit?.nombre || ''}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={userToEdit?.email || ''}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="contrasena"
                            name="contrasena"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required={!userToEdit}
                            placeholder={userToEdit ? 'Dejar vacío para mantener la actual' : ''}
                        />
                    </div>

                    <div>
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-700 mb-1">
                            Rol
                        </label>
                        <select
                            id="rol"
                            name="rol"
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={loading}
                        >
                            <option value="">Selecciona un rol</option>
                            {roles.map((rol) => (
                                <option
                                    key={rol.id_rol}
                                    value={rol.id_rol}
                                    selected={userToEdit?.rol?.id_rol === rol.id_rol}
                                >
                                    {rol.descripcion}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-3 mt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : (userToEdit ? 'Actualizar' : 'Crear')}
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('root') as HTMLElement
    );
};
