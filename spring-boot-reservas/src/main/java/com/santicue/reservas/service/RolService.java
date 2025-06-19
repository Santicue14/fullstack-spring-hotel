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
        return rolRepository.save(rol);
    }

    public void deleteById(Integer id) {
        rolRepository.deleteById(id);
    }

    public Optional<Rol> findByDescripcion(String descripcion) {
        return rolRepository.findByDescripcion(descripcion);
    }
} 