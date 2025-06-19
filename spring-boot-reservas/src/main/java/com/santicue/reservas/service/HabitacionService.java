package com.santicue.reservas.service;

import com.santicue.reservas.model.Habitacion;
import com.santicue.reservas.repository.HabitacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HabitacionService {
    @Autowired
    private HabitacionRepository habitacionRepository;

    public List<Habitacion> findAll() {
        return habitacionRepository.findAll();
    }

    public Optional<Habitacion> findById(Integer id) {
        return habitacionRepository.findById(id);
    }

    public Habitacion save(Habitacion habitacion) {
        // Validaciones básicas para crear una habitación
        if (habitacion.getNumero() == null || habitacion.getNumero().trim().isEmpty()) {
            throw new IllegalArgumentException("El número de habitación es requerido");
        }
        if (habitacion.getTipo() == null || habitacion.getTipo().trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo de habitación es requerido");
        }
        if (habitacion.getCapacidad() == null || habitacion.getCapacidad() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor a 0");
        }
        if (habitacion.getPrecio_noche() == null || habitacion.getPrecio_noche() <= 0) {
            throw new IllegalArgumentException("El precio por noche debe ser mayor a 0");
        }

        // Verificar si ya existe una habitación con el mismo número
        Optional<Habitacion> existingHabitacion = habitacionRepository.findByNumero(habitacion.getNumero());
        if (existingHabitacion.isPresent()) {
            throw new IllegalArgumentException("Ya existe una habitación con el número: " + habitacion.getNumero());
        }

        return habitacionRepository.save(habitacion);
    }

    public Habitacion update(Integer id, Habitacion habitacionDetails) {
        // Verificar si existe la habitación a actualizar
        Optional<Habitacion> optionalHabitacion = habitacionRepository.findById(id);
        if (optionalHabitacion.isEmpty()) {
            throw new IllegalArgumentException("Habitación no encontrada con ID: " + id);
        }

        // Validaciones básicas para actualizar una habitación
        if (habitacionDetails.getNumero() == null || habitacionDetails.getNumero().trim().isEmpty()) {
            throw new IllegalArgumentException("El número de habitación es requerido");
        }
        if (habitacionDetails.getTipo() == null || habitacionDetails.getTipo().trim().isEmpty()) {
            throw new IllegalArgumentException("El tipo de habitación es requerido");
        }
        if (habitacionDetails.getCapacidad() == null || habitacionDetails.getCapacidad() <= 0) {
            throw new IllegalArgumentException("La capacidad debe ser mayor a 0");
        }
        if (habitacionDetails.getPrecio_noche() == null || habitacionDetails.getPrecio_noche() <= 0) {
            throw new IllegalArgumentException("El precio por noche debe ser mayor a 0");
        }

        // Verificar si ya existe otra habitación con el mismo número
        Optional<Habitacion> existingHabitacion = habitacionRepository.findByNumero(habitacionDetails.getNumero());
        if (existingHabitacion.isPresent() && !existingHabitacion.get().getId_habitacion().equals(id)) {
            throw new IllegalArgumentException("Ya existe otra habitación con el número: " + habitacionDetails.getNumero());
        }

        Habitacion habitacion = optionalHabitacion.get();
        
        // Actualizar campos
        habitacion.setNumero(habitacionDetails.getNumero());
        habitacion.setTipo(habitacionDetails.getTipo());
        habitacion.setCapacidad(habitacionDetails.getCapacidad());
        habitacion.setPrecio_noche(habitacionDetails.getPrecio_noche());
        habitacion.setEstado(habitacionDetails.getEstado());
        habitacion.setDescripcion(habitacionDetails.getDescripcion());
        
        return habitacionRepository.save(habitacion);
    }

    public boolean deleteById(Integer id) {
        if (habitacionRepository.existsById(id)) {
            habitacionRepository.deleteById(id);
            return true;
        }
        return false;
    }
} 