package com.santicue.reservas.repository;

import com.santicue.reservas.model.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservaRepository extends JpaRepository<Reserva, Integer> {
} 