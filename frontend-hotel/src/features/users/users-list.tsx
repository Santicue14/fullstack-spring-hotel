import { useEffect, useState } from "react";
import { useHotel } from "../../contexts/HotelContext";
import { useAuth } from "../../contexts/AuthContext";
import { UsersForm } from "./users-form";
import type { Usuario } from "../../models/Usuario";

export const UsersList = () => {
    const { fetchUsuarios, deleteUsuario } = useHotel();
    const { user } = useAuth();
    const [users, setUsers] = useState<Usuario[]>([]);
    const [isFetchingUsers, setIsFetchingUsers] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedUser, setSelectedUser] = useState<Usuario | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<Usuario | null>(null);

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedUser(null);
    };

    const handleEditUser = (user: Usuario) => {
        setSelectedUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteUser = (user: Usuario) => {
        setUserToDelete(user);
        setIsDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (userToDelete) {
            try {
                await deleteUsuario(userToDelete.id_usuario!);
                setIsDeleteDialogOpen(false);
                setUserToDelete(null);
                // Recargar la lista
                loadUsers();
            } catch (error) {
                setErrorMessage('Error al eliminar el usuario');
            }
        }
    };

    const loadUsers = async () => {
        setIsFetchingUsers(true);
        try {
            const usersData = await fetchUsuarios();
            setUsers(usersData);
            setErrorMessage('');
        } catch (error) {
            console.error('Error fetching users:', error);
            setErrorMessage('Error al cargar los usuarios');
        } finally {
            setIsFetchingUsers(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Usuarios</h1>
                    <button 
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors" 
                        onClick={() => setIsFormOpen(true)}
                    >
                        Crear usuario
                    </button>
                </div>

                {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {errorMessage}
                    </div>
                )}

                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {isFetchingUsers ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        Cargando usuarios...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                        No hay usuarios registrados
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id_usuario} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.id_usuario}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.nombre}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                user.rol?.descripcion === 'Administrador' ? 'bg-purple-100 text-purple-800' :
                                                user.rol?.descripcion === 'Recepcionista' ? 'bg-blue-100 text-blue-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {user.rol?.descripcion || 'Sin rol'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => handleEditUser(user)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                                            >
                                                Editar
                                            </button>
                                            <button 
                                                onClick={() => handleDeleteUser(user)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Formulario de usuario */}
            {isFormOpen && (
                <UsersForm 
                    handleClose={handleCloseForm} 
                    userToEdit={selectedUser}
                />
            )}

            {/* Diálogo de confirmación de eliminación */}
            {isDeleteDialogOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                            Confirmar eliminación
                        </h3>
                        <p className="text-sm text-gray-500 mb-6">
                            ¿Estás seguro de que quieres eliminar al usuario "{userToDelete?.nombre}"? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => {
                                    setIsDeleteDialogOpen(false);
                                    setUserToDelete(null);
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};