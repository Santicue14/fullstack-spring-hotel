import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHotel } from '../../../contexts/HotelContext';
import type { Cliente } from '../../../models/Cliente';
import { createPortal } from 'react-dom';

interface ClienteFormProps {
  cliente?: Cliente;
  handleClose: () => void;
  onSuccess?: () => void;
}

export const ClientesForm: React.FC<ClienteFormProps> = ({ handleClose, cliente, onSuccess }) => {
  const { createCliente, updateCliente } = useHotel();
  const isEditing = !!cliente;
  console.log(cliente);
  const [formData, setFormData] = useState<Cliente>({
    dni: cliente?.dni || '',
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    email: cliente?.email || '',
    telefono: cliente?.telefono || ''
  });

  useEffect(() => {
    if (cliente) {
      setFormData(cliente);
    }
  }, [cliente, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
            await updateCliente(Number(cliente?.id_cliente), formData as Cliente);
      } else {
        await createCliente(formData);
      }
      onSuccess?.();
      location.reload();
      handleClose();
    } catch (err) {
      console.error('Error al guardar el cliente:', err);
    }
  };

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 opacity-30 flex items-center justify-center z-40" onClick={handleClose}></div>
      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl z-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            {isEditing ? 'Editar Cliente' : 'Nuevo Cliente'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="dni" className="block text-sm font-medium text-gray-700 mb-1">
              DNI *
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="dni"
              id="dni"
              required
              placeholder="Ingrese el DNI"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="nombre"
              id="nombre"
              required
              placeholder="Ingrese el nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
              Apellido *
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="apellido"
              id="apellido"
              required
              placeholder="Ingrese el apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="email"
              name="email"
              id="email"
              placeholder="Ingrese el email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>
            <input
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="telefono"
              id="telefono"   
              placeholder="Ingrese el teléfono"
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isEditing ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById('root')!
  );
};
