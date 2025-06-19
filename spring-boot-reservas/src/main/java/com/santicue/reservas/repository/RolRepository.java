package com.santicue.reservas.repository;

import com.santicue.reservas.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolRepository extends JpaRepository<Rol, Integer> {
    Optional<Rol> findByDescripcion(String descripcion);
} 