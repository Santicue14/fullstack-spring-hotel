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
        return habitacionRepository.save(habitacion);
    }

    public void deleteById(Integer id) {
        habitacionRepository.deleteById(id);
    }
} 