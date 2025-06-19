import React, { useEffect, useState } from 'react';
import { useHotel } from '../../../contexts/HotelContext';
import { ClientesForm } from '../clientes-form/clientes.form';
import type { Cliente } from '../../../models/Cliente';

export const ClientesList: React.FC = () => {
  const { deleteCliente, fetchClientes } = useHotel();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);  
  const [selectedCliente, setSelectedCliente] = useState<any>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [clienteToDelete, setClienteToDelete] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchClientes()
      .then((data) => {
        setClientes(data as Cliente[]);
      })
      .catch((err) => {
        setError(err.response?.data || 'Error al cargar los clientes');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleEdit = (cliente: any) => {
    setSelectedCliente(cliente);
    setIsFormOpen(true);
  };

  const handleDelete = (id: number) => {
    setClienteToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (clienteToDelete) {
      await deleteCliente(clienteToDelete);
      setIsDeleteDialogOpen(false);
      setClienteToDelete(null);
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setSelectedCliente(null);
    fetchClientes();
  };

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
      <p className="text-red-600 font-medium">Error: {error}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Clientes</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
          onClick={() => {
            setSelectedCliente(null);
            setIsFormOpen(true);
          }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Nuevo Cliente
        </button>
      </div>

        {clientes.length === 0 && !loading ? (
        <div className="border shadow-lg rounded-lg  border-gray-200 text-center py-12">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No hay clientes registrados</h3>
          <p className="mt-2 text-gray-500">{error || 'Comienza agregando tu primer cliente usando el botón "Nuevo Cliente".'}</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  DNI
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Apellido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Teléfono
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clientes.map((cliente) => (
                <tr key={cliente.id_cliente} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {cliente.dni}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.apellido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.telefono}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(cliente)}
                        className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors duration-200"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(cliente.id_cliente!)}
                        className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-1 rounded-md transition-colors duration-200"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal para el formulario */}
      {isFormOpen &&(
            <ClientesForm
              handleClose={() => setIsFormOpen(false)}
              cliente={selectedCliente}
              onSuccess={handleFormClose}
            />
      )}

      {/* Modal de confirmación de eliminación */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">Confirmar Eliminación</h3>
              </div>
            </div>
            <p className="text-gray-500 mb-6">
              ¿Está seguro que desea eliminar este cliente? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteDialogOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 