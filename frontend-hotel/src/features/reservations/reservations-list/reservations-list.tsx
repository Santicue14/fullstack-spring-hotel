import { useEffect, useState } from "react";
import { useHotel } from "../../../contexts/HotelContext";
import { ReservationsForm } from "../reservations-form/reservations-form";
import type { Reserva } from "../../../models/Reserva";

export const ReservationsList = () => {
    const { fetchReservas } = useHotel();
    const [isFetchingReservas, setIsFetchingReservas] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedReserva, setSelectedReserva] = useState<Reserva | null>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [reservas, setReservas] = useState<Reserva[]>([]);

    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedReserva(null);
    }

    useEffect(() => {
        setIsFetchingReservas(true);
        fetchReservas()
        .then((reservas) => {
            setIsFetchingReservas(false);
            setReservas(reservas);
        })
        .catch((error) => {
            console.error('Error fetching reservas:', error);
            setIsFetchingReservas(false);
            setErrorMessage('Error al cargar las reservas');
        });
    }, []);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES');
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(amount);
    };

    return (
        <>
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Reservas</h1>
                <button 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors" 
                    onClick={() => setIsFormOpen(true)}
                >
                    Crear reserva
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
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Habitación</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha inicio</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha fin</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Días</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {isFetchingReservas ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                    Cargando reservas...
                                </td>
                            </tr>
                        ) : reservas.length === 0 ? (
                            <tr>
                                <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                                    No hay reservas registradas
                                </td>
                            </tr>
                        ) : (
                            reservas.map((reserva) => (
                                <tr key={reserva.id_reserva} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {reserva.id_reserva}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {`${reserva.cliente.nombre} ${reserva.cliente.apellido}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {`${reserva.habitacion.numero} - ${reserva.habitacion.tipo}`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(reserva.fecha_inicio)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatDate(reserva.fecha_fin)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {reserva.dias}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {formatCurrency(reserva.total)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                            reserva.estado === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-800' :
                                            reserva.estado === 'CONFIRMADA' ? 'bg-green-100 text-green-800' :
                                            reserva.estado === 'CANCELADA' ? 'bg-red-100 text-red-800' :
                                            'bg-gray-100 text-gray-800'
                                        }`}>
                                            {reserva.estado}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2 cursor-pointer">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3" onClick={() => {
                                            setIsFormOpen(true);
                                            setSelectedReserva(reserva);
                                        }}>
                                            Editar
                                        </button>
                                        <button className="text-red-600 hover:text-red-900" onClick={() => setIsDeleteDialogOpen(true)}>
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
            {isFormOpen && <ReservationsForm handleClose={handleCloseForm} reserva={selectedReserva || undefined} 
            onSuccess={() => {
                setIsFormOpen(false);
                setSelectedReserva(null);
            }}
        />}
        </>
    )
}