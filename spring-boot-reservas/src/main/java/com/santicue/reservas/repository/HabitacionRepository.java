package com.santicue.reservas.repository;

import com.santicue.reservas.model.Habitacion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HabitacionRepository extends JpaRepository<Habitacion, Integer> {
} 