import { createPortal } from "react-dom";
import { useHotel } from "../../../contexts/HotelContext";
import { useEffect, useState } from "react";
import type { Habitacion } from "../../../models/Habitacion";
import type { Cliente } from "../../../models/Cliente";

export const ReservationsForm = ({ handleClose }: { handleClose: () => void }) => {
    const {fetchClientes, createReserva, fetchHabitaciones} = useHotel();
    const [clientes, setClientes] = useState<any[]>([]);
    const [habitaciones, setHabitaciones] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loadingClientes, setLoadingClientes] = useState<boolean>(false);
    const [loadingHabitaciones, setLoadingHabitaciones] = useState<boolean>(false);

    useEffect(() => {
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
        const fechaEntrada = formData.get('fecha_entrada') as string;
        const fechaSalida = formData.get('fecha_salida') as string;
        const habitacionId = formData.get('habitacion') as string;
        const cliente = clientes.find((cliente) => cliente.id === clienteId);
        const habitacion = habitaciones.find((habitacion) => habitacion.id_habitacion === Number(habitacionId));
        createReserva({ fecha_entrada: fechaEntrada, fecha_salida: fechaSalida, habitacion: habitacion as Habitacion, cliente: cliente as Cliente, dias: 0, total: 0, estado: 'PENDIENTE', fecha_reserva: new Date().toISOString()})
        .then(() => {
            handleClose();
        })
        .catch((error) => {
            setError(error.message);
        });
    }

    return createPortal(
        <>
        <div className="fixed inset-0 bg-gray-500 opacity-30 flex justify-center items-center" onClick={handleClose}></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-2xl font-bold">Crear Reserva</h1>
                <form className="flex flex-col gap-2 mt-4" onSubmit={handleSubmit}>
                    <label htmlFor="cliente">Cliente</label>
                    <select id="cliente" name="cliente" className="border border-gray-300 rounded-md p-2" required>
                        <option value="">Selecciona un cliente</option>
                        {clientes.map((cliente) => (
                            <option 
                            key={cliente.id}
                            value={cliente.id}>
                                {`${cliente.dni} - ${cliente.nombre} ${cliente.apellido}`}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="fecha_entrada">Fecha de entrada</label>
                    <input type="date" id="fecha_entrada" name="fecha_entrada" className="border border-gray-300 rounded-md p-2" required />
                    <label htmlFor="fecha_salida">Fecha de salida</label>
                    <input type="date" id="fecha_salida" name="fecha_salida" className="border border-gray-300 rounded-md p-2" required />
                    <label htmlFor="habitacion">Habitación</label>
                    <select id="habitacion" name="habitacion" className="border border-gray-300 rounded-md p-2" required>
                        <option value="">Selecciona una habitación</option>
                        {habitaciones.map((habitacion) => (
                            <option key={habitacion.id_habitacion} value={habitacion.id_habitacion}>{habitacion.numero} - {habitacion.tipo} - ${habitacion.precio_noche}</option>
                        ))}
                    </select>
                </form>
                <button className="bg-blue-500 text-white p-2 rounded-md" onClick={handleClose}>Crear reserva</button>
            </div>
        </>,
        document.getElementById('root') as HTMLElement
    )
}