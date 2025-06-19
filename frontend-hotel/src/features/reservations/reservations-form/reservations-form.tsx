import { createPortal } from "react-dom";
import { useHotel } from "../../../contexts/HotelContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import type { Habitacion } from "../../../models/Habitacion";
import type { Cliente } from "../../../models/Cliente";
import type { Reserva } from "../../../models/Reserva";
import type { Usuario } from "../../../models/Usuario";

interface ReservationsFormProps {
    reserva?: Reserva;
    handleClose: () => void;
    onSuccess?: () => void;
}

export const ReservationsForm: React.FC<ReservationsFormProps> = ({ handleClose, reserva, onSuccess }) => {
    const {fetchClientes, createReserva, fetchHabitaciones, updateReserva} = useHotel();
    const { user } = useAuth();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loadingClientes, setLoadingClientes] = useState<boolean>(false);
    const [loadingHabitaciones, setLoadingHabitaciones] = useState<boolean>(false);
    const [formData, setFormData] = useState<Reserva>({
        fecha_inicio: reserva?.fecha_inicio || '',
        fecha_fin: reserva?.fecha_fin || '',
        habitacion: reserva?.habitacion || null as unknown as Habitacion,
        cliente: reserva?.cliente || null as unknown as Cliente,
        usuario: reserva?.usuario || null as unknown as Usuario,
        dias: reserva?.dias || 0,
        total: reserva?.total || 0,
        estado: reserva?.estado || 'PENDIENTE',
        fecha_reserva: reserva?.fecha_reserva || ''
        });

    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        if(isEditing) {
            setFormData(reserva as Reserva);
        }
        setLoadingClientes(true);
        fetchClientes()
        .then((clientes) => {
            setClientes(clientes);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoadingClientes(false);
        });
    }, []);

    useEffect(() => {
        if(isEditing) {
            setFormData(reserva as Reserva);
        }
        setLoadingHabitaciones(true);
        fetchHabitaciones()
        .then((habitaciones) => {
            setHabitaciones(habitaciones);
        })
        .catch((error) => {
            setError(error.message);
        })
        .finally(() => {
            setLoadingHabitaciones(false);
        });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const clienteId = formData.get('cliente') as string;
        const fechaInicio = formData.get('fecha_inicio') as string;
        const fechaFin = formData.get('fecha_fin') as string;
        const habitacionId = formData.get('habitacion') as string;
        
        const cliente = clientes.find((cliente) => cliente.id_cliente === Number(clienteId));
        const habitacion = habitaciones.find((habitacion) => habitacion.id_habitacion === Number(habitacionId));

        if (!cliente || !habitacion) {
            setError('Cliente o habitación no encontrados');
            return;
        }

        if (!cliente.id_cliente || !habitacion.id_habitacion) {
            setError('IDs de cliente o habitación inválidos');
            return;
        }

        if (!user) {
            setError('Usuario no autenticado');
            return;
        }

        const dias = (new Date(fechaFin).getTime() - new Date(fechaInicio).getTime()) / (1000 * 60 * 60 * 24);
        const total = habitacion.precio_noche * dias;
        
        // Convert dates to ISO string format for backend Timestamp fields
        const fechaInicioISO = new Date(fechaInicio + 'T00:00:00').toISOString();
        const fechaFinISO = new Date(fechaFin + 'T00:00:00').toISOString();
        const fechaReservaISO = new Date().toISOString();
        
        if(isEditing) {
            updateReserva(reserva?.id_reserva as number, { 
            fecha_inicio: fechaInicioISO, 
            fecha_fin: fechaFinISO, 
            habitacion: habitacion, 
            cliente: cliente, 
            usuario: user, 
            dias: dias, 
            total: total, 
            estado: 'PENDIENTE', 
            fecha_reserva: fechaReservaISO
        })
        .then(() => {
                handleClose();
                location.reload();
            })
            .catch((error) => {
                setError(error.message);
            });
        } else {
            createReserva({ 
                fecha_inicio: fechaInicioISO, 
                fecha_fin: fechaFinISO, 
                habitacion: habitacion, 
                cliente: cliente, 
                usuario: user, 
                dias: dias, 
                total: total, 
                estado: 'PENDIENTE', 
                fecha_reserva: fechaReservaISO
            })
            .then(() => {
                handleClose();
                location.reload();
            })
            .catch((error) => {
                setError(error.message);
            });
        }
    }
    return createPortal(
        <>
        <div className="fixed inset-0 bg-gray-500 opacity-30 flex justify-center items-center" onClick={handleClose}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-2xl font-bold">{isEditing ? 'Actualizar Reserva' : 'Crear Reserva'}</h1>
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
                    <label htmlFor="cliente">Cliente</label>
                    <select id="cliente" name="cliente" className="border border-gray-300 rounded-md p-2" required disabled={loadingClientes}>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map((cliente) => (
                            <option 
                            key={cliente.id_cliente}
                            value={cliente.id_cliente}
                            selected={formData.cliente?.id_cliente === cliente.id_cliente}>
                                {`${cliente.dni} - ${cliente.nombre} ${cliente.apellido}`}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="fecha_inicio">Fecha de inicio</label>
                    <input type="date" id="fecha_inicio" name="fecha_inicio" className="border border-gray-300 rounded-md p-2" required value={formData.fecha_inicio.split('T')[0]} onChange={(e) => setFormData({ ...formData, fecha_inicio: e.target.value })} />
                    <label htmlFor="fecha_fin">Fecha de fin</label>
                    <input type="date" id="fecha_fin" name="fecha_fin" className="border border-gray-300 rounded-md p-2" required value={formData.fecha_fin.split('T')[0]} onChange={(e) => setFormData({ ...formData, fecha_fin: e.target.value })} />
                    <label htmlFor="habitacion">Habitación</label>
                    <select id="habitacion" name="habitacion" className="border border-gray-300 rounded-md p-2" required disabled={loadingHabitaciones}>
                        <option value="">Selecciona una habitación</option>
                        {habitaciones.map((habitacion) => (
                            <option key={habitacion.id_habitacion} value={habitacion.id_habitacion} selected={formData.habitacion?.id_habitacion === habitacion.id_habitacion}      >{habitacion.numero} - {habitacion.tipo} - ${habitacion.precio_noche}</option>
                        ))}
                    </select>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md mt-4" disabled={loadingClientes || loadingHabitaciones}>
                        {isEditing ? 'Actualizar reserva' : 'Crear reserva'}
                    </button>
                </form>
                <button className="bg-gray-500 text-white p-2 rounded-md mt-2" onClick={handleClose}>Cancelar</button>
            </div>
        </>,
        document.getElementById('root') as HTMLElement
    )
}