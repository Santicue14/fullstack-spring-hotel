import { useEffect, useState } from "react";
import { useHotel } from "../../contexts/HotelContext";
import type { Cliente } from "../../models/Cliente";
import type { Reserva } from "../../models/Reserva";
import type { Habitacion } from "../../models/Habitacion";
import { Card } from "./components/Card";

export const DashboardPage =() => {
    const {fetchClientes, fetchReservas, fetchHabitaciones} = useHotel();
    //Handling clients
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loadingClientes, setLoadingClientes] = useState(false);
    const [errorClientes, setErrorClientes] = useState<string | null>(null);

    //Handling reservations
    const [reservas, setReservas] = useState<Reserva[]>([]);
    const [loadingReservas, setLoadingReservas] = useState(false);
    const [errorReservas, setErrorReservas] = useState<string | null>(null);

    //Handling rooms
    const [habitaciones, setHabitaciones] = useState<Habitacion[]>([]);
    const [loadingHabitaciones, setLoadingHabitaciones] = useState(false);
    const [errorHabitaciones, setErrorHabitaciones] = useState<string | null>(null);

    useEffect(() => {
        setLoadingClientes(true);
        fetchClientes()
        .then((data) => setClientes(data))
        .catch((error) => setErrorClientes(error.message))
        .finally(() => setLoadingClientes(false));

        setLoadingReservas(true);
        fetchReservas()
        .then((data) => setReservas(data))
        .catch((error) => setErrorReservas(error.message))
        .finally(() => setLoadingReservas(false));

        setLoadingHabitaciones(true);
        fetchHabitaciones()
        .then((data) => setHabitaciones(data))
        .catch((error) => setErrorHabitaciones(error.message))
        .finally(() => setLoadingHabitaciones(false));
    }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 flex flex-col gap-8 p-6 md:p-10">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/*Clientes card*/}
        <Card title="Clientes" description={`Total de clientes: ${clientes.length}`} />
        {/*Reservas card*/}
        <Card title="Reservas" description={`Total de reservas: ${reservas.length}`} />
        {/*Habitaciones card*/}
        <Card title="Habitaciones" description={`Total de habitaciones: ${habitaciones.length}`} />
      </div>
      <section className="bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-xl font-bold text-blue-800 mb-4">Primeros 5 clientes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Nombre</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Apellido</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-blue-900 uppercase tracking-wider">Email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {clientes.slice(0, 5).map((cliente) => (
                <tr key={cliente.id_cliente} className="hover:bg-blue-50 transition-colors">
                  <td className="px-4 py-2 whitespace-nowrap">{cliente.nombre}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{cliente.apellido}</td>
                  <td className="px-4 py-2 whitespace-nowrap">{cliente.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}