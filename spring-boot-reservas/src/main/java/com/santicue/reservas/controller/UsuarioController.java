package com.santicue.reservas.controller;

import com.santicue.reservas.model.Usuario;
import com.santicue.reservas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> getAllUsuarios() {
        return usuarioService.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> requestBody) {
        try {
            Usuario usuario = new Usuario();
            usuario.setEmail(requestBody.get("email"));
            usuario.setContrasena(requestBody.get("contrasena"));
            return ResponseEntity.ok(Map.of("usuario", usuarioService.login(usuario)));
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable Integer id) {
        Optional<Usuario> usuario = usuarioService.findById(id);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createUsuario(@RequestBody Usuario usuario) {
        try {
            return ResponseEntity.ok(usuarioService.save(usuario));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable Integer id, @RequestBody Usuario usuarioDetails) {
        Optional<Usuario> optionalUsuario = usuarioService.findById(id);
        if (optionalUsuario.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Usuario usuario = optionalUsuario.get();
        usuario.setNombre(usuarioDetails.getNombre());
        usuario.setEmail(usuarioDetails.getEmail());
        usuario.setContrasena(usuarioDetails.getContrasena());
        usuario.setRol(usuarioDetails.getRol());
        return ResponseEntity.ok(usuarioService.save(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Integer id) {
        if (usuarioService.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        usuarioService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
} 