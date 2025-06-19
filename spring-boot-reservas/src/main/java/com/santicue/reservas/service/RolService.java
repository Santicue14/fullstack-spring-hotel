package com.santicue.reservas.service;

import com.santicue.reservas.model.Rol;
import com.santicue.reservas.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RolService {
    @Autowired
    private RolRepository rolRepository;

    public List<Rol> findAll() {
        return rolRepository.findAll();
    }

    public Optional<Rol> findById(Integer id) {
        return rolRepository.findById(id);
    }

    public Rol save(Rol rol) {
        // Validaciones básicas para crear un rol
        if (rol.getDescripcion() == null || rol.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol es obligatoria");
        }

        // Verificar si ya existe un rol con la misma descripción
        Optional<Rol> existingRol = rolRepository.findByDescripcion(rol.getDescripcion());
        if (existingRol.isPresent()) {
            throw new IllegalArgumentException("Ya existe un rol con la descripción: " + rol.getDescripcion());
        }

        return rolRepository.save(rol);
    }

    public Rol update(Integer id, Rol rolDetails) {
        // Verificar si existe el rol a actualizar
        Optional<Rol> optionalRol = rolRepository.findById(id);
        if (optionalRol.isEmpty()) {
            throw new IllegalArgumentException("Rol no encontrado con ID: " + id);
        }

        // Validaciones básicas para actualizar un rol
        if (rolDetails.getDescripcion() == null || rolDetails.getDescripcion().trim().isEmpty()) {
            throw new IllegalArgumentException("La descripción del rol es obligatoria");
        }

        // Verificar si ya existe otro rol con la misma descripción
        Optional<Rol> existingRol = rolRepository.findByDescripcion(rolDetails.getDescripcion());
        if (existingRol.isPresent() && !existingRol.get().getId_rol().equals(id)) {
            throw new IllegalArgumentException("Ya existe otro rol con la descripción: " + rolDetails.getDescripcion());
        }

        Rol rol = optionalRol.get();
        rol.setDescripcion(rolDetails.getDescripcion());
        return rolRepository.save(rol);
    }

    public boolean deleteById(Integer id) {
        if (rolRepository.existsById(id)) {
            rolRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<Rol> findByDescripcion(String descripcion) {
        return rolRepository.findByDescripcion(descripcion);
    }
} 