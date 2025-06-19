import { useEffect, useState } from "react";
import { useHotel } from "../../../contexts/HotelContext";
import { ReservationsForm } from "../reservations-form/reservations-form";

export const ReservationsList = () => {
    const { fetchReservas } = useHotel();
    const [isFetchingReservas, setIsFetchingReservas] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedReserva, setSelectedReserva] = useState<any>(null);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [reservas, setReservas] = useState<any[]>([]);


    const handleCloseForm = () => {
        setIsFormOpen(false);
        setSelectedReserva(null);
    }

    useEffect(() => {
        setIsFetchingReservas(true);
        fetchReservas()
        .then((reservas) => {
            console.log(reservas);
            setIsFetchingReservas(false);
            setReservas(reservas);
        })
        .catch((error) => {
            console.error('Error fetching reservas:', error);
            setIsFetchingReservas(false);
        });
    }, []);

  return (
    <>
    <div>
      <button className="bg-blue-500 text-white p-2 rounded-md" onClick={() => setIsFormOpen(true)}>Crear reserva</button>
      <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Habitación</th>
                <th>Fecha de entrada</th>
                <th>Fecha de salida</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {isFetchingReservas ? (
                <tr>
                    <td colSpan={5} className="text-center">Cargando reservas...</td>
                </tr>
            ) : (
                reservas.map((reserva) => (
                    <tr key={reserva.id}>
                        <td>{reserva.id}</td>
                        <td>{reserva.cliente.nombre}</td>
                        <td>{reserva.habitacion.nombre}</td>
                        <td>{reserva.fecha_entrada}</td>
                        <td>{reserva.fecha_salida}</td>
                        <td>
                            <button>Editar</button>
                            <button>Eliminar</button>
                        </td>
                    </tr>
                ))
            )}
        </tbody>
      </table>
    </div>
    {isFormOpen && <ReservationsForm handleClose={handleCloseForm} />}
    </>
  )
}