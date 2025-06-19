package com.santicue.reservas.service;

import com.santicue.reservas.model.Usuario;
import com.santicue.reservas.model.Rol;
import com.santicue.reservas.repository.UsuarioRepository;
import com.santicue.reservas.repository.RolRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private RolRepository rolRepository;

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Usuario login(Usuario usuario) {
        Usuario userExiste = usuarioRepository.findByEmail(usuario.getEmail());
        if (userExiste == null) {
            throw new RuntimeException("Usuario no existe");
        }

        if (!userExiste.getContrasena().equals(usuario.getContrasena())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        return userExiste;
    }

    public Optional<Usuario> findById(Integer id) {
        return usuarioRepository.findById(id);
    }

    public Usuario save(Usuario usuario) {
        if (usuario.getRol() != null) {
            Optional<Rol> rol = rolRepository.findById(usuario.getRol().getId_rol());
            if (rol.isPresent() && "Administrador".equalsIgnoreCase(rol.get().getDescripcion())) {
                return usuarioRepository.save(usuario);
            }
        }
        throw new RuntimeException("Solo se pueden crear usuarios con rol Administrador");
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }
} 