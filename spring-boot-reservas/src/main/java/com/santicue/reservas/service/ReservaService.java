package com.santicue.reservas.service;

import com.santicue.reservas.model.Reserva;
import com.santicue.reservas.repository.ReservaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Optional<Reserva> findById(Integer id) {
        return reservaRepository.findById(id);
    }

    public Reserva save(Reserva reserva) {
        // Validaciones básicas para crear una reserva
        if (reserva.getCliente() == null || reserva.getCliente().getId_cliente() == null) {
            throw new IllegalArgumentException("El cliente es requerido");
        }
        if (reserva.getHabitacion() == null || reserva.getHabitacion().getId_habitacion() == null) {
            throw new IllegalArgumentException("La habitación es requerida");
        }
        if (reserva.getDias() == null || reserva.getDias() <= 0) {
            throw new IllegalArgumentException("Los días deben ser mayor a 0");
        }
        if (reserva.getTotal() == null || reserva.getTotal() <= 0) {
            throw new IllegalArgumentException("El total debe ser mayor a 0");
        }
        if (reserva.getFecha_reserva() == null) {
            throw new IllegalArgumentException("La fecha de reserva es requerida");
        }
        if (reserva.getUsuario() == null || reserva.getUsuario().getId_usuario() == null) {
            throw new IllegalArgumentException("El usuario es requerido");
        }

        return reservaRepository.save(reserva);
    }

    public Reserva update(Integer id, Reserva reservaDetails) {
        // Verificar si existe la reserva a actualizar
        Optional<Reserva> optionalReserva = reservaRepository.findById(id);
        if (optionalReserva.isEmpty()) {
            throw new IllegalArgumentException("Reserva no encontrada con ID: " + id);
        }

        // Validaciones básicas para actualizar una reserva
        if (reservaDetails.getCliente() == null || reservaDetails.getCliente().getId_cliente() == null) {
            throw new IllegalArgumentException("El cliente es requerido");
        }
        if (reservaDetails.getHabitacion() == null || reservaDetails.getHabitacion().getId_habitacion() == null) {
            throw new IllegalArgumentException("La habitación es requerida");
        }
        if (reservaDetails.getDias() == null || reservaDetails.getDias() <= 0) {
            throw new IllegalArgumentException("Los días deben ser mayor a 0");
        }
        if (reservaDetails.getTotal() == null || reservaDetails.getTotal() <= 0) {
            throw new IllegalArgumentException("El total debe ser mayor a 0");
        }
        if (reservaDetails.getFecha_reserva() == null) {
            throw new IllegalArgumentException("La fecha de reserva es requerida");
        }
        if (reservaDetails.getUsuario() == null || reservaDetails.getUsuario().getId_usuario() == null) {
            throw new IllegalArgumentException("El usuario es requerido");
        }

        Reserva reserva = optionalReserva.get();
        
        // Actualizar campos
        reserva.setCliente(reservaDetails.getCliente());
        reserva.setHabitacion(reservaDetails.getHabitacion());
        reserva.setDias(reservaDetails.getDias());
        reserva.setTotal(reservaDetails.getTotal());
        reserva.setFecha_reserva(reservaDetails.getFecha_reserva());
        reserva.setUsuario(reservaDetails.getUsuario());
        
        return reservaRepository.save(reserva);
    }

    public boolean deleteById(Integer id) {
        if (reservaRepository.existsById(id)) {
            reservaRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 