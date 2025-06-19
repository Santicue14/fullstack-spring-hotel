import React, { createContext, useContext } from 'react';
import axios from 'axios';
import type { Cliente } from '../models/Cliente';
import type { Habitacion } from '../models/Habitacion';
import type { Reserva } from '../models/Reserva';
import type { Usuario } from '../models/Usuario';
import type { Rol } from '../models/Rol';
import { API_URL } from '../hooks/Api';

interface HotelContextType {
  // Cliente functions
  fetchClientes: () => Promise<Cliente[]>;
  createCliente: (cliente: Cliente) => Promise<void>;
  updateCliente: (id: number, cliente: Cliente) => Promise<void>;
  deleteCliente: (id: number) => Promise<void>;
  
  // Habitacion functions
  fetchHabitaciones: () => Promise<Habitacion[]>;
  getHabitacionById: (id: number) => Promise<Habitacion>;
  createHabitacion: (habitacion: Habitacion) => Promise<Habitacion>;
  updateHabitacion: (id: number, habitacion: Habitacion) => Promise<Habitacion>;
  deleteHabitacion: (id: number) => Promise<void>;
  
  // Reserva functions
  fetchReservas: () => Promise<Reserva[]>;
  getReservaById: (id: number) => Promise<Reserva>;
  createReserva: (reserva: Reserva) => Promise<Reserva>;
  updateReserva: (id: number, reserva: Reserva) => Promise<Reserva>;
  deleteReserva: (id: number) => Promise<void>;

  // Usuario functions
  fetchUsuarios: () => Promise<Usuario[]>;
  createUsuario: (usuario: Usuario) => Promise<Usuario>;
  updateUsuario: (id: number, usuario: Usuario) => Promise<Usuario>;
  deleteUsuario: (id: number) => Promise<void>;
  
  // Rol functions
  fetchRoles: () => Promise<Rol[]>;
}

const HotelContext = createContext<HotelContextType | undefined>(undefined);

export const HotelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  // Cliente functions
  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_URL}/clientes`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching clientes:', err);
      throw err;
    }
  };

  const createCliente = async (cliente: Cliente) => {
    try {
      const response = await axios.post(`${API_URL}/clientes`, cliente);
      return response.data;
    } catch (err: any) {
      console.error('Error creating cliente:', err);
      throw err;
    }
  };

  const updateCliente = async (id: number, cliente: Cliente) => {
    try {
      const response = await axios.put(`${API_URL}/clientes/${id}`, cliente);
      return response.data;
    } catch (err: any) {
      console.error('Error updating cliente:', err);
      throw err;
    }
  };

  const deleteCliente = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/clientes/${id}`);
    } catch (err: any) {
      console.error('Error deleting cliente:', err);
      throw err;
    }
  };

  // Habitacion functions
  const fetchHabitaciones = async () => {
    try {
      const response = await axios.get(`${API_URL}/habitaciones`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching habitaciones:', err);
      throw err;
    }
  };

  const getHabitacionById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/habitaciones/${id}`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching habitacion by id:', err);
      throw err;
    }
  };

  const createHabitacion = async (habitacion: Habitacion) => {
    try {
      const response = await axios.post(`${API_URL}/habitaciones`, habitacion);
      return response.data;
    } catch (err: any) {
      console.error('Error creating habitacion:', err);
      throw err;
    }
  };

  const updateHabitacion = async (id: number, habitacion: Habitacion) => {
    try {
      const response = await axios.put(`${API_URL}/habitaciones/${id}`, habitacion);
      return response.data;
    } catch (err: any) {
      console.error('Error updating habitacion:', err);
      throw err;
    }
  };

  const deleteHabitacion = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/habitaciones/${id}`);
    } catch (err: any) {
      console.error('Error deleting habitacion:', err);
      throw err;
    }
  };

  // Reserva functions
  const fetchReservas = async () => {
    try {
      const response = await axios.get(`${API_URL}/reservas`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching reservas:', err);
      throw err;
    }
  };

  const getReservaById = async (id: number) => {
    try {
      const response = await axios.get(`${API_URL}/reservas/${id}`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching reserva by id:', err);
      throw err;
    }
  };

  const createReserva = async (reserva: Reserva) => {
    try {
      const response = await axios.post(`${API_URL}/reservas`, reserva, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err: any) {
      console.error('Error creating reserva:', err);
      throw err;
    }
  };

  const updateReserva = async (id: number, reserva: Reserva) => {
    try {
      const response = await axios.put(`${API_URL}/reservas/${id}`, reserva);
      return response.data;
    } catch (err: any) {
      console.error('Error updating reserva:', err);
      throw err;
    }
  };

  const deleteReserva = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/reservas/${id}`);
    } catch (err: any) {
      console.error('Error deleting reserva:', err);
      throw err;
    }
  };

  // Usuario functions

  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching usuarios:', err);
      throw err;
    }
  };

  const createUsuario = async (usuario: Usuario) => {
    try {
      const response = await axios.post(`${API_URL}/usuarios`, usuario);
      return response.data;
    } catch (err: any) {
      console.error('Error creating usuario:', err);
      throw err;
    }
  };  
  const updateUsuario = async (id: number, usuario: Usuario) => {
    try {
      const response = await axios.put(`${API_URL}/usuarios/${id}`, usuario);
      return response.data;
    } catch (err: any) {
      console.error('Error updating usuario:', err);
      throw err;
    }
  };

  const deleteUsuario = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`);
    } catch (err: any) {
      console.error('Error deleting usuario:', err);
      throw err;
    }
  };

  // Rol functions
  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      return response.data;
    } catch (err: any) {
      console.error('Error fetching roles:', err);
      throw err;
    }
  };

  return (
    <HotelContext.Provider value={{
      // Cliente functions
      fetchClientes,
      createCliente,
      updateCliente,
      deleteCliente,
      
      // Habitacion functions
      fetchHabitaciones,
      getHabitacionById,
      createHabitacion,
      updateHabitacion,
      deleteHabitacion,
      
      // Reserva functions
      fetchReservas,
      getReservaById,
      createReserva,
      updateReserva,
      deleteReserva,

      // Usuario functions
      fetchUsuarios,
      createUsuario,
      updateUsuario,
      deleteUsuario,

      // Rol functions
      fetchRoles
    }}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (context === undefined) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
