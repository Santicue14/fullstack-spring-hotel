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
        return usuarioRepository.save(usuario);
    }

    public void deleteById(Integer id) {
        usuarioRepository.deleteById(id);
    }

    // Método para crear usuario con validaciones
    public Usuario createUsuario(Usuario usuario) {
        // Validaciones básicas
        validateUsuario(usuario);
        
        // Verificar que el email no exista
        if (usuarioRepository.findByEmail(usuario.getEmail()) != null) {
            throw new RuntimeException("Ya existe un usuario con ese email");
        }
        
        // Manejar el rol
        handleRol(usuario);
        
        return usuarioRepository.save(usuario);
    }

    // Método para actualizar usuario con validaciones
    public Usuario updateUsuario(Integer id, Usuario usuarioDetails) {
        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);
        if (optionalUsuario.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado");
        }

        Usuario usuario = optionalUsuario.get();
        
        // Validaciones básicas
        if (usuarioDetails.getNombre() == null || usuarioDetails.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (usuarioDetails.getEmail() == null || usuarioDetails.getEmail().trim().isEmpty()) {
            throw new RuntimeException("El email es obligatorio");
        }

        // Actualizar campos básicos
        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        
        // Solo actualizar contraseña si se proporciona una nueva
        if (usuarioDetails.getContrasena() != null && !usuarioDetails.getContrasena().trim().isEmpty()) {
            usuario.setContrasena(usuarioDetails.getContrasena());
        }
        
        // Manejar el rol
        handleRol(usuarioDetails);
        usuario.setRol(usuarioDetails.getRol());
        
        return usuarioRepository.save(usuario);
    }

    // Método privado para validar usuario
    private void validateUsuario(Usuario usuario) {
        if (usuario.getNombre() == null || usuario.getNombre().trim().isEmpty()) {
            throw new RuntimeException("El nombre es obligatorio");
        }
        if (usuario.getEmail() == null || usuario.getEmail().trim().isEmpty()) {
            throw new RuntimeException("El email es obligatorio");
        }
        if (usuario.getContrasena() == null || usuario.getContrasena().trim().isEmpty()) {
            throw new RuntimeException("La contraseña es obligatoria");
        }
        if (usuario.getRol() == null && usuario.getId_rol() == null) {
            throw new RuntimeException("El rol es obligatorio");
        }
    }

    // Método privado para manejar el rol
    private void handleRol(Usuario usuario) {
        Rol rol = null;
        
        // Si viene el objeto rol completo, usarlo
        if (usuario.getRol() != null && usuario.getRol().getId_rol() != null) {
            Optional<Rol> rolOptional = rolRepository.findById(usuario.getRol().getId_rol());
            if (rolOptional.isPresent()) {
                rol = rolOptional.get();
            } else {
                throw new RuntimeException("El rol especificado no existe");
            }
        }
        // Si viene solo el id_rol, buscar el rol
        else if (usuario.getId_rol() != null) {
            Optional<Rol> rolOptional = rolRepository.findById(usuario.getId_rol());
            if (rolOptional.isPresent()) {
                rol = rolOptional.get();
            } else {
                throw new RuntimeException("El rol especificado no existe");
            }
        }
        
        // Asignar el rol al usuario
        usuario.setRol(rol);
    }
} 