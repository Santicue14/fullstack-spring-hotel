import { useEffect, useState } from "react";
import { useHotel } from "../../contexts/HotelContext";
import { HabitacionesForm } from "./habitaciones-form";
import type { Habitacion } from "../../models/Habitacion";

export const HabitacionesList = () => {
    const {fetchHabitaciones} = useHotel();
    const [habitaciones, setHabitaciones] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [habitacionSelected, setHabitacionSelected] = useState<Habitacion | null>(null);
    useEffect(() => {
        setLoading(true);
        fetchHabitaciones().then((habitaciones) => {
            setHabitaciones(habitaciones);  
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoading(false);
        }); 
    }, []);


    return (
        <>
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8 flex justify-between items-center">
                    <div className="info-page">
                        <h1 className="text-4xl font-bold text-gray-800 mb-2">Gestión de Habitaciones</h1>
                        <p className="text-gray-600">Administra las habitaciones del hotel</p>
                    </div>
                {/* Action Button */}
                <div className="mb-6">
                    <button 
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2" 
                        onClick={() => setIsFormOpen(true)}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Crear Habitación
                    </button>
                </div>
                </div>


                {/* Form Modal */}
                {isFormOpen && <HabitacionesForm handleClose={() => setIsFormOpen(false)} habitacion={habitacionSelected || undefined} />}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Table Container */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Número
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Descripción
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Precio/Noche
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Capacidad
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Tipo
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Estado
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {habitaciones.map((habitacion) => (
                                    <tr key={habitacion.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {habitacion.numero}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900 max-w-xs truncate">
                                                {habitacion.descripcion || 'Sin descripción'}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-green-600">
                                                ${habitacion.precio_noche?.toLocaleString() || habitacion.precio}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {habitacion.capacidad} personas
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 capitalize">
                                                {habitacion.tipo}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                habitacion.estado === 'DISPONIBLE' 
                                                    ? 'bg-green-100 text-green-800'
                                                    : habitacion.estado === 'OCUPADA'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {habitacion.estado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button 
                                                onClick={() => {
                                                    setHabitacionSelected(habitacion);
                                                    setIsFormOpen(true);
                                                }}
                                                className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors duration-200 flex items-center gap-1"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Editar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Empty State */}
                    {!loading && habitaciones.length === 0 && (
                        <div className="text-center py-12">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No hay habitaciones</h3>
                            <p className="mt-1 text-sm text-gray-500">Comienza creando tu primera habitación.</p>
                        </div>
                    )}
                </div>
            </div>
    </>
    )
}