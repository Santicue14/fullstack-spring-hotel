package com.santicue.reservas.repository;

import com.santicue.reservas.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Usuario findByEmailAndContrasena(String email, String contrasena);
    Usuario findByEmail(String email);
} 